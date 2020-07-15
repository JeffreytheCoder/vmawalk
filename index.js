var token = localStorage.getItem("token")
if (token) {
    var user = JSON.parse(b64_to_utf8(token.split(".")[1]))
    if (user.exp > Date.now() / 1000) {
        console.log(true)
        console.log("token 未过期且已获取")
    }

    window.onload = function () {

        layui.use(['layer', 'jquery', 'form'], function () {

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
    }

    layui.use(['form', 'jquery'], function () {

        var form = layui.form;
        var $ = layui.$;

        $(document).keydown(function (e) {
            if (e.keyCode === 13) {

                $("#submit").trigger("click");
                return false;
            }
        });

        form.on('submit(submit)', function (data) {
            query = data.field.teacher;
            link = "menu/menu.html?query=" + encodeURI(encodeURI(query)) + "";
            window.location.href = link;
            return false;
        });
    })
}