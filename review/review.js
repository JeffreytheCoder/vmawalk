layui.use("layer", function() {
    if (sessionStorage.getItem("token") == null) {
        layer.msg("请登录");

        setTimeout(() => {
            window.location.href = "../login/login.html";
        }, 1000);
    }
});


window.onload = function() {

    layui.use(['layer', 'jquery', 'form'], function() {

        var $ = layui.jquery;

        for (var i = 1; i < teachers.length; i++) {
            if (teachers[i].chineseName == null) {
                $("#teacher").append(new Option(teachers[i].englishName, teachers[i].id));
            }
        }

        for (var i = 1; i < teachers.length; i++) {
            if (teachers[i].chineseName != null) {
                $("#teacher").append(new Option(teachers[i].chineseName + " " + teachers[i].englishName, teachers[i].id));
            }
        }

        layui.form.render('select');

    })
}

layui.use(['layer', 'jquery', 'form'], function() {

    var layer = layui.layer,
        $ = layui.jquery,
        form = layui.form;

    form.on('select(teacher)', function(data) {
        obj = document.getElementById("course");
        for (i = obj.options.length - 1; i >= 1; i--) {
            obj.options[i] = null;
        }
        var teacher_id = data.value;
        for (var i = 1; i < CoursesWithTeacher.length; i++) {
            if (CoursesWithTeacher [i].teacherId == teacher_id) {
                $("#course").append(new Option(CoursesWithTeacher[i].courseCode + " " + CoursesWithTeacher[i].courseName, courses[i].id));
            }
        }
        layui.form.render("select");
    })
})

layui.use(['form', 'jquery'], function() {
    var form = layui.form;
    var $ = layui.$;
    form.on('submit(submit)', function(data) {
        //JSON.stringify(data.field)   这是表单中所有的数据
        var articleFrom = data.field.articleFrom;
        var articleSummary = data.field.articleSummary;
        console.log(data);

        var scores = [data.field.overall, data.field.easiness, data.field.workload, data.field.clarity, data.field.helpfulness].join("|");

        console.log(JSON.stringify({
            teacherId: data.field.teacher,
            CourseId: data.field.course,
            Year: data.field.year,
            Semester: data.field.semester == "null" ? null : data.field.semester == "true",
            Grade: data.field.grade,
            Score: scores,
            Text: data.field.review
        }))

        var index = layer.load({
            shade: [0.4, '#def'],
            icon: '&#xe63d'
        })

        $.ajax({
            type: "POST",
            url: "https://vmawalk.azurewebsites.net/api/Review",
            contentType: "application/json",
            data: JSON.stringify({
                teacherId: Number(data.field.teacher),
                CourseId: Number(data.field.course),
                Year: Number(data.field.year),
                Semester: data.field.semester == "null" ? null : data.field.semester == "true",
                Grade: data.field.grade,
                Score: scores,
                Text: data.field.review
            }),
            xhrFields: {
                withCredentials: true
            },
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem("token")
            },
            success: function(data) {
                layer.alert(data)
            },
            error: function(req) {
                if (req.status == 401) {
                    window.location.href = location.origin + "/login/login.html"
                } else {
                    console.log(req.responseText)
                }
            },
            complete: function() {
                layer.close(index);
            },
            dataType: "json"
        });
        return false;
    });
});