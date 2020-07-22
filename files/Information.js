/** @type {{
 * id:number,
 * chineseName:?string,
 * englishName:string,
 * averageScore:?number
 * }[]} */
var teachers = {},

    /** @type {{
     * id:number,
     * courseName:string,
     * courseCode:string,
     * teacherId:number
     * }[]} 
     */
    Courses = {},
    CoursesWithTeacher = {};

/**
 * @type {Promise}
 */
var loadInfo;

layui.use("jquery", async function () {
    /**
     * @type {JQueryStatic}
     */
    var $ = layui.$;

    loadInfo = $.when(

        $.getJSON("https://www.vmawalk.com/files/Teachers.json", function (result) {
            teachers = result;
        }), $.getJSON("https://www.vmawalk.com/files/Courses.json", function (result) {
            Courses = result
        }), $.getJSON("https://www.vmawalk.com/files/CoursesWithTeacher.json", function (result) {
            CoursesWithTeacher = result
        }));
})




/** @type {{
 * id:number,
 * courseName:string,
 * courseCode:string,
 * teacherId:number
 * }[]} */
var CoursesWithTeacher =

    function utf8_to_b64(str) {
        return window.btoa(unescape(encodeURIComponent(str)));
    }

function b64_to_utf8(str) {
    return decodeURIComponent(escape(window.atob(str)));
}