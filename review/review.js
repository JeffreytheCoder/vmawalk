var url = new URL(location);
var edit = url.searchParams.get("edit")
var reviewID = 0;
if (edit == "1") {
    edit = true;
    reviewID = url.searchParams.get("reviewID");
} else {
    edit = false;
}

window.onload = function () {
    layui.use(['layer', 'jquery', 'form', "rate"], async function () {

        /**
         * @type {JQueryStatic}
         */
        var $ = layui.jquery,
            form = layui.form,
            rate = layui.rate;

        await waitInitial;
        await loadLayer();

        var token = localStorage.getItem("token")
        if (!localStorage.getItem("token")) {
            layui.layer.msg("您暂未登录，请先登录!");
            setTimeout(() => {
                toLogin();
            }, 500);
        } else {
            var user = JSON.parse(b64_to_utf8(token.split(".")[1]))
            if (user.exp < Date.now() / 1000) {
                layui.layer.msg("您暂未登录，请先登录!");
                setTimeout(() => {
                    toLogin();
                }, 500);
            }
        }
        await loadInfo;

        teachers.filter(teacher => {
            if (teacher.chineseName == null) {
                $("#teacher").append(new Option(teacher.englishName, teacher.id))

                return false;
            } else
                return true
        }).forEach(teacher =>
            $("#teacher").append(new Option(`${teacher.chineseName} ${teacher.englishName}`, teacher.id))
        )

        // default value
        var Params = new URLSearchParams(location.search)

        var review;

        Jump:
            if (Params.has("code") || (edit && sessionStorage.getItem(reviewID))) {
                let code;
                let course;
                if (Params.has("code")) {
                    code = Params.get("code");
                    course = CoursesWithTeacher.find(course => course.id == code)
                } else if (edit && sessionStorage.getItem(reviewID)) {
                    review = JSON.parse(sessionStorage.getItem(reviewID));
                }

                if (course === undefined && review == undefined)
                    break Jump;
                if (review === undefined) {
                    CoursesWithTeacher.forEach(
                        _course => {
                            if (_course.teacherId === course.teacherId)
                                $("#course").append(new Option(`${_course.courseName} ${_course.courseCode}`, _course.id))
                        }
                    )
                    form.val("review", {
                        course: course.id,
                        teacher: course.teacherId
                    })
                } else {
                    CoursesWithTeacher.forEach(
                        _course => {
                            if (_course.teacherId === review.teacherId)
                                $("#course").append(new Option(`${_course.courseName} ${_course.courseCode}`, _course.id))
                        }
                    )
                    if (review.semester == null)
                        review.semester = "null"
                    form.val("review", {
                        "teacher": review.teacherId,
                        "course": review.courseId,
                        "grade": review.grade.trim(),
                        "semester": review.semester.toString(),
                        "year": review.year,
                        "review": review.text,
                        "overall": review.score[0],
                        "easiness": review.score[1],
                        "workload": review.score[2],
                        "clarity": review.score[3],
                        "helpfulness": review.score[4]
                    })

                }

            }



        form.render('select');

        // listener of select
        form.on('select(teacher)', function (data) {
            let obj = document.getElementById("course");
            for (i = obj.options.length - 1; i >= 1; i--) {
                obj.options[i] = null;
            }
            var teacher_id = data.value;
            for (var i = 1; i < CoursesWithTeacher.length; i++) {
                if (CoursesWithTeacher[i].teacherId == teacher_id) {
                    $("#course").append(new Option(`${CoursesWithTeacher[i].courseName} ${CoursesWithTeacher[i].courseCode}`, CoursesWithTeacher[i].id));
                }
            }
            form.render("select");
        })

    })
}

layui.use(['form', 'jquery', 'layer'], function () {
    var form = layui.form,
        $ = layui.$,
        layer = layui.layer;

    form.on('submit(submit)', function (data) {
        //JSON.stringify(data.field)   这是表单中所有的数据
        var articleFrom = data.field.articleFrom;
        var articleSummary = data.field.articleSummary;
        console.log(data);

        var scores = [
            data.field.overall,
            data.field.easiness,
            data.field.workload,
            data.field.clarity,
            data.field.helpfulness
        ].map(x => Number(x))

        console.log(JSON.stringify({
            teacherId: data.field.teacher,
            CourseId: data.field.course,
            Year: data.field.year,
            Semester: data.field.semester == "null" ? null : data.field.semester == "true",
            Grade: data.field.grade,
            Score: scores,
            Text: data.field.review
        }))

        var loading = layer.load({
            shade: [0.4, '#def'],
            icon: '&#xe63d'
        })

        fetch("https:///vma-walk.azurewebsites.net/api/Review", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({
                    Id: Number(reviewID),
                    teacherId: Number(data.field.teacher),
                    CourseId: Number(data.field.course),
                    Year: Number(data.field.year),
                    Semester: data.field.semester == "null" ? null : data.field.semester == "true",
                    Grade: data.field.grade,
                    Score: scores,
                    Text: data.field.review
                })
            })
            .then(async res => {
                switch (res.status) {
                case 200:
                    if (edit) {
                        layer.msg("修改成功");
                        setTimeout(() => {
                            // toPreviousPage();
                            location.href = `../myreview/myreview.html`;
                        }, 1000);
                    } else {
                        layer.msg("添加成功");
                        setTimeout(() => {
                            // toPreviousPage();
                            location.href = `../profile/profile.html?query=${data.field.course}`;
                        }, 1000);
                    }
                    break;

                case 400:
                    let text = await res.text();
                    layer.msg("失败");
                    layer.alert(text);
                    console.log(text)
                    break;
                case 401:
                    layer.msg("身份验证超时或登录出错，请重新登录")
                    setTimeout(() => {
                        toLogin();
                    }, 100);
                    break;
                }
            })
            .catch(() => { layer.msg("请求超时，请重试") })
            .finally(() => layer.close(loading))
        return false;
    });
});

function toPreviousPage() {
    var a = document.referrer;
    var b = a.split("/");
    var c = b.slice(b.length - 1, b.length).toString(String).split(".");
    var previousPage = c.slice(0, 1);
    if (previousPage[0] === "login") {
        console.log("对了");
        history.go(-3);
    } else {
        console.log(previousPage[0]);
        self.location = document.referrer;
    }
}