layui.use(['form', 'layer', 'jquery'], function() {
    var form = layui.form,
        layer = layui.layer,
        $ = layui.$

    form.verify({
        userName: [
            /^[\S]+$/
        ],
        password: [
            /^[\S]{10,}$/, '密码必须大于10位，且不能出现空格'
        ]
    })

    form.on('submit(register)', function(formdata) {
        var index = layer.load({
            shade: [0.4, '#def'],
            icon: '&#xe63d'
        })
        $.ajax({
            type: "POST",
            url: "https://vmawalk.azurewebsites.net/Auth/Registration",
            contentType: "application/json",
            data: JSON.stringify(formdata.field),
            success: function(data) {
                sessionStorage.setItem("token", data.token);
                alert("请查看学生邮箱并点击验证链接")
            },
            error: function(req) {

                var message = "";
                req.responseJSON.message.forEach(element => {
                    message += element.description + '</br>';
                });
                layer.alert(message, {
                    skin: 'layui-layer-molv',
                    anim: 5,
                    title: "请重试"
                })
            },
            complete: function() {
                layer.close(index)
            },
            dataType: "json"
        });
        return false;
    });
});