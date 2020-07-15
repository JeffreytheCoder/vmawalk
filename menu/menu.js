function getUrlQueryString() {
    var equal = window.location.href.indexOf("=")
    var query = window.location.href.substring(equal + 1);
    return query;
};

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

        data = {}
        if (query[0] == "1") {
            $.get("https://vma-walk.azurewebsites.net/api/teacher/" + queryID, function(result) {
                teacher = result;
                teacherObj = teacher;
                console.log(teacher)
                callback();
            });
            url = "https://localhost:5001/api/course/GetWithTeachers";
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

function loadTeacherMenu() {
    //add namewithpic
    namewithpic = document.getElementById("namewithpic");

    var image = document.createElement("div");
    var imageURL = Imagelink[teacherObj.id];
    image.style.cssText = 'background-image: url(' + imageURL + ');';
    console.log(imageURL);
    image.className = "image";
    namewithpic.appendChild(image);
    var teacherName = document.createElement("h2");
    var teacherNameText = [teacherObj.chineseName, teacherObj.englishName].join(" ").trim()
    teacherName.innerHTML = "<strong>" + teacherNameText + "</strong>";
    namewithpic.appendChild(teacherName);

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
    console.log(reviewList)

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

            var courseElement = document.createElement("div");
            courseElement.className = "course";
            courseElement.innerHTML = `<br>
            <table>
            <tr>
            <td width="200px">
                <a href="` + queryLink + `" class="profile-link">
                    <div class="icon-round">` + course.courseCode + `</div>
                    <div class="course-name">
                        <font color="black" size="3">` + course.courseName + `</font><br />
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
            <td width="200px" style="text-align: center; margin-left: 10px;">` + bestReview + `</td>
            </tr>
            </table>
            <br>`;
            courseFrame.appendChild(courseElement);
        }
    )
}

function loadCourseMenu() {
    //add namewithpic
    namewithpic = document.getElementById("namewithpic");

    var code = document.createElement("div");
    code.style.cssText = "background-color: #69BDC8;";
    code.innerHTML = "<font color='white'>" + queryID + "</font>";
    code.className = "code";
    namewithpic.appendChild(code);

    var courseName = document.createElement("h2");

    var courseObj = courseList;
    courseList = courseObj.courses;
    console.log(courseList)

    var courseNameText = courseList[0].courseName;

    courseName.innerHTML = "<strong>" + courseNameText + "</strong>";
    namewithpic.appendChild(courseName);
    //add header title
    document.title = courseNameText + " | Vmawalk";

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
    console.log(reviewList)

    courseList.forEach(
        course => {
            //prepare score list, best review, and image link
            var scoreList = ["N/A", "N/A", "N/A", "N/A", "N/A"],
                bestReview = "No Review",
                queryLink = "https://jeffreythecoder.github.io/vmawalk/profile/profile?query=" + course.id + "";
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
            courseElement.innerHTML = `<br>
            <table>
            <tr>
            <td width="90px">
            <a href="` + queryLink + `">
            <div class="icon-round" style="background-image: url(` + imageURL + `)></div>
            </a>
            </td>
            <td width="110px">
            <a href="` + queryLink + `" style="text-decoration: none;">
            <font color="black" size="3">` + teacherNameList[course.teacherId] + `</font><br />
            <font color="#69BDC8" size="2">Full Profile ></font>
            </a>
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
            <td width="200px">` + bestReview + `</td>
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
    queryID = query.substring(2);

    loadHeader();
    callData(query, queryID, function() {
        count++;
        console.log(count);
        if (count == 2) {
            if (query[0] == "1") {
                loadTeacherMenu();
            }
            if (query[0] == "2") {
                loadCourseMenu();
            }
            loadFooter();
        }
    })
}