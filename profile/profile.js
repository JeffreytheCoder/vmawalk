var id; //把ID送过来

layui.use(["jquery", "layer"], function () {

    /**
     * @type JQueryStatic
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
         * }} info - 课程类型
         */
        function (info) {
            var averageScore = info.AverageScore.split("|").forEach(element => {
                element = parseFloat(element)
            }) // 这个是告诉你怎么转 Average Score
            console.log(info); // 这个是整个课程的信息，你读一下console就知道里面有什么了
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
        function (result) {
            // result 是一组Review
            console.log(result)

        }
    )
});