/**
 * 2018-4-25 20:20:42
 * 浦发24点红包游戏自动脚本
 */

function gen_rand() {
    var num1 = 2, num2 = 3, num3 = 4, num4 = 10;
    Cookies.set("wxrpCookArithmeticFisrtNum", num1);
    Cookies.set("wxrpCookArithmeticTwoNum", num2);
    Cookies.set("wxrpCookArithmeticThreeNum", num3);
    Cookies.set("wxrpCookArithmeticFourNum", num4);

    Cookies.set("wxrpCookArithmeticFisrtColor", 'd' + num1);
    Cookies.set("wxrpCookArithmeticTwoColor", 'd' + num2);
    Cookies.set("wxrpCookArithmeticThreeColor", 'd' + num3);
    Cookies.set("wxrpCookArithmeticFourColor", 'd' + num4);

    var pm1 = "https://weixin.spdbccc.com.cn/wxrp-page-arithmetic/arithmetic/img3/d" + num1 + ".png";
    var pm2 = "https://weixin.spdbccc.com.cn/wxrp-page-arithmetic/arithmetic/img3/d" + num2 + ".png";
    var pm3 = "https://weixin.spdbccc.com.cn/wxrp-page-arithmetic/arithmetic/img3/d" + num3 + ".png";
    var pm4 = "https://weixin.spdbccc.com.cn/wxrp-page-arithmetic/arithmetic/img3/d" + num4 + ".png";


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

function is_number(char) {
    if (typeof char === 'string')
        char = char.charCodeAt(0);
    return 48 <= char && char <= 57
}

function showMsg(str, timeout) {
    var rand = parseInt(Math.random() * 1000000);
    var msg_id = 'append-msg-' + rand;
    var appendHtml = '<div id="' + msg_id + '" style="position: fixed;right: 0;width: 100%;margin-top: 64px; height: auto;z-index:99999999;text-align: center;background-color: rgba(222, 222, 222, 0.4);">' + str + '</div>';
    $('body').prepend(appendHtml);

    function hide() {
        $('#' + msg_id).remove();
    }

    setTimeout(hide, timeout);
}

var solution_index = -1;

function autoSolve() {

    function calc24() {
        var p = [].slice.call(arguments).sort();
        var q = ['+', '-', '*', '/'],
            result = [],
            hash = {};
        (function (a) {
            var b = a.length;
            var c = a.slice(0).sort().toString();
            if (!hash[c]) {
                hash[c] = true;
                if (b > 1) {
                    for (var i = 0; i < b - 1; i++) {
                        for (var j = i + 1; j < b; j++) {
                            var d = a.slice(0);
                            var e = d.splice(j, 1)[0];
                            var f = d.splice(i, 1)[0];
                            var g = eval(f);
                            if (g < 0) continue;
                            if (g.toString().indexOf(".") !== -1) continue;
                            var h = 0;
                            for (var n = 0; n < 4; n++) {
                                var k = d.slice(0);
                                k.splice(0, 0, n > 1 || b === 2 ? e + q[n] + f : '(' + e + q[n] + f + ')');
                                arguments.callee(k);
                                if (e !== f && n % 2) {
                                    k.splice(0, 1, n > 1 || b === 2 ? f + q[n] + e : '(' + f + q[n] + e + ')');
                                    arguments.callee(k)
                                }
                            }
                        }
                    }
                } else if (eval(a[0]) === 24) {
                    var l = a[0];
                    if (a[0].indexOf("((") !== -1) {
                        l = a[0].replace("((", "(").replace(')', '')
                    } else if (a[0].indexOf("))") !== -1) {
                        l = a[0].replace("))", ")");
                        var m = l.lastIndexOf("(");
                        l = l.substring(0, m) + l.substr(m + 1)
                    }
                    if (eval(l) === 24) {
                        var o = l.replace("(", "").replace("(", "").replace(")", "").replace(")", "");
                        if (eval(o) === 24) result.push(o);
                        else result.push(l)
                    } else {
                        result.push(a[0])
                    }
                }
            }
        })(p);

        console.log(result);

        for (var i = 0; i < result.length; i++) {
            var ret = result[i];
            if (ret) {
                // 化简结果, 去除多余 ()
                var test;

                // ((1+2)+3)   ((1-2)+3)
                if (test = /\((\(\d+[\+\-]\d+\))[\+\-]\d+\)/.exec(ret)) {
                    ret = ret.replace(test[1], test[1].replace(/[\(\)]/g, ''));
                }

                // (3+(2+1)) (3+(2-1))
                if (test = /\(\d+\+(\(\d+[\+\-]\d+\))\)/.exec(ret)) {
                    ret = ret.replace(test[1], test[1].replace(/[\(\)]/g, ''));
                }

                // (3-(2+1)) (3-(2-1))
                if (test = /\(\d+\-(\(\d+[\+\-]\d+\))\)/.exec(ret)) {
                    ret = ret.replace(test[1], test[1].replace(/[\(\)]/g, '').replace('-', 'A').replace('+', '-').replace('A', '+'));
                }

                // ((1*2)*3)   ((1*2)*3)
                if (test = /\((\(\d+[\*\/]\d+\))[\*\/]\d+\)/.exec(ret)) {
                    ret = ret.replace(test[1], test[1].replace(/[\(\)]/g, ''));
                }

                // (3*(2*1)) (3*(2/1))
                if (test = /\(\d+\*(\(\d+[\*\/]\d+\))\)/.exec(ret)) {
                    ret = ret.replace(test[1], test[1].replace(/[\(\)]/g, ''));
                }

                // (3/(2*1)) (3/(2/1))
                if (test = /\(\d+\/(\(\d+[\*\/]\d+\))\)/.exec(ret)) {
                    ret = ret.replace(test[1], test[1].replace(/[\(\)]/g, '').replace('*', 'D').replace('/', '*').replace('D', '/'));
                }
            }
            result[i] = ret;
            if ((!is_number(ret[0]) && !is_number(ret[1])) || !is_number(ret[ret.length - 1]) && !is_number(ret[ret.length - 2])) {
                continue;
            }
            if (solution_index === result.length - 1) {
                solution_index = -1
            }

            if (i <= solution_index) {
                continue;
            }
            solution_index = i;
            return ret;
        }

        console.log('error');
        return result.length ? result[0] : null;
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

        var numberTrue = '', numberEncrypt = '';
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

    showMsg(result, 2000);
    console.log('[solved] ' + result);

    for (var i = 0, numIndex = 0, opIndex = 0; i < result.length; i++) {
        if (is_number(result[i])) {
            if (numIndex === 0) {
                opIndex = 1; // 第0个数字框 后面
            } else if (numIndex === 1) {
                opIndex = 3;// 第1个数字框 后面
            } else if (numIndex === 2) {
                opIndex = 6;
            } else if (numIndex === 3) {
                opIndex = 8;
            }
            var nowNumber = result[i];
            if (is_number(result[i + 1])) {
                nowNumber = nowNumber + '' + result[i + 1];
                i++;
            }
            console.log('[addNumber] ' + nowNumber);
            addNumber(numIndex++, nowNumber);
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