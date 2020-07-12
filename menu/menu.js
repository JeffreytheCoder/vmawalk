function getUrlQueryString() {
    var equal = window.location.href.indexOf("=")
    var query = window.location.href.substring(equal + 1);
    return query;
};

//global variable
var teacherObj;
var courseList = null;

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
            /**
             *
             *
             * @param {{courses:{id:Number,courseName:string,courseCode:string,teacherId:number}[],
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

window.onload = function() {

    //init
    console.log(decodeURI(window.location.href));
    var query = getUrlQueryString(decodeURI(window.location.href));
    queryID = query.substring(2)

    callData(query, queryID, function() {
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
            var courseFrame = document.getElementById("course-frame")

            var courseObj = courseList;
            courseList = courseObj.courses;

            var reviewList = courseObj.text
            console.log(reviewList)

            courseList.forEach(
                course => {
                    var scoreList = ["N/A", "N/A", "N/A", "N/A", "N/A"],
                        bestReview = "No Review";
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
                    courseFrame.appendChild(course);
                }
            )
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

            /**
             * @type {{
             * courses:{id:Number,courseName:string,courseCode:string,teacherId:number,averageScore:string}[],
             * text:{courseId:number,text:string}[]
             * }} courseObj
             */
            var courseObj = courseList;
            courseList = courseObj.courses;

            var courseNameText = courseList[0].courseName;

            courseName.innerHTML = "<strong>" + courseNameText + "</strong>";
            namewithpic.appendChild(courseName);

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
                    var scoreList = ["N/A", "N/A", "N/A", "N/A", "N/A"],
                        bestReview = "No Review";
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
                <td width="90px">
                    <a href="#">
                    <div class="icon-round" style="background-image: url(../img/wanghe.jpg);"></div>
                    </a>
                </td>
                <td width="110px">
                    <a href="#" style="text-decoration: none;">
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
    })
}