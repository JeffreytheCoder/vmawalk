function loadHeader() {
    // Judge if login or myreview
    var loginText = "登 录";
    var loginLink = "../login/login.html";
    var token = localStorage.getItem("token")
    if (token) {
        console.log("检测到token")
        var user = JSON.parse(b64_to_utf8(token.split(".")[1]))

        if (user.exp > Date.now() / 1000) {
            console.log("token未过期, 已登录")
            loginText = "我的点评";
            loginLink = "../myreview/myreview.html";
        } else {
            console.log("token已过期, 请重新登录")
        }
    } else {
        console.log("未检测到token, 请登录")
    }

    //Load header elements
    headerDiv = document.getElementById("header-div");
    var header = document.createElement("div");
    header.innerHTML =
        `<header id="header" class="header">
    <div class="title">
        <a href="https://jeffreythecoder.github.io/vmawalk/" style="text-decoration: none; color: rgb(255, 255, 255);">
            <strong>vma</strong>walk
        </a>
    </div>
    <form class="layui-form" align="center" action="submit" style="margin-bottom: 0">
        <div class="layui-form-block" style="width: 100%; margin-right: 10px;">
            <select name="teacher" id="search" lay-search lay-verify="required" class="layui-input layui-unselect"
                lay-filter="search">
                <option value="">请选择课程和老师
                </option>
            </select>
        </div>
        <button class="layui-btn layui-btn-fluid login-btn" lay-submit lay-filter="submit" style="width: 70px; text-align: center; background-color: #0098ac; box-shadow: /* -7px -7px 20px 0px #fff9, */
    /* -4px -4px 5px 0px #fff9, */
    7px 7px 20px 0px #0002, 4px 4px 5px 0px #0001, /* inset 0px 0px 0px 0px #fff9, */
    inset 0px 0px 0px 0px #0001, /* inset 0px 0px 0px 0px #fff9, */
    inset 0px 0px 0px 0px #0001;">搜索</button>
    </form>
    <div style="display: flex;">
        <div style="padding-right: 20px">
            <a href="../review/review.html">
                <button class="add-review" style="background-color: white;">
                    <text class="add-review-text" style="color: #69BDC8;">✚ 加点评</text>
                </button>
            </a>
        </div>
        <div style="padding-right: 30px;">
            <a href=` + loginLink + `>
                <button class="add-review" style="background-color: white;">
                    <text class="add-review-text" style="color: #69BDC8;">` +
        loginText +
        `</text>
                </button>
            </a>
        </div>
    </div>
</header>`;
    headerDiv.appendChild(header);

    //Load select options
    layui.use(["layer", "jquery", "form"], function() {
        var $ = layui.jquery;

        for (var i = 1; i < teachers.length; i++) {
            if (teachers[i].chineseName == null) {
                $("#search").append(new Option(teachers[i].englishName, "1-" + teachers[i].id));
            }
        }
        for (var i = 1; i < teachers.length; i++) {
            if (teachers[i].chineseName != null) {
                $("#search").append(new Option(teachers[i].chineseName + " " +
                    teachers[i].englishName, "1-" + teachers[i].id));
            }
        }
        Courses.forEach((i) => {
            $("#search").append(
                new Option(i.courseName + " " + i.courseCode, "2-" + i.courseCode)
            );
        });

        layui.form.render("select");
    });

    layui.use(["form", "jquery"], function() {
        var form = layui.form;
        var $ = layui.$;

        $(document).keydown(function(e) {
            if (e.keyCode === 13) {
                $("#submit").trigger("click");
                return false;
            }
        });

        form.on("submit(submit)", function(data) {
            query = data.field.teacher;
            link = "../menu/menu.html?query=" + encodeURI(encodeURI(query)) + "";
            window.location.href = link;
            return false;
        });
    });
}

function loadFooter() {
    //Load footer elements
    footerDiv = document.getElementById("footer-div");
    var footer = document.createElement("div");
    footer.innerHTML = `<footer class="footer">
        <br>
        <div class="footer-navigator">
            <ul>
                <li>
                    <a href="../about/about.html">About</a>
                </li>
                <li>
                    <a href="../team/team.html">Team</a>
                </li>
                <li>
                    <a href="../about/about.html">Policy</a>
                </li>
            </ul>
        </div>
        <div class="logo-link">
            <a href="https://github.com/JeffreytheCoder/vmawalk" style="text-decoration: none;">
                <svg class="octicon octicon-mark-github v-align-middle" height="32" viewBox="0 0 16 16" version="1.1"
                    width="32" aria-hidden="true">
                    <path fill-rule="evenodd"
                        d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z">
                    </path>
                </svg>
            </a>
        </div>
        <span class="footer-info">
            Vmawalk is a public platform only provided for VMA students, created by VMA students since 2020.
        </span>
        <br>
    </footer>`;
    footerDiv.appendChild(footer);
}