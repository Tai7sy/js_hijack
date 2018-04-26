/**
 * 2018-4-25 20:20:42
 * 浦发24点红包游戏自动脚本
 */

function gen_rand() {
    var num1 = 2, num2 = 3, num3 = 4, num4 = 5;
    Cookies.set("wxrpCookArithmeticFisrtNum", num1);
    Cookies.set("wxrpCookArithmeticTwoNum", num2);
    Cookies.set("wxrpCookArithmeticThreeNum", num3);
    Cookies.set("wxrpCookArithmeticFourNum", num4);

    var pm1 = "https://weixin.spdbccc.com.cn/wxrp-page-arithmetic/arithmetic/img3/d" + num1 + ".png";
    var pm2 = "https://weixin.spdbccc.com.cn/wxrp-page-arithmetic/arithmetic/img3/d" + num2 + ".jpg";
    var pm3 = "https://weixin.spdbccc.com.cn/wxrp-page-arithmetic/arithmetic/img3/d" + num3 + ".jpg";
    var pm4 = "https://weixin.spdbccc.com.cn/wxrp-page-arithmetic/arithmetic/img3/d" + num4 + ".jpg";
    $("#barrage1 img").attr("src", pm1);
    $("#barrage2 img").attr("src", pm2);
    $("#barrage3 img").attr("src", pm3);
    $("#barrage4 img").attr("src", pm4);

    $(".zmP").css({"width": "100%", "height": "100%"}).show();
    //设置背景
    var src1 = $('#barrage1 img').attr('src');
    var src2 = $('#barrage2 img').attr('src');
    var src3 = $('#barrage3 img').attr('src');
    var src4 = $('#barrage4 img').attr('src');
    $(".divBox1").css("background-image", "url(" + src1 + ")");
    $(".divBox2").css("background-image", "url(" + src2 + ")");
    $(".divBox3").css("background-image", "url(" + src3 + ")");
    $(".divBox4").css("background-image", "url(" + src4 + ")");
    oldPmSrc1 = $("#barrage1 img").attr("src");
    oldPmSrc2 = $("#barrage2 img").attr("src");
    oldPmSrc3 = $("#barrage3 img").attr("src");
    oldPmSrc4 = $("#barrage4 img").attr("src");
    $(".gif").hide();
    $(".divBoxW").css("background-image", "url(arithmetic/img2/bmP_03.png)");
    $(".zmP").show();
    $('.bmP').hide();
}

