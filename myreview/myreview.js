//global variable
var reviewObj;

function getUserReviews(callback) {
    /**
     * @type {JQueryStatic}
     */
    var $ = layui.$;

    $.get("http://vma-walk.azurewebsites.net/api/Reviews/GetUserReviews",
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
         * }[]} data - 课程类型
         */
        function(data) {
            reviewObj = data;
            console.log(data)
        })
}

function loadingChange() {
    if (document.readyState == "complete") {
        loadHeader();
        loadFooter();
    }
}

document.onreadystatechange = loadingChange;

function loadReview() {
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
                            <div class="review-title">233</font>
                            </div>
                            <div>
                                <font size="4">wang he</font>
                            </div>
                        </div>
                        <div class="date">
                            <span>2020</span>
                            <span>2020</span>
                            <span>2020</span>
                        </div>
                    </div>
                    <div class="rating-table">
                        <div class="review-title">Ratings</div>
                        <table width="auto">
                            <tr>
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
                            <a href="#">
                                <button class="add-review" style="margin-top: 0px; width: 60px; height: 25px; border-radius: 10px;">
                                <text class="add-review-text" style="font-size: 17px;">Edit</text>
                                </button>
                            </a>
                        </div>
                        <p>
                            Vmawalk is operated by VMA students. It takes its name from VMA Walk, the main campus thoroughfare VMA students use to walk to class each day. Vmawalk is run for students, by students, and features anonymous professor reviews and reviews of apartments
                            near VMA. Its goal is to supplement the VMA’s mission of creating a comprehensive record of life at VMA by allowing students to share reviews and advice about academics and housing.
                        </p>
                    </div>
                </td>
            </tr>
        </table>
    </div>`;
    reviewDiv.appendChild(review);
}


window.onload = function() {
    getUserReviews(function() {
        console.log(reviewObj);
    })
    reviewNum = 3;
    for (i = 0; i < reviewNum; i++) {
        loadReview();
    }
}