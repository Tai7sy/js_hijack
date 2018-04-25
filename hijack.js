(function () {

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
        tag.src = src;
        document.getElementsByTagName('head')[0].appendChild(tag);
    }


    var url = location.href;
    if (url.indexOf('weixin.spdbccc.com.cn/wxrp-page-arithmetic/arithmeticGameIndex') > -1) {
        return loadScript('pufa_24.js');
    }
})();