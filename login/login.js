layui.use(['form', 'jquery', 'layer'], function () {

    var form = layui.form,
        $ = layui.$,
        layer = layui.layer;

    $(document).keydown(function (e) {
        if (e.keyCode === 13) {

            $("#loginbtn").trigger("click");
            return false;
        }
    });

    form.on('submit(form)', function (formdata) {
        var index = layer.load({
            shade: [0.4, '#def'],
            icon: '&#xe63d'
        })
        $.ajax({
            type: "POST",
            url: "https://vma-walk.azurewebsites.net/Auth/Login",
            contentType: "application/json",
            data: JSON.stringify(formdata.field),
            success: function (data) {
                localStorage.setItem("token", data.token);
                layer.msg("登陆成功")
                setTimeout(() => {
                    if (document.referrer.endsWith("review.html"))
                        location.href = "../review/review.html";
                    else if (document.referrer.endsWith("register.html") || document.referrer.endsWith("forget.html")) {
                        self.location.href = "../index.html"
                    } else {
                        
                        self.location.href = document.referrer;
                        // location.href = "javascript:history.back(-1)"
                    }
                }, 1000);
            },
            error: function (req) {
                if (req.status == 400) {
                    layer.msg("您输入的用户名或密码错误");
                    console.log(req)
                }
            },
            complete: function () {
                layer.close(index)
            },
            dataType: "json"
        });
        return false;
    });

});

function toPreviousPage() {
    var a = document.referrer;
    var b = a.split("/");
    var c = b.slice(b.length - 1, b.length).toString(String).split(".");
    var previousPage = c.slice(0, 1);
    if (previousPage[0] === "myreview" || previousPage[0] === "review") {
        console.log("对了");
        history.go(-2);
    } else {
        console.log(previousPage[0]);
        self.location = document.referrer;
    }
}