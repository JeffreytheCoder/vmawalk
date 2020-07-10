function toHomePage() {
    window.location.href = "../index.html"
}

function keyLogin() {
    if (event.keyCode == 13) //回车键的键值为13
        layui.use(['form', 'jquery', 'layer'], function() {
        var form = layui.form,
            $ = layui.$,
            layer = layui.layer;

        form.on('submit(form)', function(formdata) {
            var index = layer.load({
                shade: [0.4, '#def'],
                icon: '&#xe63d'
            })
            $.ajax({
                type: "POST",
                url: "https://vmawalk.azurewebsites.net/Auth/Login",
                contentType: "application/json",
                data: JSON.stringify(formdata.field),
                success: function(data) {
                    sessionStorage.setItem("token", data.token);
                    layer.msg("登陆成功")
                    setTimeout(() => {
                        history.back(1);
                    }, 1000);

                },
                error: function(req) {
                    if (req.status == 400) {
                        layer.msg("您输入的用户名或密码错误")
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
}

layui.use(['form', 'jquery', 'layer'], function() {
    var form = layui.form,
        $ = layui.$,
        layer = layui.layer;

    form.on('submit(form)', function(formdata) {
        var index = layer.load({
            shade: [0.4, '#def'],
            icon: '&#xe63d'
        })
        $.ajax({
            type: "POST",
            url: "https://vmawalk.azurewebsites.net/Auth/Login",
            contentType: "application/json",
            data: JSON.stringify(formdata.field),
            success: function(data) {
                sessionStorage.setItem("token", data.token);
                layer.msg("登陆成功")
                setTimeout(() => {
                    history.back(1);
                }, 1000);

            },
            error: function(req) {
                if (req.status == 400) {
                    layer.msg("您输入的用户名或密码错误")
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