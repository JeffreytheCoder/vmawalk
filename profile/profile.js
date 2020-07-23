function getUrlQueryString() {
    let equal = window.location.href.indexOf("=")
    let getQuery = window.location.href.substring(equal + 1);
    return getQuery;
};

//global variable
var count = 0;
var coursewithteacher;
var teacherName;
var reviewList;

function Like(reviewId, reviewIndex) {
    layui.use("layer", function() {
        var layer = layui.layer;
        var token = localStorage.getItem("token")
        if (!token) {
            layer.msg("您暂未登录，请先登录!");
            setTimeout(() => {
                self.location = "../login/login.html";
            }, 1000);
        } else {
            var user = JSON.parse(b64_to_utf8(token.split(".")[1]))
            if (user.exp < Date.now() / 1000) {
                layer.msg("您暂未登录，请先登录!");
                setTimeout(() => {
                    self.location = "../login/login.html";
                }, 1000);
            } else {
                // post like number change to dataset
                fetch("https://vma-walk.azurewebsites.net/api/Review/Like?reviewId=" + reviewId, {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token")
                    }
                }).then(res => {
                    // 400 代表已经点过赞
                    if (res.status === 400) {
                        layer.msg("You can only give one Like for each review");
                    } else {
                        // change like number on page
                        var reviewLike = document.getElementById(reviewIndex);
                        reviewLike.text = "🙂Like " + (reviewList[reviewIndex].likes + 1);
                        reviewLike.style = "color: #1e8997; font-weight: bold"
                    }
                })
            }
        }
    })
}


function callInfo(id, callback) {
    layui.use(["jquery", "layer"], function() {

        /**
         * @type {JQueryStatic}
         */
        var $ = layui.$;
        $.get(
            "https://vma-walk.azurewebsites.net/api/Course/" + id,
            /**
             * @param {{
             * id:number,
             * courseName:string,
             * teacherId:number,
             * averageScore:number
             * }} info - 课程属性
             */
            function(info) {
                console.log(info); // 这个是整个课程的信息，你读一下console就知道里面有什么了
                coursewithteacher = info;
                loadInfo.then(function() {
                    var teacher = teachers.find(teacher => teacher.id == info.teacherId);
                    teacherName = [teacher.chineseName, teacher.englishName].join(" ").trim()
                    callback();
                })
            }
        )

        $.get(
            "https://vma-walk.azurewebsites.net/api/Review", {
                id: id
            },
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
             * }[]} result - 课程类型
             */
            function(result) {
                // result 是一组Review
                reviewList = result;
                console.log(result)
                callback();
            }
        )

        var token = localStorage.getItem("token")
        if (token) {
            var user = JSON.parse(b64_to_utf8(token.split(".")[1]))
            if (user.exp > Date.now() / 1000) {
                $.get({
                    url: "https://vma-walk.azurewebsites.net/api/Review/GetUserLikes",
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token")
                    },
                    /**
                     * @param {number[]} data
                     */
                    success: function(data) {
                        console.log(data);
                        callback();
                    },
                    dataType: "json"
                })
            } else {
                callback();
            }
        } else {
            callback();
        }
    })
}


