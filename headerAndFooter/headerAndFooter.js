document.write(`
    <script src="../lib/pinyin.js"></script>
    <script src="../lib/initials.js"></script>
`)

function loadHeader() {

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


    if (document.documentElement.clientWidth <= 700) {
        console.log(document.documentElement.clientWidth);
        //Load header elements
        headerDiv = document.getElementById("header-div");
        var header = document.createElement("div");
        header.innerHTML =
            `<header id="header" class="header">
    <form class="layui-form" align="center" action="submit" style="margin-bottom: 0; margin: 10px; width: 100%">
        <div class="layui-form-block" style="margin-right: 10px; width: 100%">
            <select name="teacher" id="search" lay-search lay-verify="required" class="layui-input layui-unselect"
                lay-filter="search">
                <option value="">Find a course or a teacher
                </option>
            </select>
        </div>
        <button class="layui-btn layui-btn-fluid login-btn" lay-submit lay-filter="submit" style=" padding: 0; width: 50px; text-align: center; background-color: #0098ac; box-shadow: /* -7px -7px 20px 0px #fff9, */
    /* -4px -4px 5px 0px #fff9, */
    7px 7px 20px 0px #0002, 4px 4px 5px 0px #0001, /* inset 0px 0px 0px 0px #fff9, */
    inset 0px 0px 0px 0px #0001, /* inset 0px 0px 0px 0px #fff9, */
    inset 0px 0px 0px 0px #0001;"><img src="../img/search-icon.png" style="width: 30px;"></button>
    </form>
    <div style="display: flex; height: 100%; align-items: center;">
        <div style="padding-right: 10px">
            <a href="../review/review.html">
                <button class="add-review" style="width: 40px; padding:" >
                    <text class="add-review-text">✚</text>
                </button>
            </a>
        </div>
        <div style="padding-right: 10px;">
        <a href=` + loginLink + `>
            <button class="add-review">
                <text class="add-review-text">` +
            loginText +
            `</text>
            </button>
        </a>
    </div>
    </div>
</header>`;
        headerDiv.appendChild(header);

    } else {
        //Load header elements
        headerDiv = document.getElementById("header-div");
        var header = document.createElement("div");
        header.innerHTML =
            `<header id="header" class="header">
    <div class="title">
        <a href="../index.html" style="text-decoration: none; color: rgb(255, 255, 255);">
            <strong>vma</strong>walk
        </a>
    </div>
    <form class="layui-form" align="center" action="submit" style="margin-bottom: 0;">
        <div class="layui-form-block" style="width: 100%; margin-right: 10px;">
            <select name="teacher" id="search" lay-search lay-verify="required" class="layui-input layui-unselect"
                lay-filter="search">
                <option value="">Find a course or a teacher
                </option>
            </select>
        </div>
        <button class="layui-btn layui-btn-fluid login-btn" lay-submit lay-filter="submit" style="width: auto; text-align: center; background-color: #0098ac; box-shadow: /* -7px -7px 20px 0px #fff9, */
    /* -4px -4px 5px 0px #fff9, */
    7px 7px 20px 0px #0002, 4px 4px 5px 0px #0001, /* inset 0px 0px 0px 0px #fff9, */
    inset 0px 0px 0px 0px #0001, /* inset 0px 0px 0px 0px #fff9, */
    inset 0px 0px 0px 0px #0001;">Search</button>
    </form>
    <div style="display: flex; overflow: hidden;height: 100%;align-items: center;">
        <div style="padding-right: 25px">
            <a href="../review/review.html">
                <button class="add-review">
                    <text class="add-review-text">✚ Review</text>
                </button>
            </a>
        </div>
        <div style="padding-right: 30px;">
            <a href=` + loginLink + `>
                <button class="add-review">
                    <text class="add-review-text">` +
            loginText +
            `</text>
                </button>
            </a>
        </div>
    </div>
</header>`;
        headerDiv.appendChild(header);
    }

    //Load select options
    layui.use(["layer", "jquery", "form"], function() {
        var $ = layui.jquery;

        teachers.filter(teacher => {
            if (teacher.chineseName == null) {
                $("#search").append(new Option(teacher.englishName, `1-${teacher.id}`))
                return false;
            } else
                return true
        }).forEach(teacher =>
            $("#search").append(new Option(`${teacher.chineseName} ${teacher.englishName}`, `1-${teacher.id}`))
        )

        Courses.forEach((i) => {
            $("#search").append(
                new Option(`${i.courseName} ${i.courseCode}`, `2-${i.courseCode}`)
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
            let query = data.field.teacher;
            let link = `../menu/menu.html?query=${query}`;
            window.location.href = link;
            return false;
        });
    });
}

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
    footerDiv.appendChild(footer);

    var realFooter = document.getElementById("realfooter")
    realFooter.classList.add("fixed-bottom");
    if (contentHeight <= (winHeight - 150)) {
        //当网页正文高度小于可视窗口高度时，为footer添加类fixed-bottom
        realFooter.classList.add("fixed-bottom");
    } else {
        realFooter.classList.remove("fixed-bottom");
    }
}