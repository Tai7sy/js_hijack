﻿## js_hijack
在微信浏览器的每个页面插入自己的JS代码

1. 扫码开启调试模式<br>
![http://res.imtt.qq.com/tbs_inspect/x5-debug.html](https://chart.googleapis.com/chart?cht=qr&chs=150x150&chl=http://res.imtt.qq.com/tbs_inspect/x5-debug.html)<br>
新版本内核弹出调试开关确认；旧内核请点击下载TBS内核；(无法自动跳转直接看第三步)
2. 没有TBS内核或内核版本过低请"安装线上TBS内核"，安装完成之后重新扫描二维码；

3. 扫码后，在“信息”选项卡，选择 "打开vConsole调试功能"，<br>
![http://debugx5.qq.com/](https://chart.googleapis.com/chart?cht=qr&chs=150x150&chl=http://debugx5.qq.com)

4. “代理”选项卡，选择“强制走直连”，并且修改Hosts，然后拉倒最下面，清空DNS缓存，文件缓存<br>
填入 `你的IP=wechatfe.github.io`

5. 建一个网站，域名绑定为 wechatfe.github.io，hijack.js 里面判断域名和需要加载的js

6. 之后微信额每个页面就都会插入我们的JS了，可以方便做一些自动脚本

