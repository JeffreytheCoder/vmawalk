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

    /**
     * @type {{courses:{id:Number,courseName:string,courseCode:string,teacherId:number,averageScore:string}[],
     * text:{courseId:number,text:string}[]
     * }} courseObj
     */

    var courseObj = courseList;
    courseList = courseObj.courses;

    var reviewList = courseObj.text

    courseList.forEach(
        course => {
            var scoreList = ["N/A", "N/A", "N/A", "N/A", "N/A"],
                bestReview = "No Review",
                queryLink = "../profile/profile.html?query=" + course.id + "";
            if (course.averageScore != null) {
                scoreList = course.averageScore.split("|");
            }
            var review = reviewList.find(review =>
                review.courseId == course.id
            )
            if (review != undefined) {
                bestReview = review.text;
            }

            if (document.documentElement.clientWidth <= 700) {
                var courseElement = document.createElement("div");
                courseElement.className = "course";
                courseElement.innerHTML = `
            <table>
            <tr>
            <td class="td-small">
                <a href="` + queryLink + `" class="profile-link">
                    <div class="icon-round">` + course.courseCode + `</div>
                    <div class="teacher-name">
                        <font color="black" size="3" style="margin-bottom: 5px;">` + course.courseName + `</font>
                        <font color="#69BDC8" size="2">Full Profile ></font>
                    </div>
                </a>
            </td>
            <td class="rating-cell" >
                <font size="5" color="black">` + scoreList[0] + `</font><br /> Overall
            </td>
            </table>
            <span style="width: 15px"></span>`;
                courseFrame.appendChild(courseElement);
            } else {
                var courseElement = document.createElement("div");
                courseElement.className = "course";
                courseElement.innerHTML = `
            <table>
            <tr>
            <td class="td-large">
                <a href="` + queryLink + `" class="profile-link">
                    <div class="icon-round">` + course.courseCode + `</div>
                    <div class="teacher-name">
                        <font color="black" size="3" style="margin-bottom: 5px;">` + course.courseName + `</font>
                        <font color="#69BDC8" size="2">Full Profile ></font>
                    </div>
                </a>
            </td>
            <td class="rating-cell">
            <font size="5" color="black">` + scoreList[0] + `</font><br /> Overall
            </td>
            <td class="rating-cell">
                <font size="5" color="black">` + scoreList[1] + `</font><br /> Easiness
            </td>
            <td class="rating-cell">
                <font size="5" color="black">` + scoreList[2] + `</font><br /> Workload
            </td>
            <td class="rating-cell">
                <font size="5" color="black">` + scoreList[3] + `</font><br /> Clarity
            </td>
            <td class="rating-cell">
                <font size="5" color="black">` + scoreList[4] + `</font><br /> Helpfulness
            </td>
            <td class="td-large"><div class="review">` + bestReview + `</div></td>
            </tr>
            </table>
            `;
                courseFrame.appendChild(courseElement);
            }
        }
    )
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
    courseList.forEach(
        course => {
            // find teacher with id
            var teacher = teachers.find(teacher => teacher.id === course.teacherId)
                // parse the teacher name
            teacherNameList[teacher.id] = [teacher.chineseName, teacher.englishName].join(" ").trim()
        }
    )

    var reviewList = courseObj.text

    courseList.forEach(
        course => {
            //prepare score list, best review, and image link
            var scoreList = ["N/A", "N/A", "N/A", "N/A", "N/A"],
                bestReview = "No Review",
                queryLink = "../profile/profile.html?query=" + course.id + "";
            if (course.averageScore != null) {
                scoreList = course.averageScore.split("|");
            }
            var review = reviewList.find(review =>
                review.courseId == course.id
            )
            if (review != undefined) {
                bestReview = review.text;
            }
            var imageURL = Imagelink[course.teacherId];


            var courseElement = document.createElement("div");
            courseElement.className = "course";
            courseElement.innerHTML = `
        
        <table>
        <tr>
            <td class="td-large">
            <a href=` + queryLink + ` class="profile-link">
                <div class="icon-round2" style="background-image: url(` + imageURL + `);">
                </div>
                <div class="teacher-name">
                    <font color="black" size="3" style="margin-bottom: 5px;">` + teacherNameList[course.teacherId] + `</font>
                    <font color=" #69BDC8" size="2">Full Profile ></font>
                </div>
            </a>
        </td>
            <td class="rating-cell">
            <font size="5" color="black">` + scoreList[0] + `</font><br /> Overall
            </td>
            <td class="rating-cell">
            <font size="5" color="black">` + scoreList[1] + `</font><br /> Easiness
            </td>
            <td class="rating-cell">
            <font size="5" color="black">` + scoreList[2] + `</font><br /> Workload
            </td>
            <td class="rating-cell">
            <font size="5" color="black">` + scoreList[3] + `</font><br /> Clarity
            </td>
            <td class="rating-cell">
            <font size="5" color="black">` + scoreList[4] + `</font><br /> Helpfulness
            </td>
            <td class="td-large"><div class="review">` + bestReview + `</div></td>
            </tr>
            </table>
            `;
            courseFrame.appendChild(courseElement);
        }
    )
}

function layuiLoading() {
    layui.use(['layer'], function() {
        index = layer.load(0, { shade: false });
    });
}

function layuiRemoveLoading() {
    layui.use(['layer'], function() {
        var layer = layui.layer
        layer.close(index);
    });
}

layui.use(["jquery", "layer"], function() {
    var $ = layui.$;
    var url = "";
    var teacher = null;
    var layer = layui.layer;

    callData = async function() {
        var data = {}
        let teacherLoading;
        if (query[0] == "1") {
            teacherLoading = $.get("https://vma-walk.azurewebsites.net/api/teacher/" + queryID).then(
                function(result) {
                    teacherObj = result;
                    console.log(result)
                });
            url = "https://vma-walk.azurewebsites.net/api/course/GetWithTeachers";
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
            success: function(req) {
                courseList = req;
                console.log(courseList)
            },
            error: function(req) {
                console.log(req);
            }
        });
        await Promise.all([teacherLoading, courseLoading])

        if (query[0] == "1") {
            loadTeacherMenu();
        }
        if (query[0] == "2") {
            loadCourseMenu();
        }
        console.log(document.body.clientHeight);
    }

    async function load() {
        index = layer.load(0, { shade: false });
        loadHeader();
        loadCourseListTitle();
        await callData();
        loadFooter();
        layer.close(index);
    }

    window.onload = load;
    window.onresize = function() {
        location.reload();
    };
})