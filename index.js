function toSearchPage() {
    var query = document.getElementById("keyword")
        .value;
    // window.open("https://jeffreythecoder.github.io/vmawalk/search/search?"+)
    window.location.href =
        "https://jeffreythecoder.github.io/vmawalk/search/search?index=" +
        query;
}

teachers = [
    "王赫",
    "Wang He",
    "Maryann O'Brien",
    "咸海明",
    "Maggie Xian",
    "耿倩",
    "Melody Geng",
    "杨永乐",
    "Eric Yang",
    "伍仙洁",
    "Jenny Wu",
    "Sabrina Waterfield",
    "吴晓莉",
    "Shirley Wu",
    "杜浩",
    "Howard Du",
    "郑伟伟",
    "Simon Zheng",
    "曹霞",
    "Cao Xia",
    "秦星",
    "Ryan Qin",
    "郭润尘",
    "Rayson Guo",
    "谢瑾嵘",
    "Jean Xie",
    "陈宇婷",
    "Christy Chen",
    "陈燕静",
    "Eva Chen",
    "谢燕萍",
    "Shelly Xie",
    "唐芯雅",
    "Tang Xinya",
    "王子豪",
    "Joel Wang",
    "鲁燕",
    "Lu Yan",
    "李桂敏",
    "Lisa Li",
    "凌利红",
    "Ling Lihong",
    "阮坤连",
    "Ruan Kunlian",
    "朱晓军",
    "Zhu Xiaojun"
];

layui.use(['jquery'], function () {
    var $ = layui.$;
    $('#keyword').autocomplete({
        // serviceUrl:'https://jeffreythecoder.github.io/vmawalk/files/Teachers.json'
        lookup: teachers,
        lookupFilter: function (
            suggestion, query,
            queryLowerCase) {
            if (suggestion.value.toLowerCase().indexOf(queryLowerCase) != -1 ||
                chineseToPinYin(suggestion.value).toLowerCase().indexOf(queryLowerCase) != -1)
                return true;
        }
    })
});