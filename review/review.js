/* var selected = request.getParameter("department")

function show(value) {
    var x = document.getElementById("english");
    if (selected == "english") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
} */

$(document).ready(function() {
    $("#department").change(function() {
        var selected = request.getParameter("department")
        var x = document.getElementById("english");
        if (selected == "english") {
            x.style.display = "block";
        } else {
            x.style.display = "none";
        }
    });
});

function csvToObject(csvString) {
    var csvarry = csvString.split("\r\n");
    var datas = [];
    var headers = csvarry[0].split(",");
    for (var i = 1; i < csvarry.length; i++) {
        var data = {};
        var temp = csvarry[i].split(",");
        for (var j = 0; j < temp.length; j++) {
            data[headers[j]] = temp[j];
        }
        datas.push(data);
    }
    return datas;
}

var world_language = ['world_language', 'ENG209 ELL English Language Development', 'ENG211 Communications: Public Speaking & Debate'];
var departments = [world_language];

layui.use(['layer', 'jquery', 'form'], function() {
    var layer = layui.layer,
        $ = layui.jquery,
        form = layui.form;

    form.on('select(department)', function(data) {

        Papa.parse('../files/Course Catalog.csv', {
            download: true,
            complete: function(results) {
                var data = results.data,
                    html;
                console.log(data)
                    /* for (var i = 1, _l = data.length - 1; i < _l; i++) {
                        var item = data[i];
                        html += '<tr><td>' + item[0].substring(1) + '</td><td>' + item[1].substring(1) + '</td><td>' + item[2].substring(1) + '</td><td>' + item[3].substring(1) + '</td></tr>';
                    }
                    $('#table tbody').append(html);*/
            }
        });
        layui.form.render("select");

        /* var file = $.get("../files/Course Catalog.csv");

        var reader = new FileReader();
        reader.readAsText(file);
        reader.onload = function() {
            var data = csvToObject(this.result);
            console.log(data); //data为csv转换后的对象

            var datas = $.csv.toArray(file);
            console.log(datas) */

        /* var selected = data.value;
        for (var i = 0; i < departments.length; i++) {
            console.log(departments[i][0])
            if (departments[i][0] == selected) {
                for (var j = 1; j < departments[i].length; j++) {
                    console.log(departments[i][j])
                    console.log(departments[i][j].split(" ")[0])
                    $("#course").append(new Option(departments[i][j], departments[i][j].split(" ")[0]));
                    // new Option(text, value)
                }
            }
        }*/
    })
})

layui.use(['form'], function() {
    var form = layui.form
    form.on('submit(submit)', function(data) {
        layer.msg(JSON.stringify(data.field));
        //JSON.stringify(data.field)   这是表单中所有的数据
        var articleFrom = data.field.articleFrom;
        var articleSummary = data.field.articleSummary;
        console.log(data);
        return false;
    });
});


/*layui.use(['layer', 'jquery', 'form'], function() {
            var layer = layui.layer,
                $ = layui.jquery,
                form = layui.form;

        form.on('select(department)', function(data) {
        var e = document.getElementById("department");
        var selected = data.value;
        var unknown = document.getElementById("unknown");
        var world_language = document.getElementById("world language");
        var science = document.getElementById("science");
        var math = document.getElementById("math");
        var social_science = document.getElementById("social science");
        var chinese = document.getElementById("chinese");
        var sports = document.getElementById("sports");
        var visual_arts = document.getElementById("visual arts");
        var performance_arts = document.getElementById("performance arts");
        var vmaa = document.getElementById("vmaa");
        unknown.style.display = "none";
        if (selected == "world language") {
            world_language.style.display = "block";
            science.style.display = "none";
            math.style.display = "none";
            social_science.style.display = "none";
            chinese.style.display = "none";
            sports.style.display = "none";
            visual_arts.style.display = "none";
            performance_arts.style.display = "none";
            vmaa.style.display = "none";
        }
        if (selected == "science") {
            science.style.display = "block";
            world_language.style.display = "none";
            math.style.display = "none";
            social_science.style.display = "none";
            chinese.style.display = "none";
            sports.style.display = "none";
            visual_arts.style.display = "none";
            performance_arts.style.display = "none";
            vmaa.style.display = "none";
        }
        if (selected == "math") {
            math.style.display = "block";
            world_language.style.display = "none";
            science.style.display = "none";
            social_science.style.display = "none";
            chinese.style.display = "none";
            sports.style.display = "none";
            visual_arts.style.display = "none";
            performance_arts.style.display = "none";
            vmaa.style.display = "none";
        }
        if (selected == "social science") {
            social_science.style.display = "block";
            world_language.style.display = "none";
            science.style.display = "none";
            math.style.display = "none";
            chinese.style.display = "none";
            sports.style.display = "none";
            visual_arts.style.display = "none";
            performance_arts.style.display = "none";
            vmaa.style.display = "none";
        }
        if (selected == "chinese") {
            chinese.style.display = "block";
            world_language.style.display = "none";
            science.style.display = "none";
            math.style.display = "none";
            chinese.style.display = "none";
            sports.style.display = "none";
            visual_arts.style.display = "none";
            performance_arts.style.display = "none";
            vmaa.style.display = "none";
        }
        if (selected == "sports") {
            sports.style.display = "block";
            world_language.style.display = "none";
            science.style.display = "none";
            math.style.display = "none";
            social_science.style.display = "none";
            chinese.style.display = "none";
            visual_arts.style.display = "none";
            performance_arts.style.display = "none";
            vmaa.style.display = "none";
        }
        if (selected == "visual arts") {
            visual_arts.style.display = "block";
            world_language.style.display = "none";
            science.style.display = "none";
            math.style.display = "none";
            social_science.style.display = "none";
            chinese.style.display = "none";
            sports.style.display = "none";
            performance_arts.style.display = "none";
            vmaa.style.display = "none";
        }
        if (selected == "performance arts") {
            performance_arts.style.display = "block";
            world_language.style.display = "none";
            science.style.display = "none";
            math.style.display = "none";
            social_science.style.display = "none";
            chinese.style.display = "none";
            sports.style.display = "none";
            visual_arts.style.display = "none";
            vmaa.style.display = "none";
        }
        if (selected == "vmaa") {
            vmaa.style.display = "block";
            world_language.style.display = "none";
            science.style.display = "none";
            math.style.display = "none";
            social_science.style.display = "none";
            chinese.style.display = "none";
            sports.style.display = "none";
            visual_arts.style.display = "none";
            performance_arts.style.display = "none";
        }
    }); 
}); */

/* $(document).ready(function() {
    $("#department").change(function() {
}); */