layui.use(['form', 'jquery', 'layer'], function () {
    var form = layui.form,
        $ = layui.$,
        layer = layui.layer;

    form.on('submit(form)', function (formdata) {
        var index = layer.load({
            shade: [0.4, '#def'],
            icon: '&#xe63d'
        })
        $.ajax({
            type: "POST",
            url: "http://vmawalk.azurewebsites.net/Auth/Login",
            contentType: "application/json",
            data: JSON.stringify(formdata.field),
            success: function (data) {
                sessionStorage.setItem("token", data.token);
            },
            error: function (req) {
                if (req.status == 400) {
                    layer.msg("您输入的用户名或密码错误")
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