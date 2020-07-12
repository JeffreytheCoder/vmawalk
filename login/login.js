function toHomePage() {
    window.location.href = "../index.html"
}


layui.use(['form', 'jquery', 'layer'], function() {

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
                sessionStorage.setItem("token", data.token);
                layer.msg("登陆成功")
                setTimeout(() => {
                    history.back(1);
                }, 1000);
            },
            error: function(req) {
                if (req.status == 400) {
                    layer.msg("您输入的用户名或密码错误");
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