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
                var teacher = teachers.find(teacher => teacher.id == info.teacherId);
                teacherName = [teacher.chineseName, teacher.englishName].join(" ").trim()
                callback();
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
             * text:string
             * }[]} result - 课程类型
             */
            function(result) {
                // result 是一组Review
                reviewList = result;
                console.log(result)
                callback();
            }
        )
    })
}

function loadData() {
    count++;
    console.log(count);
    if (count == 2) {
        //prepare scoreList and widthList of rating cells
        var scoreList = ["N/A", "N/A", "N/A", "N/A", "N/A"];
        var widthList = ["0%", "0%", "0%", "0%", "0%"];
        if (coursewithteacher.averageScore != null) {
            scoreList = coursewithteacher.averageScore.split("|")
            for (i = 0; i < scoreList.length; i++) {
                widthList[i] = "" + ((scoreList[i] / 5.0).toFixed(2) * 100).toFixed(0) + "%"
            }
        }
        //prepare teacher image
        var imageURL = Imagelink[coursewithteacher.teacherId];

        //add namewithpic
        namewithpic = document.getElementById("namewithpic");
        var namewithpicElement = document.createElement("div");
        namewithpicElement.innerHTML = `<table height="120px">
<tr height="80px">
    <td rowspan="2" width="130px" height="100%">
        <a href="#" style="font-size: 18px; text-decoration: none; color: white;">
            <div class="icon-round">` + coursewithteacher.courseCode + `</div>
        </a>
    </td>
    <td height="100%">
        <p style="font-size:60px"><strong>` + coursewithteacher.courseName + `</strong></p>
    </td>
</tr>
<tr height="40px">





    <td style="display: flex; align-items: center;">
        <div class="teacher-icon" style="background-image: url(` + imageURL + `);">
        </div>
        <font size="4">` + teacherName + `</font>
    </td>
</tr>
</table>`
        namewithpic.appendChild(namewithpicElement);

        //add header title
        document.title = teacherName + " - " + coursewithteacher.courseName + " | Vmawalk";

        //add ratings
        ratings = document.getElementById("ratings");
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
            <td align="center" width="20%">Not Clear</td>
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
            <td align="center" width="20%">Not Helpful</td>
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
        reviews = document.getElementById("reviews");
        if (reviewList.length == 0) {
            //add reviewBox
            var reviewBox = document.createElement("div");
            reviewBox.className = "display-box";
            reviewBox.innerHTML = `<table class="review-table" style="margin: 20px; margin-bottom: 5px">
            <tr>
            <td colspan="2">
        <p class="review-content" style="margin-bottom: 20px; font-size: 16px">No reviews for ` + coursewithteacher.courseName + ` taught by ` + teacherName + ` so far.
        Write the first one <a href="../review/review.html" style="color:#69BDC8"><strong>here!</strong></a></p>
    </td>
</tr>
</table>`
            reviews.appendChild(reviewBox);
        } else {
            for (i = 0; i < reviewList.length; i++) {
                //convert semester
                var semester = " Full year";
                if (reviewList[i].semester) {
                    semester = "  Semester 1";
                }
                if (reviewList[i].semester == false) {
                    semester = " Semester 2";
                }
                //add reviewBox

                if (reviewList.length == 0) {
                    var reviewBox = document.createElement("div");
                    reviewBox.className = "display-box";
                    reviewBox.innerHTML = `<table class="review-table" style="margin-bottom: 5px">
                <tr>
                <td colspan="2">
            <p class="review-content" style="margin-bottom: 20px; font-size: 16px">No reviews for ` + coursewithteacher.courseName + ` taught by ` + teacherName + ` so far.
            Write the first one <a href="../review/review.html" style="color:#69BDC8"><strong>here!</strong></a></p>
        </td>
    </tr>
    </table>`
                    reviews.appendChild(reviewBox);
                } else {
                    for (i = 0; i < reviewList.length; i++) {
                        //convert semester
                        var semester = " Full year";
                        if (reviewList[i].semester) {
                            semester = "  Semester 1";
                        }
                        if (reviewList[i].semester == false) {
                            semester = " Semester 2";
                        }
                        //add reviewBox
                        var reviewBox = document.createElement("div");
                        reviewBox.className = "display-box";
                        reviewBox.style.cssText = "padding: 10px;";
                        reviewBox.innerHTML = `<table class="review-table" style="margin: 20px; margin-bottom: 5px">
    <tr>
        <td style="color: gray; padding-bottom: 2px;">Semester: ` + reviewList[i].year + `~` + (reviewList[i].year + 1) + semester + `</td>
        <td style="color: gray; float: right; margin-right: 40px">Submitted June 8, 2011</td>
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
                <a href="#">🙂Like </a>0
            </div>
            <div class="control">
                <a href="#">🙃Dislike </a>0
            </div>
            <div class="control" style="margin-left:auto; margin-right: 10px">
                <a href=" #">🖐Report</a>
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
    }
}

window.onload = function() {

    //init
    var query = getUrlQueryString(window.location.href);
    console.log(query);

    loadHeader();

    callInfo(query, loadData)
}