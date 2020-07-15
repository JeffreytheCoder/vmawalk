layui.use["jquery"] {
    function getUserReviews() {
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
            function (data) {
                console.log(data)
            })
    }
}