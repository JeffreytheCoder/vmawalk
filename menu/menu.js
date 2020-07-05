var query = getUrlQueryString(decodeURI(window.location.href));
console.log(query);
id = query.substring(2)

function getUrlQueryString() {
    var equal = window.location.href.indexOf("=")
    var query = window.location.href.substring(equal + 1);
    return query;
};

if (query[0] == "1") {
    console.log("it's teacher")
}