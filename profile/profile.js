function getUrlQueryString() {
    let equal = window.location.href.indexOf("=")
    let getQuery = window.location.href.substring(equal + 1);
    return getQuery;
};

//global variable
var teacherObj;
var courseList = null;

function callData(id, callback) {
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
                var teacherName = teachers.find(teacher => teacher.id == info.TeacherId);
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
                console.log(result)
            }
        )
    })
}

window.onload = function() {

    //init
    var query = getUrlQueryString(window.location.href);
    console.log(query);

    callData(query, function() {
        console.log("ok")
    })

    //add namewithpic
    namewithpic = document.getElementById("namewithpic");
    var namewithpicElement = document.createElement("div");
    namewithpicElement.innerHTML = `<table height="120px">
    <tr height="80px">
        <td rowspan="2" width="130px" height="100%">
            <a href="#" style="text-decoration: none; color: white;">
                <div class="icon-round">MATH502</div>
            </a>
        </td>
        <td height="100%">
            <p style="font-size:30px"><strong>AP Calculus BC</strong></p>
        </td>
    </tr>
    <tr height="40px">
        <td style="display: flex; align-items: center;">
            <div class="teacher-icon" style="background-image: url(https://pic.downk.cc/item/5f084b5c14195aa594dc0921.jpg);">
            </div>
            <font size="4">Wang He</font>
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
                        <font color="#69BDC8"><b>4.3</b></font>
                    </div>
                    <div style="width: 100%; height: 20px; background-color: gray; border-radius: 5px;">
                        <div style="width: 70%; height: 20px; background-color: #69BDC8; border-radius: 5px;">
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
                        <font color="#69BDC8"><b>4.3</b></font>
                    </div>
                    <div style="width: 100%; height: 20px; background-color: gray; border-radius: 5px;">
                        <div style="width: 70%; height: 20px; background-color: #69BDC8; border-radius: 5px;">
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
                        <font color="#69BDC8"><b>4.3</b></font>
                    </div>
                    <div style="width: 100%; height: 20px; background-color: gray; border-radius: 5px;">
                        <div style="width: 70%; height: 20px; background-color: #69BDC8; border-radius: 5px;">
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
                        <font color="#69BDC8"><b>4.3</b></font>
                    </div>
                    <div style="width: 100%; height: 20px; background-color: gray; border-radius: 5px;">
                        <div style="width: 70%; height: 20px; background-color: #69BDC8; border-radius: 5px;">
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
                        <font color="#69BDC8"><b>4.3</b></font>
                    </div>
                    <div style="width: 100%; height: 20px; background-color: gray; border-radius: 5px;">
                        <div style="width: 70%; height: 20px; background-color: #69BDC8; border-radius: 5px;">
                        </div>
                    </div>
                </td>
                <td align=" center" width="20%">Helpful</td>
            </tr>
        </table>`
    ratings.appendChild(ratingBox);

    //add reviews
    reviews = document.getElementById("reviews");
    var reviewBox = document.createElement("div");
    reviewBox.className = "display-box";
    reviewBox.innerHTML = `<table class="review-table">
    <tr>
        <td style="color: gray; padding-bottom: 2px;">Semester: N/A</td>
        <td style="color: gray; float: right;">Submitted June 8, 2011</td>
    </tr>
    <tr>
        <td colspan="2" style="color: gray;">Grade: N/A</td>
    </tr>
    <tr>
        <td colspan="2">
            <p class="review-content">
                Took biochem 153C with Prof Clarke but haven't seen my final grade yet. 1. Do all of the old final exams you can find on VOH. they go back almost ten years and she repeats questions sometimes. 2. go to class. Podcasts don't help when you're trying to
                learn mechanisms! You need to be able to see what she writes. 3. There are a ton of mechanisms but most of them follow some really simple patterns. It always helps to think of biochem in terms of pathways and patterns!
                use analogies. Have fun! She's a really nice lady and she is really helpful in providing as much material as you need to practice.
            </p>
        </td>
    </tr>
    <tr>
        <td colspan="2">
            <div class="feedback" style="margin-top:15px; font-size: 15px;">
                <div class="control">
                    <a href="#">🙂Like </a>0
                </div>
                <div class="control">
                    <a href="#">🙃Dislike </a>0
                </div>
                <div class="control" style="margin-left:auto;">
                    <a href=" #">🖐Report</a>
                </div>
            </div>
        </td>
    </tr>
</table>`
    reviews.appendChild(reviewBox);
}