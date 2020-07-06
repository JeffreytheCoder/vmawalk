console.log(decodeURI(window.location.href));
var query = getUrlQueryString(decodeURI(window.location.href));
id = query.substring(2)

function getUrlQueryString() {
    var equal = window.location.href.indexOf("=")
    var query = window.location.href.substring(equal + 1);
    return query;
};

//global variable
var teacherObj;
var coursesList;
var courseObj;
var courseList;

function callData(query, callback) {
    console.log(456);
    layui.use(["jquery", "layer"], function() {
        var $ = layui.$;
        var url = "";
        var teacher = null;

        data = {}
        if (query[0] == "1") {
            $.get("https://vmawalk.azurewebsites.net/api/teacher/" + id, function(result) {
                teacher = result;
                teacherObj = teacher;
                console.log(teacher)
            });
            url = "https://vmawalk.azurewebsites.net/api/course/GetWithTeachers";
            data.id = Number(id);
        } else if (query[0] == "2") {
            url = "https://vmawalk.azurewebsites.net/api/course/GetWithCode";
            data.code = id;
        }

        $.ajax({
            type: "GET",
            url: url,
            contentType: "application/json",
            data: data,
            success: function(req) {
                callback();
                console.log(req);
            },
            error: function(req) {
                callback();
                console.log(req);
                return req;
            }
        });
    })
}

window.onload = function() {

    //init
    console.log(decodeURI(window.location.href));
    var query = "1-100" //getUrlQueryString(decodeURI(window.location.href));
    id = query.substring(2)

    callData(query, function() {
        console.log(123);
        if (query[0] == "1") {
            //namewithpic
            namewithpic = document.getElementById("namewithpic");

            var image = document.createElement("div");
            image.style.cssText = 'background-image: url(https://github.com/JeffreytheCoder/vmawalk/blob/master/img/wanghe.jpg?raw=true);';
            image.className = "image";
            namewithpic.appendChild(image);

            var name = document.createElement("h2");
            name.innerHTML = "<strong>" + teacherObj.chineseName + " " + teacherObj.englishName + "</strong>";
            namewithpic.appendChild(name);

            len = 3;
            for (i = 0; i < len; i++) {
                var image = document.createElement("div");
            }

        }

        if (query[0] == "2") {
            //namewithpic
            namewithpic = document.getElementById("namewithpic");

            var code = document.createElement("div");
            code.style.cssText = "background-color: #69BDC8;";
            code.innerHTML = "<font color='white'>MATH502</font>";
            code.className = "code";
            namewithpic.appendChild(code);
        }
    })
}