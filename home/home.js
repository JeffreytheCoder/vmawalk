layui.config({
    base: '../layui/', // 自己autocomplete文件路径
    version: false,
    debug: false,
});

layui.use(['jquery', 'autocomplete'], function() {
    var $ = layui.jquery,
        autocomplete = layui.autocomplete;
    autocomplete.render({
        elem: $('#keyword'),
        cache: true,
        url: 'http://localhost:250/C%3A/Users/23973/Desktop/vmawalk/files/Teachers.json',
        response: { Chinese: 'Chinese', English: 'English' },
        onselect: function(resp) {
            $('#content1').html("NEW RENDER: " + JSON.stringify(resp));
        }
    })
})