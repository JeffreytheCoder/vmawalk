console.log(decodeURI(window.location.href));
var query = "1-105" //getUrlQueryString(decodeURI(window.location.href));
id = query.substring(2)

function getUrlQueryString() {
    var equal = window.location.href.indexOf("=")
    var query = window.location.href.substring(equal + 1);
    return query;
};

layui.use(["jquery", "layer"], function() {
    var $ = layui.$;
    var url = "";
    var teacher = null;

    data = {}
    if (query[0] == "1") {
        $.get("https://vmawalk.azurewebsites.net/api/teacher/"+id,function (result) {
            teacher = result;
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
            console.log(req);
        },
        error: function(req) {
            console.log(req);
        }
    });
})

//动态加载
//图片/课程代码、老师/课名称
//每个profile里：课程代码/老师图片、课/老师名称、五个评分、最佳评论