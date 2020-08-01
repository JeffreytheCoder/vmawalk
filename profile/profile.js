var Like;

layui.use(["jquery", "layer", "laytpl"], function () {

    const laytpl = layui.laytpl,
        $ = layui.$,
        layer = layui.layer;

    var logined;

    /**
     * @type {{id:number,userId:number, courseId:number,teacherId:number,year:number,semester:boolean,
     * grade:string,score:string,text:string,likes:number,liked:boolean}[]}  
     */
    var courseWithTeacher;
    var teacherName;
    /**
     * @type {{id:number,userId:number, courseId:number,teacherId:number,year:number,semester:boolean,
     * grade:string,score:string,text:string,likes:number}[]} 评论类型
     */
    var reviewList;



    try {
        logined = token && JSON.parse(b64_to_utf8(token.split(".")[1])).exp > Date.now() / 1000
    } catch (error) {
        logined = false;
    }

    Like = async function (reviewId, reviewIndex) {

        var layer = layui.layer;
        var token = localStorage.getItem("token")

        if (!logined) {
            toLogin();
            return;
        }
        // post like number change to dataset
        var res = await fetch("https://vma-walk.azurewebsites.net/api/Review/Like?reviewId=" + reviewId, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        })
        // 400 代表已经点过赞
        if (res.status === 400) {
            layer.msg("You can only give one Like for each review");
        } else {
            // change like number on page
            var reviewLike = document.getElementById(reviewIndex);
            reviewLike.text = "🙂Like " + (reviewList[reviewIndex].likes + 1);
            reviewLike.style = "color: #1e8997; font-weight: bold"
        }
    }

    const callInfo = async (id) => {
        let courseLoading = $.get(
            "https://vma-walk.azurewebsites.net/api/Course/" + id,
        );

        let reviewLoading = $.get(
            "https://vma-walk.azurewebsites.net/api/Review", {
                id: id
            },
        );

        let userReviewLoading;

        if (logined)
            userReviewLoading = $.get({
                url: "https://vma-walk.azurewebsites.net/api/Review/GetUserLikes",
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                },
                /**
                 * @param {number[]} data
                 */
                success: function (data) {
                    console.log(data);
                },
                dataType: "json"
            })

        await loadInfo;


        courseWithTeacher = await courseLoading;
        let teacher = teachers.find(teacher => teacher.id == courseWithTeacher.teacherId);
        teacherName = [teacher.chineseName, teacher.englishName].join(" ").trim()
        reviewList = await reviewLoading;
        console.log(courseWithTeacher, reviewList)

        if (userReviewLoading) {
            /**@type {number[]}*/
            let userReviews = await userReviewLoading;
            reviewList.forEach(review => {
                if ($.inArray(review.id, userReviews)) {
                    review.liked = true;
                } else {
                    review.liked = false;
                }
            })
        }
    }

    function loadData() {
        let nameWithPicTpl = nameWithPic.innerHTML;
        var fontSize = 60;
        if (document.documentElement.clientWidth <= 700) {
            fontSize = 40;
        }

        laytpl(nameWithPicTpl).render({
            "teacherName": teacherName,
            "courseWithTeacher": courseWithTeacher,
            "ImageUrl": Imagelink[courseWithTeacher.teacherId],
            "fontSize": fontSize
        }, html => {
            $("#namewithpic").html(html);
        })

        //add header title
        document.title = teacherName + " - " + courseWithTeacher.courseName + " | Vmawalk";


        let ratingtpl = ratingsTpl.innerHTML;
        laytpl(ratingtpl).render({
            "courseWithTeacher": courseWithTeacher
        }, html => {
            $("#ratings").html(html);
        })

        laytpl(reviewsTpl.innerHTML).render({
            "reviewList": reviewList,
            "courseWithTeacher": courseWithTeacher,
            "teacherName": teacherName
        }, html => {
            $("#reviews").html(html);
        })

    }

    window.onload = async function () {
        var id = new URLSearchParams(location.search).get("query")
        $("#addReviewBtn").click(function () {
            location.href = "../review/review.html?code=" + id
        })
        loadHeader();
        await callInfo(id);
        loadData();
        loadFooter();
    }
})