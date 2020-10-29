//global variable
layui.use("layer", function () {
    var token = localStorage.getItem("token")
    if (!localStorage.getItem("token")) {
        layui.layer.msg("您暂未登录，请先登录!");
        setTimeout(() => {
            layuiRemoveLoading()
            toLogin();
        }, 1000);
    } else {
        var user = JSON.parse(b64_to_utf8(token.split(".")[1]))
        if (user.exp < Date.now() / 1000) {
            layui.layer.msg("您的登录已超时，请重新登录");
            setTimeout(() => {
                layuiRemoveLoading()
                toLogin();
            }, 1000);

        }
    }
});


var reviewList;

function logOut() {
    // var token = localStorage.getItem("token")
    localStorage.removeItem("token");
    layui.use("layer", function () {
        layui.layer.msg("退出登录成功");
    });
    setTimeout(() => {
        toPreviousPage();
        // self.location = document.referrer;
        // window.location.href = "javascript:history.back(-1)";
    }, 1000);
}

function getUserReviews(callback) {
    layui.use(["jquery"], function () {
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
            success: function (data) {
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
    for (let i = reviewList.length - 1; i >= 0; i--) {
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
        let date = reviewList[i].insertDate.split("T")[0];
        // get scores
        let scoreList = reviewList[i].score;

        // add a review block
        let reviewDiv = document.getElementById("review-div");
        let review = document.createElement("div");
        review.className = "info-content";

        // mobile adjustment
        review.innerHTML = `
        <div class="mobile">
            <table width="100%">
                <tr>
                    <td class="review-upper" style="display: block;">
                        <div class="review-info" style="display: flex; flex-direction: row; align-items: flex-end;">
                            <div>
                                <div class="review-title">` + courseName + `</font>
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
                        <hr>
                        <div class="rating-table">
                            <div class="review-title">
                                <div>Ratings</div>
                                <button class="edit">Edit</button>
                            </div>
                            <table width="auto">
                                <tr>
                                    <td class="rating-cell" style="font-size: 10px;">
                                        <font size="5" color="black">` + scoreList[0] + `</font><br /> Overall
                                    </td>
                                    <td class="rating-cell" style="font-size: 10px;">
                                        <font size="5" color="black">` + scoreList[1] + `</font><br /> Easiness
                                    </td>
                                    <td class="rating-cell" style="font-size: 10px;">
                                        <font size="5" color="black">` + scoreList[2] + `</font><br /> Workload
                                    </td>
                                    <td class="rating-cell" style="font-size: 10px;">
                                        <font size="5" color="black">` + scoreList[3] + `</font><br /> Clarity
                                    </td>
                                    <td class="rating-cell" style="font-size: 10px;">
                                        <font size="5" color="black">` + scoreList[4] + `</font><br /> Helpfulness
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
        </div>
        <div class="standard">
        <table width="100%">
            <tr>
                <td class="review-upper">
                    <div class="review-info">
                        <div>
                            <div class="review-title">` + courseName + `</font>
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
                        <div class="review-title">
                            <div>Ratings</div>
                            <button class="edit">Edit</button>
                        </div>
                        <table width="auto">
                            <tr>
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

function toPreviousPage() {
    var a = document.referrer;
    var b = a.split("/");
    var c = b.slice(b.length - 1, b.length).toString(String).split(".");
    var previousPage = c.slice(0, 1);
    if (previousPage[0] === "myreview") {
        console.log("对了");
        history.go(-3);
    } else {
        console.log(previousPage[0]);
        // history.go(-1);
        self.location = document.referrer;
    }
}

function layuiLoading() {
    layui.use(['layer'], function () {
        index = layer.load(0, { shade: false });
    });
}

function layuiRemoveLoading() {
    layui.use(['layer'], function () {
        var layer = layui.layer
        layer.close(index);
    });
}

window.onload = function () {
    layuiLoading();
    loadHeader();
    getUserReviews(function () {
        loadReview();
        layuiRemoveLoading();
        loadFooter();
        layui.use("jquery", function () {
            const $ = layui.jquery;
            if (document.documentElement.clientWidth > 750) {
                $(".Hstandard").css("display", "flex")
                $(".standard").css("display", "block")
                $(".Hmobile").css("display", "none")
                $(".mobile").css("display", "none")
                $(".container").css({ width: "450px", margin: "" })
                $("#teacherList").css({ width: "", margin: "" })
            } else {
                $(".Hmobile").css("display", "flex")
                $(".mobile").css("display", "block")
                $(".Hstandard").css("display", "none")
                $(".standard").css("display", "none")
                $(".container").css({ width: "auto", margin: "auto 20px" })
                $("#teacherList").css({ width: "100%", margin: "10px" })
            }

        })
    })
}