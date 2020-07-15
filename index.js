function setLogin(callback) {
    // Judge if login or myreview
    var token = localStorage.getItem("token")
    if (token) {
        var user = JSON.parse(b64_to_utf8(token.split(".")[1]))
        if (user.exp > Date.now() / 1000) {
            console.log("token未过期且已获取")
            var loginText = "我的点评";
            var loginLink = "myreview/myreview.html";
            callback();
        }
    } else {
        console.log("未检测到token")
        var loginText = "登 录";
        var loginLink = "login/login.html";
        callback();
    }
}

window.onload = function() {
    // Load options of select
    layui.use(['layer', 'jquery', 'form'], function() {

        var $ = layui.jquery;

        for (var i = 1; i < teachers.length; i++) {
            if (teachers[i].chineseName == null) {
                $("#search").append(new Option(teachers[i].englishName, "1-" + teachers[i].id));
            }
        }

        for (var i = 1; i < teachers.length; i++) {
            if (teachers[i].chineseName != null) {
                $("#search").append(new Option(teachers[i].chineseName + " " + teachers[i].englishName, "1-" + teachers[i].id));
            }
        }

        Courses.forEach(i => {
            $("#search").append(new Option(i.courseName + " " + i.courseCode, "2-" + i.courseCode));
        })

        layui.form.render('select');

    })

    //Load login button
    setLogin(function() {
        loginDiv = document.getElementById("login-div");
        var login = document.createElement("a");
        login.setAttribute('href', loginLink);
        login.innerHTML = `<button class="add-review">
                <text class="add-review-text">` + loginText + `</text>
            </button>`;
        loginDiv.appendChild(login);
    })
}


// Set submit button click
layui.use(['form', 'jquery'], function() {

    var form = layui.form;
    var $ = layui.$;

    $(document).keydown(function(e) {
        if (e.keyCode === 13) {

            $("#submit").trigger("click");
            return false;
        }
    });

    form.on('submit(submit)', function(data) {
        query = data.field.teacher;
        link = "menu/menu.html?query=" + encodeURI(encodeURI(query)) + "";
        window.location.href = link;
        return false;
    });
})