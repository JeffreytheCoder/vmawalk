//global variable
layui.use("layer", function() {
    if (localStorage.getItem("token") == null) {
        layer.msg("请登录");

        setTimeout(() => {
            window.location.href = "../login/login.html";
        }, 1000);
    }
});

var reviewList;

function logOut() {
    // var token = localStorage.getItem("token")
    localStorage.removeItem("token");
    layui.use("layer", function() {
        layer.msg("退出登录成功");
    });
    setTimeout(() => {
        self.location = document.referrer;
        // window.location.href = "javascript:history.back(-1)";
    }, 1000);
}

function getUserReviews(callback) {
    layui.use(["jquery"], function() {
        /**
         * @type {JQueryStatic}
         */
        var $ = layui.$;



        $.get({
            url: "https://vma-walk.azurewebsites.net/api/Review/GetUserReviews",
            /**
             * @param {{
             * id:number,
             * userId:number,
             * courseId:number,
             * teacherId:number,
             * year:number,
             * semester:boolean,
             * grade:string,
             * score:string,
             * text:string,
             * likes:number
             * }[]} data - 课程类型
             */
            success: function(data) {
                reviewList = data;
                console.log(data);
                callback();
            },
            dataType: "json",
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        })
    })
}

function loadReview() {
    for (i = 0; i < reviewList.length; i++) {
        // get teacher name
        var teacher = teachers.find(teacher => teacher.id === reviewList[i].teacherId);
        var teacherName = [teacher.chineseName, teacher.englishName].join(" ").trim();
        // get course name and coursecode
        var course = CoursesWithTeacher.find(course => course.id === reviewList[i].courseId);
        var courseName = course.courseName;
        var courseCode = course.courseCode;
        // convert semester
        var semester = " Full Year";
        if (reviewList[i].semester) {
            semester = " Semester 1";
        }
        if (reviewList[i].semester == false) {
            semester = " Semester 2";
        }
        //convert insertDate
        var date = reviewList[i].insertDate.split("T")[0];
        // get scores
        var scoreList = reviewList[i].score.split("|");

        // add a review block
        reviewDiv = document.getElementById("review-div");
        var review = document.createElement("div");
        review.className = "info-content";
        review.innerHTML = `<div>
        <table width="100%">
            <tr>
                <td class="review-upper">
                    <div class="review-info">
                        <div>
                            <div class="review-title">` + courseCode + ` ` + courseName + `</font>
                            </div>
                            <div>
                                <font size="4">` + teacherName + `</font>
                            </div>
                        </div>
                        <div class="date">
                            <span>` + reviewList[i].year + ` ` + semester + `</span>
                            <span>Submitted ` + date + `</span>
                            <span>Likes Recieved: ` + reviewList[i].likes + `</span>
                        </div>
                    </div>
                    <div class="rating-table">
                        <div class="review-title">Ratings</div>
                        <table width="auto">
                            <tr>
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
                            </tr>
                        </table>
                    </div>
                </td>
            </tr>
            <tr>
                <td>
                    <div class="review-content">
                        <div style="display: flex; justify-content: space-between;">
                            <div class="review-title">Review</div>
                        </div>
                        <p>` + reviewList[i].text + `</p>
                    </div>
                </td>
            </tr>
        </table>
    </div>`;
        reviewDiv.appendChild(review);
    }
}


window.onload = function() {
    loadHeader();
    getUserReviews(function() {
        loadReview();
        loadFooter();
    })
}