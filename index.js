function toSearchPage() {
    var query = document.getElementById("keyword")
        .value;
    // window.open("https://jeffreythecoder.github.io/vmawalk/search/search?"+)
    window.location.href =
        "https://jeffreythecoder.github.io/vmawalk/search/search?index=" +
        query;
}

teachers = [
    "王赫 Wang He",
    "Maryann O'Brien",
    "咸海明 Maggie Xian",
    "耿倩 Melody Geng",
    "杨永乐 Eric Yang",
    "伍仙洁 Jenny Wu",
    "Sabrina Waterfield",
    "吴晓莉 Shirley Wu",
    "杜浩 Howard Du",
    "郑伟伟 Simon Zheng",
    "曹霞 Cao Xia",
    "秦星 Ryan Qin",
    "郭润尘 Rayson Guo",
    "谢瑾嵘 Jean Xie",
    "陈宇婷 Christy Chen",
    "陈燕静 Eva Chen",
    "谢燕萍 Shelly Xie",
    "唐芯雅 Tang Xinya",
    "王子豪 Joel Wang",
    "鲁燕 Lu Yan",
    "李桂敏 Lisa Li",
    "凌利红 Ling Lihong",
    "阮坤连 Ruan Kunlian",
    "朱晓军 Zhu Xiaojun",
    "张甲春 Zhang Jiachun",
    "王海燕 Wang Haiyan",
    "邵琼波 Shao Qiongbo",
    "孙艳萍 Sun Yanping",
    "陈燕琦 Kay Chen",
    "黄丽君 June Huang",
    "严欣然 Sunny Yan",
    "赵菲儿 Zhao Feier",
    "阳菲 Yang Fei",
    "吕羚 Laura Lyu",
    "陈俊昇 Jun Chen",
    "Nicholas Tan",
    "周靖 Dean Zhou",
    "马骁 Jack Ma",
    "胡纯 Michael Hu",
    "张莉 Lily Zhang",
    "张媛 Christina Zhang",
    "崔玉 Ella Cui",
    "董芮 Donna Dong",
    "周怡辰 Evelyn Zhou",
    "张博 Bryce Zhang",
    "蒲妍冰 Mia Pu",
    "肖惠珊 Sandara Xiao",
    "杨锦婷 Ivy Yang",
    "龙增辉 Allen Long",
    "艾文玲 Aileen Ai",
    "周小伟 Zhou Xiaowei",
    "于世刚 Yu Shigang",
    "邓宁 Deng Ning",
    "陈潇 Chablis Chen",
    "Jayden Chang",
    "Paul Arnold Svaren",
    "严健铭 Ethan Yan",
    "李函珏 Li Hanjue",
    "孙绿乔 Nala Sun",
    "刘宴妮 Liu Yanni",
    "Sean Huang",
    "Angela Choi",
    "Martin Kwok",
    "黄茹茹 Jane Huang",
    "陈冬松 Suzy Chen",
    "黄瑜 Yvonne Huang",
    "周雅文 Yawen Zhou",
    "邬宁馨 Mandy Wu",
    "吴祎 Wu Yi",
    "罗晓 Alice Luo",
    "李思萦 Li Siying",
    "张愉婉 Yvonne Zhang",
    "Steve Gamble",
    "Teisha Chung-Smith",
    "Nicolas McNamara",
    "王舒笛 Crystal Wang",
    "沈炜楠 Irene Shen",
    "Kirsten Nicole Saunders",
    "Timbray Shafer",
    "Isabel Panadero",
    "Donny Ng",
    "祭菲 Sophie Ji",
    "Matthew Schroeder",
    "Charlotte Bailey",
    "Chesslyn Scott Bailey",
    "Elizabeth Mitchell",
    "Ashley Atkins",
    "禹雅 Olivia Yu",
    "Joseph Grefer",
    "Kimberly Garner",
    "张新瑶 Zhang Xinyao",
    "黄春华 Bridget Huang",
    "王嘉熠 Wang Jiayi",
    "Michael Kwan",
    "林锋洁 Amber Lin",
    "Ryan Bradwell",
    "白凌 Beryl Bai",
    "James Mosca",
    "Sarah Maffei",
    "Gabriel Beadle",
    "Michael Predmore",
    "殷雁 Yin Yan",
    "张跞颖 Zhang Luoying",
    "Mogammad Zardad",
    "Per Nilsson",
    "Rothman Ng",
    "龚禹 Amy Gong",
    "李维才 Alex Li",
    "尤晶磊 Victoria You",
    "孙靓雯 Tina Sun",
    "周幸茹 Riva Zhou",
    "Yassine Mahouch",
    "Jacky Wong",
    "Pamela Joseph",
    "Nicholas Atwater",
    "Ivan Tsang",
    "高浩 Gao Hao",
    "马斌 Matt Ma",
    "徐源 Randy Xu",
    "何智伟 He Zhiwei",
    "吴国熹 Kwok Hei Ng",
    "杨文娟 Vicky Yang",
    "Amelita Tavera",
    "Nichia Huxtable",
    "叶元成 Carter Ye",
    "申磊 Shen Lei",
    "高升恒 Raphael Gao",
    "Jason Hum",
    "吴邵汐 Shawn Wu",
    "李戈 Andy Li",
    "李钰 Nancy Li",
    "Roland Wang",
    "刘洋 Christian Liu",
    "蔡润苑 Joanna Cai",
    "潘游美忆 May Pan",
    "Leon Tkachyk",
    "段炼 Eric Duan",
    "许美杰 Vincent Xu",
    "王大伟 Wang Dawei",
    "吴惠洋 Michael Wu",
    "徐亮 Tony Xu",
    "饶琼 Joan Rao",
    "Cesar Sousa",
    "石忞旻 Shi Minmin",
    "徐志伟 Sam Xu",
    "张泽泳 Scott Zhang",
    "林文鑫 Cavan Lin",
    "贾如愚 Rain Jia",
    "Dixie Beadle",
    "邱野 Leo Qiu",
    "马梦 Martina Ma",
    "Brigid Transon",
    "Michael Tsalka",
    "Benjamin Fleischacker",
    "Leonard Lindweld",
    "曹耘 Susan Cao",
    "王砥 Wang Di",
    "吴佳宜 Chloe Wu",
    "林素琴 Jackie Lin",
    "屠旖旎 Vivian Tu",
    "Louie Cabognason",
    "梁晶玮 Kenvi Liang",
    "白东亮 James Bai",
    "赖雨青 Lavita Lai",
    "Colton Francis",
    "陈逸秋 Chen Yiqiu",
    "张子提 Daniel Zhang",
    "吴晓萍 Lilia Wu",
    "王思懿 Valentina Wang",
    "李扬 Li Yang"
];

layui.use(['jquery'], function() {
            var $ = layui.$;
            $('#keyword').autocomplete({
                    // serviceUrl:'https://jeffreythecoder.github.io/vmawalk/files/Teachers.json'
                    lookup: teachers,
                    HEAD
                    lookupFilter: function(
                        lookupLimit: 15,
                        lookupFilter: function(
                            65 f9022eceaf092be92ca7e08376914e75230ac0 suggestion, query,
                            queryLowerCase) {
                            if (suggestion.value.toLowerCase().indexOf(queryLowerCase) != -1 ||
                                chineseToPinYin(suggestion.value).toLowerCase().indexOf(queryLowerCase) != -1)
                                return true;
                        }
                    })
            });