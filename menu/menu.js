console.log(decodeURI(window.location.href));
var query = "2-MATH205" // getUrlQueryString(decodeURI(window.location.href));
console.log(query);
id = query.substring(2)
console.log(id)

function getUrlQueryString() {
    var equal = window.location.href.indexOf("=")
    var query = window.location.href.substring(equal + 1);
    return query;
};

layui.use(["jquery", "layer"], function() {
    var $ = layui.jquery;
    var url = "";

    data = {}
    if (query[0] == "1") {
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
            console.log(req)
        },
        error: function(req) {
            console.log(req)
        }
    });
})