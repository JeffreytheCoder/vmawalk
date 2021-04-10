在每次开发/修改一个feature之前：
1. checkout到master分支，pull下来最新的代码
2. 从master分支checkout一个新分支，名为开发/修改feature的标题，进行自己的开发
3. feature开发完后，checkout到test分支，用test域名（待添加）测试更改效果
4. 测试完成后，从自己的分支发一个PR到master，描述里加上测试成功的更改效果截图
