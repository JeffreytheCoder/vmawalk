window.onload = function() {
        var query = window.location.search.substring(1);
        console.log(query);
        var keyword = getUrlQueryString('q');
        console.log(keyword);
        var result = fuzzyQuery(keyword);
    },

    function getUrlQueryString(names, urls) {
        var query = window.location.search.substring(1);
        // 把参数按&拆分成数组
        var param_arr = query.split("&");
        for (var i = 0; i < param_arr.length; i++) {
            var pair = param_arr[i].split("=");
            if (pair[0] == name) {
                return pair[1];
            }
        }
        return (false);
    },

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