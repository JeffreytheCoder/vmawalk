if (!location.pathname.endsWith("index.html"))
    document.write(`
    <script src="../lib/pinyin.js"></script>
    <script src="../lib/initials.js"></script>
    <script src="../lib/fuzzysort.js"></script>
`)

function toLogin() {
    document.getElementById("loginLayer").style.display = "block";
    document.getElementById("registerLayer").style.display = "none";
    document.getElementById("forgetLayer").style.display = "none";
}

function toForget() {
    document.getElementById("loginLayer").style.display = "none";
    document.getElementById("registerLayer").style.display = "none";
    document.getElementById("forgetLayer").style.display = "block";
}

function toRegister() {
    document.getElementById("loginLayer").style.display = "none";
    document.getElementById("registerLayer").style.display = "block";
    document.getElementById("forgetLayer").style.display = "none";
}

function goBack() {
    document.getElementById("loginLayer").style.display = "none";
    document.getElementById("registerLayer").style.display = "none";
    document.getElementById("forgetLayer").style.display = "none";
}

async function action() {
    var loginBtn = document.querySelectorAll("#loginBtn");
    var loginText = "Login";
    var loginLink = "../login/login.html";
    var token = localStorage.getItem("token");
    var layerDiv = document.getElementById("loginLayer");
    if (token) {
        console.log("检测到token")
        try {
            var user = JSON.parse(b64_to_utf8(token.split(".")[1]))
            if (user.exp > Date.now() / 1000) {
                console.log("token未过期, 已登录")
                loginText = "My Review";
                loginLink = "../myreview/myreview.html";
            } else {
                console.log("token已过期, 请重新登录")
            }
        } catch (ess) {
            localStorage.removeItem("token")
        }
    } else {
        console.log("未检测到token, 请登录")
    }

    loginBtn.forEach(x => x.onclick = function () {
        if (loginText == "Login") {
            layerDiv.style.display = "block"
            layerDiv.style.transition = "2s";
        } else {
            layerDiv.style.display = "none";
            window.location.href = loginLink;
        }
    })
}


