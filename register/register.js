layui.use(['form', 'layer', 'jquery'], function() {

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
        layer = layui.layer,
        $ = layui.$

    $(document).keydown(function(e) {
        if (e.keyCode === 13) {
            $("#register").trigger("click");
            return false;
        }
    });

    form.verify({
        userName: [
            /^[\S]+$/,
            "用户名中不能含有空格"
        ],
        alphabat: [
            /[a-z]/i,
            "学生邮箱前缀不得含有特殊字符"
        ],
        password: [
            /^[\S]{10,}$/, '密码必须大于10位，且不能出现空格'
        ],
        confirmPass: function(value) {
            if ($('input[name=password]').val() !== value)
                return ('两次密码输入不一致！');
        }
    })

    form.on('submit(register)', function(formdata) {
        var index = layer.load({
            shade: [0.4, '#def'],
            icon: '&#xe63d'
        })
        $.ajax({
            type: "PUT",
            url: "https://vma-walk.azurewebsites.net/Auth/Registration",
            contentType: "application/json",
            data: JSON.stringify(formdata.field),
            success: function(data) {
                localStorage.setItem("token", data.token);
                alert("请查看学生邮箱并点击验证链接")
            },
            error: function(req) {

                var message = "";
                console.log(req)
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