layui.use(['form', 'jquery', 'layer'], function() {

    var token = localStorage.getItem("token")
    if (token) {
        console.log("检测到token")
        try {
            var user = JSON.parse(b64_to_utf8(token.split(".")[1]))
            if (user.exp > Date.now() / 1000) {
                console.log("token未过期, 已登录")
                self.location = document.referrer;
            } else {
                console.log("token已过期, 请重新登录")
            }
        } catch (ess) {
            localStorage.removeItem("token")
        }
    }

    var form = layui.form,
        $ = layui.$,
        layer = layui.layer;

    $(document).keydown(function(e) {
        if (e.keyCode === 13) {

            $("#loginbtn").trigger("click");
            return false;
        }
    });

    form.on('submit(form)', function(formdata) {
        var index = layer.load({
            shade: [0.4, '#def'],
            icon: '&#xe63d'
        })
        $.ajax({
            type: "POST",
            url: "https://vma-walk.azurewebsites.net/Auth/Login",
            contentType: "application/json",
            data: JSON.stringify(formdata.field),
            success: function(data) {
                localStorage.setItem("token", data.token);
                layer.msg("登陆成功")
                setTimeout(() => {
                    if (document.referrer.endsWith("review.html"))
                        location.href = "../review/review.html";
                    else {
                        self.location = document.referrer;
                        // location.href = "javascript:history.back(-1)"
                    }
                }, 1000);
            },
            error: function(req) {
                if (req.status == 400) {
                    layer.msg("您输入的用户名或密码错误");
                    console.log(req)
                }
            },
            complete: function() {
                layer.close(index)
            },
            dataType: "json"
        });
        return false;
    });

});