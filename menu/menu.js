function getUrlQueryString() {
    var equal = window.location.href.indexOf("=")
    var query = window.location.href.substring(equal + 1);
    return query;
};

//global variable
var teacherObj;
var courseList;

function callData(query, callback) {
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
            });
            url = "https://vma-walk.azurewebsites.net/api/course/GetWithTeachers";
            data.id = Number(queryID);
        } else if (query[0] == "2") {
            url = "https://vma-walk.azurewebsites.net/api/course/GetWithCode";
            data.code = queryID;
        }

        $.ajax({
            type: "GET",
            url: url,
            contentType: "application/json",
            data: data,
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

window.onload = function() {

    //init
    console.log(decodeURI(window.location.href));
    var query = "2-ENG207" //getUrlQueryString(decodeURI(window.location.href));
    queryID = query.substring(2)

    callData(query, function() {
        if (query[0] == "1") {
            //add namewithpic
            namewithpic = document.getElementById("namewithpic");

            var image = document.createElement("div");
            image.style.cssText = 'background-image: url(https://github.com/JeffreytheCoder/vmawalk/blob/master/img/wanghe.jpg?raw=true);';
            image.className = "image";
            namewithpic.appendChild(image);

            var teacherName = document.createElement("h2");
            teacherName.innerHTML = "<strong>" + teacherObj.chineseName + " " + teacherObj.englishName + "</strong>";
            namewithpic.appendChild(teacherName);

            // add courseframe
            courseFrame = document.getElementById("course-frame")
            scoreList = courseList.averageScore.split("|")
            console.log(scoreList);
            for (i = 0; i < courseList.length; i++) {
                var course = document.createElement("div");
                course.className = "course";
                course.innerHTML = `<br>
    <table>
        <tr>
            <td width="90px">
                <a href="#" style="text-decoration: none; color: white;">
                    <div class="icon-round">` + courseList[i].courseCode + `</div>
                </a>
            </td>
            <td width="110px">
                <a href="#" style="text-decoration: none;">
                    <font color="black" size="3">` + courseList[i].courseName + `</font><br />
                    <font color="#69BDC8" size="2">Full Profile ></font>
                </a>
                <td class="rating-cell">
                    <font size="5" color="black">N/A</font><br /> Overall
                </td>
                <td class="rating-cell">
                    <font size="5" color="black">N/A</font><br /> Overall
                </td>
                <td class="rating-cell">
                    <font size="5" color="black">N/A</font><br /> Overall
                </td>
                <td class="rating-cell">
                    <font size="5" color="black">N/A</font><br /> Overall
                </td>
                <td class="rating-cell">
                    <font size="5" color="black">N/A</font><br /> Overall
                </td>
                <td width="200px">
                    No Reviews
                </td>
        </tr>
    </table>
    <br>`;
                courseFrame.appendChild(course);
            }

        }

        if (query[0] == "2") {
            //add namewithpic
            namewithpic = document.getElementById("namewithpic");

            var code = document.createElement("div");
            code.style.cssText = "background-color: #69BDC8;";
            code.innerHTML = "<font color='white'>" + queryID + "</font>";
            code.className = "code";
            namewithpic.appendChild(code);

            var courseName = document.createElement("h2");
            courseObj = courseList;
            courseList = courseList.courses;
            courseNameText = courseList[0].courseName;
            courseName.innerHTML = "<strong>" + courseNameText + "</strong>";
            namewithpic.appendChild(courseName);

            // add courseframe
            courseFrame = document.getElementById("course-frame")
            teacherNameList = [];
            for (i = 0; i < courseList.length; i++) {
                teacherID = courseList[i].teacherId;
                // search for teacher's name
                for (j = 0; j < teachers.length; j++) {
                    if (teachers[j].id == teacherID) {
                        if (teachers[j].chineseName == null) {
                            teacherName = teachers[j].englishName
                        } else {
                            teacherName = teachers[j].chineseName + " " + teachers[j].englishName
                        }
                    }
                }
                teacherNameList.push(teacherName);
            }
            reviewList = courseObj.text
            console.log(reviewList)
            for (i = 0; i < courseList.length; i++) {
                // get each coursewithteacher's score
                var scoreList = ["N/A", "N/A", "N/A", "N/A", "N/A"];
                if (courseList[i].averageScore != null) {
                    scoreList = courseList[i].averageScore.split("|")
                    console.log(scoreList);
                }
                // get each coursewithteacher's best review
                console.log("here")
                var bestReview = "No Review";
                for (i = 0; i < reviewList.length; i++) {
                    if (reviewList[i].courseId == courseList[i].id) {
                        bestReview = reviewList[i].text
                    }
                }
                var course = document.createElement("div");
                course.className = "course";
                course.innerHTML = `<br>
        <table>
            <tr>
                <td width="90px">
                    <a href="#">
                    <div class="icon-round" style="background-image: url(../img/wanghe.jpg);"></div>
                    </a>
                </td>
                <td width="110px">
                    <a href="#" style="text-decoration: none;">
                        <font color="black" size="3">` + teacherNameList[i] + `</font><br />
                        <font color="#69BDC8" size="2">Full Profile ></font>
                    </a>
                    <td class="rating-cell">
                        <font size="5" color="black">` + scoreList[0] + `</font><br /> Overall
                    </td>
                    <td class="rating-cell">
                        <font size="5" color="black">` + scoreList[1] + `</font><br /> Overall
                    </td>
                    <td class="rating-cell">
                        <font size="5" color="black">` + scoreList[2] + `</font><br /> Overall
                    </td>
                    <td class="rating-cell">
                        <font size="5" color="black">` + scoreList[3] + `</font><br /> Overall
                    </td>
                    <td class="rating-cell">
                        <font size="5" color="black">` + scoreList[4] + `</font><br /> Overall
                    </td>
                    <td width="200px">` + bestReview + `</td>
            </tr>
        </table>
        <br>`;
                courseFrame.appendChild(course);
            }
        }
    })
}