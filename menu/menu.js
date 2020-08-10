var callData;
//global variable
var teacherObj;
var courseList = null;
var footerCount = 0;
var query = new URLSearchParams(location.search).get("query");
var queryID = query.substr(2);

function loadCourseListTitle() {
    let courselisttitle = document.getElementById("course-list-title");
    var title = document.createElement("div");
    title.className = "courses-list-title";
    if (document.documentElement.clientWidth <= 700) {
        title.innerHTML = `<b>Courses / Teachers</b> <b>Ratings</b>`
    } else {
        title.innerHTML = `<b>Courses / Teachers</b>
        <b>Ratings</b>
        <b>Most Popular Review</b>`
    }
    courselisttitle.appendChild(title)
}





layui.use(["jquery", "layer", "laytpl"], function () {
    var $ = layui.$,
        layer = layui.layer,
        laytpl = layui.laytpl;

    function loadTeacherMenu() {
        //add namewithpic
        let namewithpic = document.getElementById("namewithpic");

        var image = document.createElement("div");
        var imageURL = Imagelink[teacherObj.id];
        if (imageURL == undefined) {
            imageURL = "https://pic.downk.cc/item/5f119eb214195aa594188884.png";
        }
        image.style.cssText = "background-image: url(" + imageURL + ");";
        image.className = "image";
        namewithpic.appendChild(image);
        var teacherName = document.createElement("h2");
        var teacherNameText = [teacherObj.chineseName, teacherObj.englishName].join(" ").trim()
        teacherName.style = "margin-bottom: 5px";
        teacherName.innerHTML = "<strong>" + teacherNameText + "</strong>";
        namewithpic.appendChild(teacherName);
        var teacherScore = document.createElement("font");
        teacherScore.style.cssText = "color: #69BDC8; font-size: 20px";
        if (teacherObj.averageScore == null) {
            teacherObj.averageScore = "N/A";
            teacherScore.innerHTML = `<b>` + teacherObj.averageScore + `</b>`;
        } else {
            teacherScore.innerHTML = `<b>` + teacherObj.averageScore.toFixed(2) + `</b>`;
        }
        namewithpic.appendChild(teacherScore);

        //add header title
        document.title = teacherNameText + " | Vmawalk";

        // add courseframe
        var courseFrame = document.getElementById("course-frame")




        let laytpl = layui.laytpl,
            $ = layui.$;

        /**
         * @type {{courses:{id:Number,courseName:string,courseCode:string,teacherId:number,averageScore:string}[],
         * text:{courseId:number,text:string}[]
         * }} courseObj
         */
        var courseObj = courseList;
        courseList = courseObj.courses;

        let reviewList = courseObj.text

        let data = {
            "courseList": courseList,
            "reviewList": reviewList,
            "type": 1
        }

        let courseTpl = courses.innerHTML
        laytpl(courseTpl).render(data, function (html) {
            courseFrame.innerHTML = html;
        })

        if (document.documentElement.clientWidth > 750) {
            $(".mobile").css("display", "none")
        } else {
            $(".standard").css("display", "none")
        }

    }

    function loadCourseMenu() {
        //add namewithpic
        var namewithpic = document.getElementById("namewithpic");

        var courseObj = courseList;
        courseList = courseObj.courses;

        var code = document.createElement("div");
        code.style.cssText = "background-color: #69BDC8;";
        code.innerHTML = "<font color='white'>" + courseList[0].courseCode + "</font>";
        code.className = "code";
        namewithpic.appendChild(code);

        var courseName = document.createElement("h2");
        courseName.style = "margin-bottom: 5px";
        var courseNameText = courseList[0].courseName;
        courseName.innerHTML = "<strong>" + courseNameText + "</strong>";
        namewithpic.appendChild(courseName);
        //add header title
        document.title = courseNameText + " | Vmawalk";

        var teacherScore = document.createElement("font");
        teacherScore.style.cssText = "color: #69BDC8; font-size: 20px";
        if (courseObj.average == null) {
            courseObj.average = "N/A";
            teacherScore.innerHTML = `<b>` + courseObj.average + `</b>`;
        } else {
            teacherScore.innerHTML = `<b>` + courseObj.average.toFixed(2) + `</b>`;
        }
        namewithpic.appendChild(teacherScore);

        // add courseframe
        var courseFrame = document.getElementById("course-frame")



        var teacherNameList = {};

        // add teachers' name into the list
        /**
         * @type {{courses:{id:Number,courseName:string,courseCode:string,teacherId:number,averageScore:string}[],
         * text:{courseId:number,text:string}[]
         * }} courseObj
         */
        courseList.forEach(
            course => {
                // find teacher with id
                var teacher = teachers.find(teacher => teacher.id === course.teacherId)
                // parse the teacher name
                teacherNameList[teacher.id] = [teacher.chineseName, teacher.englishName].join(" ").trim()
            }
        )

        var reviewList = courseObj.text

        var data = {
            "courseList": courseList,
            "reviewList": reviewList,
            "teacherNameList": teacherNameList,
            "Imagelink": Imagelink,
            "type": 2
        }

        let courseTpl = courses.innerHTML
        laytpl(courseTpl).render(data, function (html) {
            courseFrame.innerHTML = html;
        })

        if (document.documentElement.clientWidth > 750) {
            $(".mobile").css("display", "none")
        } else {
            $(".standard").css("display", "none")
        }
    }

    var url = "";
    var teacher = null;
    var layer = layui.layer;

    function layuiLoading() {
        let index = layer.load(0, { offset: ['50%', '50%'], shade: false });
        return index;
    }

    function layuiRemoveLoading(loading) {
        var layer = layui.layer
        layer.close(loading);
    }

    callData = async function () {
        var data = {}
        let teacherLoading;
        if (query[0] == "1") {
            url = "https://vma-walk.azurewebsites.net/api/teacher/GetCourses";
            data.id = Number(queryID);
        } else if (query[0] == "2") {
            url = "https://vma-walk.azurewebsites.net/api/course/GetWithCode";
            data.code = queryID;
        }
        let courseLoading = $.get({
            url: url,
            data: data,
            /**@param {{courses:{id:Number,courseName:string,courseCode:string,teacherId:number}[],
             * text:{courseId:number,text:string}[]
             * }} req
             */
            success: function (req) {
                teacherObj = req.teacher;
                courseList = req;
                console.log(courseList)
            },
            error: function (req) {
                console.log(req);
            }
        });
        await courseLoading

        if (query[0] == "1") {
            loadTeacherMenu();
        }
        if (query[0] == "2") {
            loadCourseMenu();
        }
        console.log(document.body.clientHeight);
    }

    async function load() {
        let index = layuiLoading();

        await waitInitial;
        loadHeader();

        loadCourseListTitle();
        await callData();
        layuiRemoveLoading(index);
        loadFooter();
    }



    window.onload = load();

    var width = $(window).width()
    
})