layui.use(["layer", "jquery", "form"], function () {
    const $ = layui.jquery,
        form = layui.form,
        layer = layui.layer;

    window.loadLayer = async () => {
        let $ = layui.$;
        $(`<layer>
            <div id="loginLayer" style="display: none; background-color: rgba(0, 0, 0, 0.5); position: fixed; z-index:1; width: 100%; height: 100%;" >
                <form class="layui-form" action="">
                    <div class="container" id="Login" style="box-shadow: none;">
                        <a class="close" href="javascript:" onclick="goBack()" style="text-decoration: none;">✖️</a>
                        <table class="input-table">
                            <tr>
                                <td>
                                    <label class="layui-form-label">Email</label>
                                </td>
                                <td>
                                    <input type="text" name="Email" lay-verify="Email|required" placeholder="Email Address" autocomplete="off" class="layui-input">
                                </td>
                                <td>
                                    <label class="email">&nbsp@stu.vma.edu.cn</label>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label class="layui-form-label">Password</label>
                                </td>
                                <td colspan="2 ">
                                    <input type="password" name="password" lay-verify="pass|required" placeholder="Password" autocomplete="off" class="layui-input">
                                </td>
                            </tr>
                            <tr>
                                <td colspan="3">
                                    <button type="submit" id="loginSubmit" class="layui-btn" lay-submit lay-filter="loginSubmit">Login</button>
                                </td>
                            </tr>
                        </table>
                        <div style="width: 100%; display: flex; justify-content: space-evenly;">
                            <a href="javascript:" onclick="toForget()" class="font-set">Forget Passward</a>
                            <a href="javascript:" onclick="toRegister()" class="font-set">Register Now</a>
                        </div>
                    </div>
                </form>
            </div>
            <div id="registerLayer" style="display: none; background-color: rgba(0, 0, 0, 0.5); position: fixed; z-index:1; width: 100%; height: 100%;" >
                <form class="layui-form" action="" method="post">
                    <div class="container" style="box-shadow: none;">
                        <a class="close" href="javascript:" onclick="goBack()" style="text-decoration: none;">✖️</a>
                        <table class="input-table">
                            <tr>
                                <td>
                                    <label class="layui-form-label">User Name</label>
                                </td>
                                <td colspan="2" style="position: relative;">
                                    <!-- <div class="tips">233</div> -->
                                    <input type="text" name="userName" required lay-verify="userName" placeholder="User Name" autocomplete="off" class="layui-input">
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label class="layui-form-label">Email</label>
                                </td>
                                <td style="position: relative;">
                                    <!-- <div class="tips">233</div> -->
                                    <input type="text" name="email" required lay-verify="alphabet" placeholder="Email Address" autocomplete="off" class="layui-input">
                                </td>
                                <td>
                                    <label class="email">&nbsp@stu.vma.edu.cn</label>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label class="layui-form-label">Password</label>
                                </td>
                                <td colspan="2" style="position: relative;">
                                    <!-- <div class="tips">233</div> -->
                                    <input type="password" name="password" required lay-verify="password" placeholder="Password" autocomplete="off" class="layui-input">
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label class="layui-form-label">Comfirm Password</label>
                                </td>
                                <td colspan="2" style="position: relative;">
                                    <!-- <div class="tips">233</div> -->
                                    <input type="password" name="confirm" required lay-verify="required|confirmPass" placeholder="Password" autocomplete="off" class="layui-input">
                                </td>
                            </tr>
                            <tr>
                                <td colspan="3">
                                    <button type="submit" id="registerSubmit" class="layui-btn" lay-submit lay-filter="registerSubmit">Register</button>
                                </td>
                            </tr>
                        </table>
                        <a href="javascript:" onclick="toLogin()" class="font-set">Login</a>
                    </div>
                </form>
            </div>
            <div id="forgetLayer" style="display: none; background-color: rgba(0, 0, 0, 0.5); position: fixed; z-index:1; width: 100%; height: 100%;" >
                <form class="layui-form" action="" method="post">
                    <div class="container" style="box-shadow: none;">
                        <a class="close" href="javascript:" onclick="goBack()" style="text-decoration: none;">✖️</a>
                        <table class="input-table">
                            <tr>
                                <td>
                                    <label class="layui-form-label">Email</label>
                                </td>
                                <td>
                                    <input type=" text " name="Email" required lay-verify="required " placeholder="Email Address" autocomplete="off " class="layui-input ">
                                </td>
                                <td>
                                    <label class="email">&nbsp@stu.vma.edu.cn</label>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label class="layui-form-label">New Password</label>
                                </td>
                                <td colspan="2 ">
                                    <input id="password" type="password" name="password" required lay-verify="required" placeholder="New Password" autocomplete="off" class="layui-input">
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label class="layui-form-label ">Comfirm Password</label>
                                </td>
                                <td colspan="2 ">
                                    <input id="confirm" type="password" required lay-verify="required|confirmPass" placeholder="New Password" autocomplete="off" class="layui-input">
                                </td>
                            </tr>
                            <tr>
                                <td colspan="3">
                                    <button class="layui-btn" id="forgetSubmit" lay-submit lay-filter="forgetSubmit">Change Password</button>
                                </td>
                            </tr>

                        </table>
                        <a href="javascript:" onclick="toLogin()" class="font-set ">Login</a>
                    </div>
                </form>
            </div>
        </layer>`).insertBefore(
            "body"
        )

        $(document).keydown(function (e) {
            if (e.keyCode === 13) {
                if ($("#loginLayer").css("display") != "none")
                    $("#loginSubmit").trigger("click");
                else if ($("#registerLayer").css("display") != "none")
                    $("#registerSubmit").trigger("click");
                else if ($("#forgetLayer").css("display") != "none")
                    $("#forgetSubmit").trigger("click");
                else
                    $("#selectSubmit").trigger("click")
                return false;
            }
        })

        let authSubmit = async (formData, action) => {
            var index = layer.load({
                shade: [0.4, '#def'],
                icon: '&#xe63d'
            })
            let path;
            let method = "POST";

            switch (action) {
            case 1:
                path = "Login"
                break;
            case 2:
                path = "Registration"
                method = "PUT"
                break;
            case 3:
                path = "ResetPassword"
                method = "PUT"
                break;
            }
            let request = await fetch(`https://vma-walk.azurewebsites.net/Auth/${path}`, {
                method: method,
                body: JSON.stringify(formData.field),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            layer.close(index)

            if (request.status == 200) {
                switch (action) {
                case 1:
                    let result = await request.json();
                    localStorage.setItem("token", result.token);
                    localStorage.setItem("userName", result.userName);
                    layer.msg("登陆成功");
                    if (!location.pathname.endsWith("review.html"))
                        setTimeout(() => {
                            location.reload();
                        }, 1000);
                    else {
                        goBack();
                    }
                    break;
                case 2:
                    layer.alert("注册成功，请查看学生邮箱并点击验证链接")
                    break;
                case 3:
                    layer.alert("请查看学生邮箱并点击验证链接重置密码")
                    break;
                }
            } else {
                switch (action) {
                case 1:
                    var result = await request.json();
                    layer.alert(result.message)
                    break;
                case 2:
                case 3:
                    var result = await request.json();
                    layer.alert(result.message.map(x => x.description).join("</br>"), {
                        skin: "layui-layer-molv",
                        anim: 5,
                        title: "请重试"
                    })
                }
            }
        }

        form.on("submit(loginSubmit)", function (formData) {
            authSubmit(formData, 1);
            return false;
        });
        form.on("submit(registerSubmit)", function (formData) {
            authSubmit(formData, 2);
            return false;
        });
        form.on("submit(forgetSubmit)", function (formData) {
            authSubmit(formData, 3);
            return false;
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
            confirmPass: function (value, item) {
                if (item.form.elements.password.value !== value)
                    return ('两次密码输入不一致！');
            }
        })

        if ($(window).width() < 750) {
            $(".container").css({ width: "auto", margin: "auto 10px" })
        }
    }



    window.loadHeader = async () => {
        // Judge if login or myreview
        var loginText = "Login";
        var loginLink = "../login/login.html";
        var token = localStorage.getItem("token")
        if (token) {
            console.log("检测到token")
            try {
                var user = JSON.parse(b64_to_utf8(token.split(".")[1]))
                if (user.exp > Date.now() / 1000) {
                    console.log("token未过期, 已登录")
                    loginText = "My Review";
                    loginLink = "../myreview/myreview.html";
                } else {
                    console.log("token已过期, 请重新登录")
                }
            } catch (ess) {
                localStorage.removeItem("token")
            }
        } else {
            console.log("未检测到token, 请登录")
        }

        console.log(document.documentElement.clientWidth);
        //Load header elements
        var headerDiv = document.getElementById("header-div");
        // var header = document.createElement("div");

        headerDiv.innerHTML = `
        <header id="header" class="header">
            <div class="title standard">
                <a href="../index.html" style="text-decoration: none; color: rgb(255, 255, 255);">
                    <strong>vma</strong>walk
                </a>
            </div>
            <a class="mobile" href="../index.html" style="margin-left: 10px;">
                <img src="../img/logo-round-white.png" style="height: 30px;">
            </a>
            <form id="teacherList" class="layui-form" align="center" action="submit" style="margin-bottom: 0;">
                <div class="layui-form-block" style="margin-right: 10px; width: 100%">
                    <select name="teacher" id="search" lay-search lay-verify="required" class="layui-input layui-unselect"
                        lay-filter="search">
                        <option value="">Find a course or a teacher</option>
                    </select>
                </div>
                <button id="selectSubmit" class="layui-btn layui-btn-fluid login-btn" lay-submit lay-filter="submit" style="padding:0; width: 50px; text-align: center; background-color: #0098ac; box-shadow: /* -7px -7px 20px 0px #fff9, */
            /* -4px -4px 5px 0px #fff9, */
            7px 7px 20px 0px #0002, 4px 4px 5px 0px #0001, /* inset 0px 0px 0px 0px #fff9, */
            inset 0px 0px 0px 0px #0001, /* inset 0px 0px 0px 0px #fff9, */
            inset 0px 0px 0px 0px #0001;"><img src="../img/search-icon.png" style="width: 30px;"></button>
            </form>
            <div style="display: flex; height: 100%; align-items: center;" class="mobile">
                <div style="padding-right: 10px">
                    <a href="../review/review.html">
                        <button class="add-review" style="width: 40px; padding:" >
                            <text class="add-review-text">✚</text>
                        </button>
                    </a>
                </div>
                <div style="padding-right: 10px;">
                    <button id="loginBtn" class="add-review" style="width:40px;">
                    <img src="../img/person.png" style="height: 20px;">
                    </button>
                </div>
            </div>
            <div style="display: flex; overflow: hidden;height: 100%;align-items: center;" class="standard">
                <div style="padding-right: 25px">
                    <button class="add-review" onclick="location.href='../review/review.html'">
                        <text class="add-review-text">✚ Review</text>
                    </button>
                </div>
                <div style="margin-right: 30px">
                    <button class="add-review" id="loginBtn">
                        <text class="add-review-text">` + loginText + `</text>
                    </button>
                </div>
            </div>`;
        await loadLayer();
        action();
        // headerDiv.innerHTML = header.innerHTML;

        if (document.documentElement.clientWidth > 750) {
            $(".mobile").css("display", "none")
        } else {
            $(".standard").css("display", "none")
            $("#teacherList").css({ width: "100%", margin: "10px" })
        }

        //Load select options



        await loadInfo;

        //#region 加载数据
        teachers.sort((x, y) => (x.chineseName + x.englishName).localeCompare(y.chineseName + y.englishName)).filter(teacher => {
            if (teacher.chineseName == null) {
                $("#search").append(new Option(teacher.englishName, `1-${teacher.id}`))
                return false;
            } else
                return true
        }).forEach(teacher =>
            $("#search").append(new Option(`${teacher.chineseName} ${teacher.englishName}`, `1-${teacher.id}`))
        )

        Courses.sort((x, y) => x.courseCode.localeCompare(y.courseCode)).forEach((i) => {
            $("#search").append(
                new Option(`${i.courseName} ${i.courseCode}`, `2-${i.courseCode}`)
            );
        });

        form.render("select");
        //#endregion

        //#region 弹出层，登录，注册，重置密码

        form.on("submit(submit)", function (data) {
            let query = data.field.teacher;
            let link = `../menu/menu.html?query=${query}`;
            window.location.href = link;
            return false;
        });
        /**
         * 
         * @param {*} formData 
         * @param {number} action 
         * 1 登录
         * 2 注册
         * 3 重置密码
         */

    };

    window.onresize = function () {
        if (document.documentElement.clientWidth > 750) {
            $(".standard").css("display", "flex")
            $(".mobile").css("display", "none")
            $(".container").css({ width: "450px", margin: "" })
            $("#teacherList").css({ width: "", margin: "" })
        } else {
            $(".mobile").css("display", "flex")
            $(".standard").css("display", "none")
            $(".container").css({ width: "auto", margin: "auto 20px" })
            $("#teacherList").css({ width: "100%", margin: "10px" })
        }
    };
    //#endregion
})


function loadFooter() {
    //Load footer elements
    var contentHeight = document.body.scrollHeight; //网页正文全文高度
    var winHeight = window.innerHeight; //可视窗口高度，不包括浏览器顶部工具栏
    var footerDiv = document.getElementById("footer-div");
    var footer = document.createElement("div");


    footer.innerHTML = `<footer id="realfooter" class="footer">
        <br>
        <div class="footer-navigator">
            <ul>
                <li>
                    <a href="../about/about.html">About Us</a>
                </li>
                <li>
                    <a href="../team/team.html">Our Team</a>
                </li>
            </ul>
        </div>
        <div class="logo-link">
            <a href="https://github.com/JeffreytheCoder/vmawalk" style="text-decoration: none;" target="_blank">
                <svg class="octicon octicon-mark-github v-align-middle" height="32" viewBox="0 0 16 16" version="1.1"
                    width="32" aria-hidden="true">
                    <path fill-rule="evenodd"
                        d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z">
                    </path>
                </svg>
            </a>
        </div>
        <span class="footer-info">
            Vmawalk is only provided for VMAers, created by VMAers since 2020.
        </span>
        <br>
    </footer>`;
    footerDiv.innerHTML = footer.innerHTML;

    var realFooter = document.getElementById("realfooter")
    realFooter.classList.add("fixed-bottom");
    console.log(contentHeight, winHeight);
    if (contentHeight <= (winHeight - 150)) {
        //当网页正文高度小于可视窗口高度时，为footer添加类fixed-bottom
        realFooter.classList.add("fixed-bottom");
    } else {
        realFooter.classList.remove("fixed-bottom");
    }
}