function loadData() {
    count++;
    if (count == 3) {
        //prepare scoreList and widthList of rating cells
        var scoreList = ["N/A", "N/A", "N/A", "N/A", "N/A"];
        var widthList = ["0%", "0%", "0%", "0%", "0%"];
        if (coursewithteacher.averageScore != null) {
            scoreList = coursewithteacher.averageScore.split("|")
            for (let i = 0; i < scoreList.length; i++) {
                widthList[i] = "" + ((scoreList[i] / 5.0).toFixed(2) * 100).toFixed(0) + "%"
            }
        }
        //prepare teacher image        
        var imageURL = Imagelink[coursewithteacher.teacherId];
        if (imageURL == undefined) {
            imageURL = "https://pic.downk.cc/item/5f119eb214195aa594188884.png";
        }

        //mobile adjustment
        var fontSize = 60;
        if (document.documentElement.clientWidth <= 700) {
            var fontSize = 30;
        }
        //add namewithpic
        var namewithpic = document.getElementById("namewithpic");
        var namewithpicElement = document.createElement("div");
        namewithpicElement.innerHTML = `<table height="120px">
<tr height="80px">
    <td rowspan="2" width="130px" height="100%">
        <a href="../menu/menu.html?query=2-` + coursewithteacher.courseCode + `" style="font-size: 18px; text-decoration: none; color: white;">
            <div class="icon-round">` + coursewithteacher.courseCode + `</div>
        </a>
    </td>
    <td height="100%">
        <p style="font-size:` + fontSize + `px"><strong>` + coursewithteacher.courseName + `</strong></p>
    </td>
</tr>
<tr height="40px">
        <td style="display: flex; align-items: center;">
            <a style="white-space:nowrap; display:flex; align-items: center;" href="../menu/menu.html?query=1-` + coursewithteacher.teacherId + `">
                <div class="teacher-icon" style="background-image: url(` + imageURL + `);">
                </div>
                <font size="4">` + teacherName + `</font>
            </a>
        </td>
</tr>
</table>`
        namewithpic.appendChild(namewithpicElement);

        //add header title
        document.title = teacherName + " - " + coursewithteacher.courseName + " | Vmawalk";

        //add ratings
        var ratings = document.getElementById("ratings");
        var ratingBox = document.createElement("div");
        ratingBox.className = "display-box";
        ratingBox.innerHTML = `<table width="100%">
        <tr class="rating-cell">
            <td align="center" width="20%">Bad</td>
            <td width="60%">
                <div style="display: flex; justify-content: space-between;">
                    <font color="black">Overall</font>
                    <font color="#69BDC8"><b>` + scoreList[0] + `</b></font>
                </div>
                <div class="rating-bar">
                    <div style="width: ` + widthList[0] + `;" class="rating-inside-bar">
                    </div>
                </div>
            </td>
            <td align=" center" width="20%">Good</td>
        </tr>
        <tr class="rating-cell">
            <td align="center" width="20%">Hard</td>
            <td width="60%">
                <div style="display: flex; justify-content: space-between;">
                    <font color="black">Easiness</font>
                    <font color="#69BDC8"><b>` + scoreList[1] + `</b></font>
                </div>
                <div class="rating-bar">
                    <div style="width: ` + widthList[1] + `;" class="rating-inside-bar">
                    </div>
                </div>
            </td>
            <td align=" center" width="20%">Easy</td>
        </tr>
        <tr class="rating-cell">
            <td align="center" width="20%">Heavy</td>
            <td width="60%">
                <div style="display: flex; justify-content: space-between;">
                    <font color="black">Workload</font>
                    <font color="#69BDC8"><b>` + scoreList[2] + `</b></font>
                </div>
                <div class="rating-bar">
                    <div style="width: ` + widthList[2] + `;" class="rating-inside-bar">
                    </div>
                </div>
            </td>
            <td align=" center" width="20%">Light</td>
        </tr>
        <tr class="rating-cell">
            <td align="center" width="20%">Confuse</td>
            <td width="60%">
                <div style="display: flex; justify-content: space-between;">
                    <font color="black">Clarity</font>
                    <font color="#69BDC8"><b>` + scoreList[3] + `</b></font>
                </div>
                <div class="rating-bar">
                    <div style="width: ` + widthList[3] + `;" class="rating-inside-bar">
                    </div>
                </div>
            </td>
            <td align=" center" width="20%">Clear</td>
        </tr>
        <tr class="rating-cell">
            <td align="center" width="20%">Helpless</td>
            <td width="60%">
                <div style="display: flex; justify-content: space-between;">
                    <font color="black">Helpfulness</font>
                    <font color="#69BDC8"><b>` + scoreList[4] + `</b></font>
                </div>
                <div class="rating-bar">
                    <div style="width: ` + widthList[4] + `;" class="rating-inside-bar">
                    </div>
                </div>
            </td>
            <td align=" center" width="20%">Helpful</td>
        </tr>
    </table>`
        ratings.appendChild(ratingBox);


        //add reviews
        var reviews = document.getElementById("reviews");
        if (reviewList.length == 0) {
            //add reviewBox
            let reviewBox = document.createElement("div");
            reviewBox.className = "display-box";
            reviewBox.innerHTML = `<table class="review-table" style="margin: 20px; margin-bottom: 5px; width: auto">
            <tr>
            <td colspan="2">
        <p class="review-content" style="margin-bottom: 15px; font-size: 16px; margin-top: 15px; width: 100%;">
        No reviews for ${coursewithteacher.courseName} taught by ${teacherName} so far.
        Write the first one <a href="../review/review.html?code=${coursewithteacher.id}" style="color:#69BDC8"><strong>here!</strong>
        </a>
        </p>
    </td>
</tr>
</table>`
            reviews.appendChild(reviewBox);
        } else {
            for (let i = 0; i < reviewList.length; i++) {
                //convert semester
                let semester = " Full year";
                if (reviewList[i].semester) {
                    semester = "  Semester 1";
                }
                if (reviewList[i].semester == false) {
                    semester = " Semester 2";
                }
                //convert insertDate
                let date = reviewList[i].insertDate.split("T")[0];
                //add reviewBox
                let reviewBox = document.createElement("div");
                reviewBox.className = "display-box";
                reviewBox.style.cssText = "padding: 15px;";
                reviewBox.innerHTML = `<table class="review-table">
    <tr>
        <td style="color: gray; padding-bottom: 2px;">Semester: ${reviewList[i].year} ~ ${(reviewList[i].year + 1) + semester}</td>
        <td style="color: gray; float: right;">${date}</td>
    </tr>
    <tr>
        <td colspan="2" style="color: gray;">Grade: ` + reviewList[i].grade + `</td>
    </tr>
    <tr>
        <td colspan="2">
            <p class="review-content">` + reviewList[i].text + `</p>
        </td>
    </tr>
    <tr>
</table>
<table class="review-table">
    <td colspan="2">
        <div class="feedback" style="margin-top:15px; font-size: 15px;">
            <div class="control">
                <a href="javascript:Like(` + reviewList[i].id + `,` + i + `)" id=` + i + `>🙂Like ` + reviewList[i].likes + `</a>
            </div>
            <div class="control" style="margin-left:auto; margin-right: 10px">
                <a href="">🖐Report</a>
            </div>
        </div>
    </td>
</tr>
</table>`
                reviews.appendChild(reviewBox);
            }
        }
        loadFooter();
    }
}

window.onload = function() {

    //init
    var query = getUrlQueryString(window.location.href);
    console.log(query);

    loadHeader();

    callInfo(query, loadData)
}

window.onresize = function() {
    location.reload();
}