window.onload = function() {
    var keyword = getUrlQueryString();
    console.log("haha");
    alert("what");
};

function getUrlQueryString() {
    var equal = window.location.href.indexOf("=")
    var query = window.location.href.substring(equal);
    console.log(query)
    return query;
};

function fuzzyQuery(keyword) {
    var list = teachers;
    var result = []
    var success = false;
    for (var i = 0; i < list.length; i++) {
        // console.log(typeof(list[i]))
        // console.log(typeof(list[i].Chinese))
        if (list[i].Chinese == null) {
            continue;
        }
        if (list[i].Chinese.indexOf(keyword) >= 0) {
            result.push(list[i].Chinese)
            var success = true;
        }
        if (list[i].English.indexOf(keyword) >= 0) {
            result.push(list[i].English)
            var success = true;
        }
    }
    if (success == false) {
        console.log("not found")
    }
    return result;
}