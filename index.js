function toSearchPage() {
    var query = document.getElementById("keyword").value
        // window.open("https://jeffreythecoder.github.io/vmawalk/search/search?"+)
    window.location.href = "https://jeffreythecoder.github.io/vmawalk/search/search?index=" + query;
};

layui.config({
    base: 'layui/', // 自己autocomplete文件路径
    version: false,
    debug: false,
});

layui.use(['jquery', 'autocomplete'], function() {
    var $ = layui.jquery,
        autocomplete = layui.autocomplete;
    autocomplete.render({
        elem: $('#keyword'),
        url: 'https://jeffreythecoder.github.io/vmawalk/files/Teachers.json',
        template_val: '{{d.name}}',
        template_txt: '{{d.name}} <span class=\'layui-badge layui-bg-gray\'>{{d.pinyin}}</span>',
        // response: { Chinese: 'Chinese', English: 'English' },
        num: 1,
        count: 5,
        onselect: function(resp) {
            console.log(resp);
        }
    })
})