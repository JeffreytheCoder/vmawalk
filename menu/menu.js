function getUrlQueryString() {
    var equal = window.location.href.indexOf("=")
    var query = window.location.href.substring(equal + 1);
    return query;
}

//global variable
var teacherObj;
var courseList = null;
var count = 0;
var footerCount = 0;

function callData(query, queryID, callback) {
    layui.use(["jquery", "layer"], function() {
        var $ = layui.$;
        var url = "";
        var teacher = null;

        var data = {}
        if (query[0] == "1") {
            $.get("https://vma-walk.azurewebsites.net/api/teacher/" + queryID, function(result) {
                teacher = result;
                teacherObj = teacher;
                console.log(teacher)
                callback();
            });
            url = "https://vma-walk.azurewebsites.net/api/course/GetWithTeachers";
            data.id = Number(queryID);
        } else if (query[0] == "2") {
            url = "https://vma-walk.azurewebsites.net/api/course/GetWithCode";
            data.code = queryID;
            callback();
        }

        $.ajax({
            type: "GET",
            url: url,
            contentType: "application/json",
            data: data,
            /**@param {{courses:{id:Number,courseName:string,courseCode:string,teacherId:number}[],
             * text:{courseId:number,text:string}[]
             * }} req
             */
            success: function(req) {
                courseList = req;
                console.log(courseList)
                callback();
            },
            error: function(req) {
                console.log(req);
                callback();
            }
        });
    })
}

function loadCourseListTitle() {
    let courselisttitle = document.getElementById("course-list-title");
    var title = document.createElement("div");
    title.className = "courses-list-title";
    if (document.documentElement.clientWidth <= 700) {
        title.innerHTML = `<b>Courses / Teachers</b>`
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
    if (teacherObj.averageScore == null || teacherObj.averageScore == 5) {
        teacherObj.averageScore = "N/A";
        teacherScore.innerHTML = ` < b > ` + teacherObj.averageScore + ` < /b>`;
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
                courseElement.innerHTML = `<br>
            <table>
            <tr>
            <td width="200px">
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
            </table>
            <br>`;
                courseFrame.appendChild(courseElement);
            } else {
                var courseElement = document.createElement("div");
                courseElement.className = "course";
                courseElement.innerHTML = `<br>
            <table>
            <tr>
            <td width="200px">
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
            <td width="200px" class="review"><div style="overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 5; -webkit-box-orient: vertical;">` + bestReview + `</div></td>
            </tr>
            </table>
            <br>`;
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
        <br>
        <table>
            <tr>
            <td width="200px">
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
            <td width="200px" class="review"><div style="overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 5; -webkit-box-orient: vertical;">` + bestReview + `</div></td>
            </tr>
            </table>
            <br>`;
            courseFrame.appendChild(courseElement);
        }
    )
}

window.onload = function() {
    //init
    var query = getUrlQueryString(decodeURI(window.location.href));
    console.log(query);
    var queryID = query.substring(2);
    loadHeader();
    loadCourseListTitle()
    var callStart = new Date().getTime();
    callData(query, queryID, function() {
        count++;
        if (count == 2) {
            var callEnd = new Date().getTime();
            console.log("Call time (s): " + (callEnd - callStart) / 1000);
            if (query[0] == "1") {
                loadTeacherMenu();
            }
            if (query[0] == "2") {
                loadCourseMenu();
            }
            var loadEnd = new Date().getTime();
            console.log("Load time (s): " + (loadEnd - callEnd) / 1000);
            console.log(document.body.clientHeight);
            loadFooter();
        }
    })
}