var id; //把ID送过来

layui.use(["jquery", "layer"], function () {
    /**
     * @type JQueryStatic
     */

    var $ = layui.$;

    $.get(
        "https://vmawalk.azurewebsites.net/api/Course/" + id,
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
        "https://vmawalk.azurewebsites.net/api/Review", {
            id: id
        },
        function (result) {
            // result 是一组Review
            console.log(result)

        }
    )
});