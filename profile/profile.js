function getUrlQueryString() {
    let equal = window.location.href.indexOf("=")
    let getQuery = window.location.href.substring(equal + 1);
    return getQuery;
};

//global variable
var count = 0;
var coursewithteacher;
var teacherName = "unknown";
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
             * Id:number,
             * CourseName:string,
             * TeacherId:number,
             * AverageScore:number
             * }} info - 课程属性
             */
            function(info) {
                if (info.AverageScore != null)
                    var averageScore = info.AverageScore.split("|").forEach(element => {
                            element = parseFloat(element)
                        }) // 这个是告诉你怎么转 Average Score
                console.log(info); // 这个是整个课程的信息，你读一下console就知道里面有什么了
                coursewithteacher = info;
                //var teacher = teachers.find(teacher => teacher.id == info.TeacherId);
                //teacherName = [teacher.chineseName, teacher.englishName].join(" ").trim()
                callback();
            }
        )

        $.get(
            "https://vma-walk.azurewebsites.net/api/Review", {
                id: id
            },
            /**
             * @param {{
             * Id:number,
             * UserId:number,
             * CourseId:number,
             * TeacherId:number,
             * Year:number,
             * Semester:boolean,
             * Grade:string,
             * Score:string,
             * Text:string
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

window.onload = function() {

    //init
    var query = 254 //getUrlQueryString(window.location.href);
    console.log(query);

    callInfo(query, function() {
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

            //add namewithpic
            namewithpic = document.getElementById("namewithpic");
            var namewithpicElement = document.createElement("div");
            namewithpicElement.innerHTML = `<table height="120px">
    <tr height="80px">
        <td rowspan="2" width="130px" height="100%">
            <a href="#" style="text-decoration: none; color: white;">
                <div class="icon-round">` + coursewithteacher.courseCode + `</div>
            </a>
        </td>
        <td height="100%">
            <p style="font-size:30px"><strong>` + coursewithteacher.courseName + `</strong></p>
        </td>
    </tr>
    <tr height="40px">
        <td style="display: flex; align-items: center;">
            <div class="teacher-icon" style="background-image: url(https://pic.downk.cc/item/5f084b5c14195aa594dc0921.jpg);">
            </div>
            <font size="4">` + teacherName + `</font>
        </td>
    </tr>
</table>`
            namewithpic.appendChild(namewithpicElement);

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
                    <div style="width: 100%; height: 20px; background-color: gray; border-radius: 5px;">
                        <div style="width: ` + widthList[0] + `; height: 20px; background-color: #69BDC8; border-radius: 5px;">
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
                    <div style="width: 100%; height: 20px; background-color: gray; border-radius: 5px;">
                        <div style="width: ` + widthList[1] + `; height: 20px; background-color: #69BDC8; border-radius: 5px;">
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
                    <div style="width: 100%; height: 20px; background-color: gray; border-radius: 5px;">
                        <div style="width: ` + widthList[2] + `; height: 20px; background-color: #69BDC8; border-radius: 5px;">
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
                    <div style="width: 100%; height: 20px; background-color: gray; border-radius: 5px;">
                        <div style="width: ` + widthList[3] + `; height: 20px; background-color: #69BDC8; border-radius: 5px;">
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
                    <div style="width: 100%; height: 20px; background-color: gray; border-radius: 5px;">
                        <div style="width: ` + widthList[4] + `; height: 20px; background-color: #69BDC8; border-radius: 5px;">
                        </div>
                    </div>
                </td>
                <td align=" center" width="20%">Helpful</td>
            </tr>
        </table>`
            ratings.appendChild(ratingBox);

            //add reviews
            reviews = document.getElementById("reviews");
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
    })
}