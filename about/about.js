function loadingChange() {
    if (document.readyState == "complete") {
        loadHeader();
        loadFooter();
        layui.use("jquery", function () {
            var $ = layui.$;
            document.documentElement.clientWidth > 750 ? $(".mobile").css("display", "none") : $(".standard").css("display", "none");

            window.onresize() = function () {
                if (document.documentElement.clientWidth > 750) {
                    $(".standard").css("display", "block")
                    $(".mobile").css("display", "none")
                } else {
                    $(".mobile").css("display", "block")
                    $(".standard").css("display", "none")
                }
            }
        })
    }
}

document.onreadystatechange = loadingChange;