function autoSolve() {

    function calc24() {
        var expression = [].slice.call(arguments).sort();
        var operator = ['+', '-', '*', '/'], result = [], hash = {};
        (function (expression) {
            var len = expression.length;
            var group_str = expression.slice(0).sort().toString();
            if (!hash[group_str]) {
                hash[group_str] = true;
                if (len > 1) {
                    for (var i = 0; i < len - 1; i++) {
                        for (var j = i + 1; j < len; j++) {
                            var sort_expression = expression.slice(0);
                            var exp1 = sort_expression.splice(j, 1)[0];
                            var exp2 = sort_expression.splice(i, 1)[0];
                            for (var n = 0; n < 4; n++) {
                                if (result.length) return; // find then exit
                                var new_expression = sort_expression.slice(0);
                                new_expression.splice(0, 0, n > 1 || len === 2 ? exp1 + operator[n] + exp2 : '(' + exp1 + operator[n] + exp2 + ')');
                                arguments.callee(new_expression);
                                if (exp1 !== exp2 && n % 2) {
                                    new_expression.splice(0, 1, n > 1 || len === 2 ? exp2 + operator[n] + exp1 : '(' + exp2 + operator[n] + exp1 + ')');
                                    arguments.callee(new_expression);
                                }
                            }
                        }
                    }
                } else if (Math.abs(eval(expression[0]) - 24) < 1e-6) {
                    result.push(expression[0]);
                }
            }
        })(expression);

        var ret = result.length ? result[0] : null;
        if (ret) {
            // 化简结果, 去除多余 ()
            var test;
            if (test = /\((\(\d[\+\-]\d\))[\+\-]\d\)/.exec(ret)) {
                ret = ret.replace(test[1], test[1].replace(/[\(\)]/g, ''))
            }

            if (test = /\(\d[\+\-](\(\d[\+\-]\d\))\)/.exec(ret)) {
                ret = ret.replace(test[1], test[1].replace(/[\(\)]/g, ''))
            }
        }

        return ret;
    }

    var operators = $(".fhBox li img");
    var operatorBoxs = $(".box span");
    var numberBoxs = $(".box p");

    //基本不变的js 每一个容器的位置
    var boxOffset = [
        $(numberBoxs[0]).offset(),
        $(numberBoxs[1]).offset(),
        $(numberBoxs[2]).offset(),
        $(numberBoxs[3]).offset()
    ];
    var box1W = $(numberBoxs[0]).width();
    var box1H = $(numberBoxs[0]).height();

    function addOperator(box, operator) {
        var index = -1;
        switch (operator) {
            case '+':
                index = 0;
                break;
            case '-':
                index = 1;
                break;
            case '*':
                index = 2;
                break;
            case '/':
                index = 3;
                break;
            case '(':
                index = 4;
                break;
            case ')':
                index = 5;
                break;
        }
        if (index === -1) {
            return alert('addOperator no operator: ' + operator);
        }

        var thisSrc = $(operators[index]).attr("src");
        var fhIndex = index + 1;
        $(operatorBoxs[box]).empty();
        $(operatorBoxs[box]).append("<img src=" + thisSrc + " id=" + fhIndex + ">");
    }

    var used = [];

    function addNumber(iBox, number) {
        var find = false;
        for (var iNum = 0; iNum < 4; iNum++) {
            if (Num[iNum] === parseInt(number) && used.indexOf(iNum) === -1) {
                find = true;
                break;
            }
        }
        if (!find) {
            return alert('can\'t find number ' + number + ' for box ' + (iBox + 1));
        }
        used.push(iNum);

        var numberTrue = '',numberEncrypt = '';
        if (iNum === 0) {
            numberTrue = Cookies.get("wxrpCookArithmeticFisrtColor");
            numberEncrypt = Cookies.get("wxrpCookArithmeticFisrtNum");
        } else if (iNum === 1) {
            numberTrue = Cookies.get("wxrpCookArithmeticTwoColor");
            numberEncrypt = Cookies.get("wxrpCookArithmeticTwoNum");
        } else if (iNum === 2) {
            numberTrue = Cookies.get("wxrpCookArithmeticThreeColor");
            numberEncrypt = Cookies.get("wxrpCookArithmeticThreeNum");
        } else if (iNum === 3) {
            numberTrue = Cookies.get("wxrpCookArithmeticFourColor");
            numberEncrypt = Cookies.get("wxrpCookArithmeticFourNum");
        }

        var newPmSrc = "arithmetic/img4/" + numberTrue + ".png";

        $('#barrage' + (iNum + 1) + ' img').attr("src", newPmSrc);

        $('#barrage' + (iNum + 1)).css({
            "left": boxOffset[iBox].left,
            "top": boxOffset[iBox].top,
            "width": box1W,
            "height": box1H
        });
        Cookies.set("wxrpCookArithmeticBox" + (iBox + 1), numberEncrypt);
    }


    var Num = [
        parseInt(Cookies.get("wxrpCookArithmeticFisrtColor").replace(/[abcd]/g, '')),
        parseInt(Cookies.get("wxrpCookArithmeticTwoColor").replace(/[abcd]/g, '')),
        parseInt(Cookies.get("wxrpCookArithmeticThreeColor").replace(/[abcd]/g, '')),
        parseInt(Cookies.get("wxrpCookArithmeticFourColor").replace(/[abcd]/g, ''))
    ];

    var result = calc24(Num[0], Num[1], Num[2], Num[3]);
    if (result == null) {
        return alert('can\'t find solution for ' + Num[0] + ' ' + Num[1] + ' ' + Num[2] + ' ' + Num[3]);
    }

    console.log('[solved] ' + result);

    for (var i = 0, numIndex = 0, opIndex = 0; i < result.length; i++) {
        console.log('                  [ret] ' + result[i]);
        if (/\d/.test(result[i])) {
            if (numIndex === 0) {
                opIndex = 1; // 第0个数字框 后面
            } else if (numIndex === 1) {
                opIndex = 3;// 第1个数字框 后面
            } else if (numIndex === 2) {
                opIndex = 6;
            } else if (numIndex === 3) {
                opIndex = 8;
            }
            console.log('[addNumber] ' + result[i]);
            addNumber(numIndex++, result[i]);
        } else {
            // console.log('[addOperator] ' + result[i]);
            addOperator(opIndex++, result[i])
        }
    }
}

(function () {
    var appendHtml = '<button id="append-content-btn" style="position: fixed;right: 0;width: 50px;height: 50px;z-index:99999999;text-align: center;background-color: white" onclick="autoSolve()">解答</button>';
    $('body').prepend(appendHtml);
    console.log('[浦发助手] Injected !')
})();