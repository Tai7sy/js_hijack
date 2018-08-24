
function cancle(){
    location.href="toGameHome";
}

function toGameGuides(){
    location.href="toGameGuides";
}


$("#showBtn2").click(function() {
    location.href="toGameHome";
});

var starNum;
var backTime ;
var hlArry;
var id;
var sub = 1;
var start = 1;

function startGame(){
    if(start == 1){
        start ++;
        var getWays = $("#getWays").val();
        $.ajax({
            url : 'ajaxGameStart',
            type : 'POST',
            async : true,
            data: {
                "getWays": getWays
            },
            dataType : 'json',
            timeout : 5000,
            success : function(data) {
                if(data.code=="00"){
                    $(".btna,.xlImg").hide();
                    $(".btnb,#con").show();
                    $("#gameNumTxt").hide();
                    $("#gameId").val(data.gameId);
                    starNum = data.startPoint;
                    hlArry = data.format.split("*");
                    var noRoad = data.hinders;
                    var arr2 = data.allPoints;
                    initGame(hlArry,noRoad,arr2);
                    backTime = new Date().getTime();
                    id = setInterval('countsub()',1000);
                } else if(data.code == "05"){ //次数不足
                    showAlert("抱歉，您目前无剩余挑战赛次数，</br>您可通过消费后获得挑战赛次数，</br>每人每天最多可获得5次挑战赛机会。");
                    start = 1;
                }else if(data.code == "03"){//重复提交
                    showAlert("抱歉，操作过于频繁！");
                    start = 1;
                }else{
                    showAlert("亲，网络异常，请检查网络是否正常哦！");
                    start = 1;
                }
            },
            error : function(data) {
                showAlert("亲，网络异常，请检查网络是否正常哦！");
                start = 1;
            },
        });
    }
}


function subGameResult(){
    //$("#subBtn").attr("disabled","true");
    var len = hlArry[0] * hlArry[1] - 4;
    if(newArr.length == len){
        var gameId = $("#gameId").val();
        var getWays = $("#getWays").val();
        $.ajax({
            url : 'gameResultSubmit',
            type : 'POST',
            async : true,
            data: {
                "gameId": gameId,
                "gamerandomNum":newArr.join(','),
                "getWays":getWays
            },
            dataType : 'json',
            timeout : 5000,
            success : function(data) {
                //$("#subBtn").attr("disabled","false");
                if("00" == data.code || "01" == data.code){
                    showAlert("恭喜您，已通关!");
                    sub = 1;
                    if(data.getWay == "0"){
                        var url = "challengeResultjsp?gameTime=" + data.gameTime + "&code=" + data.code + "&ranKing=" + data.ranKing + "&gameNum=" + data.gameNum + "&gameId=" + data.gameId;
                        location.href = url;
                    } else {
                        var url = "entAmusementResultjsp?gameTime=" + data.gameTime + "&code=" + data.code + "&ranKing=" + data.ranKing + "&gameNum=" + data.gameNum + "&gameId=" + data.gameId;
                        location.href = url;
                    }
                } else if(data.code=="03" ){
                    $("#showBtn2").show();
                } else if(data.code=="04" ){
                    $("#showBtn2").show();
                } else{
                    showAlert("亲，网络异常，请检查网络是否正常哦！");
                }
                sub = 1;
            },
            error : function(data) {
                //$("#subBtn").attr("disabled","false");
                showAlert("亲，网络异常，请检查网络是否正常哦！");
            },
        });
    } else {
        if(s >=301){
            $("#showBtn2").show();
            //$("#subBtn").attr("disabled","false");
        } else {
            showAlert("请完成游戏后再提交！");
            //$("#subBtn").attr("disabled","false");
        }

    }
}


var newArr=[];
var newArrXY=[];
function initGame (hlArry,noRoad,arr2){
    $(".btna").hide();
    $(".btnb").show();
    for(var i = 0; i < arr2.length; i++){
        for(var j = 0; j < arr2[i].length; j++){
            var liHtml="<li id="+arr2[i][j]+"><img  src='images/img/xImg_03.png?randomNum=20180821' class='imgY'></li>"
            $("#con ul").append(liHtml);
        }
    }
    for(var i=0; i<noRoad.length; i++){
        $("#"+noRoad[i]).addClass("bacb");
    }
    var liWh=$("#con").width()/hlArry[0]-12;
    $("#con li").css({"width":liWh+"px","height":liWh+"px","line-height":liWh+"px"});

    $("#"+starNum).addClass("baca");

    $(".baca").append("<img src='images/img/xx.png?randomNum=20180821' class='imgx'/>");
    $("#con li").touchstart(function(e){
        e.preventDefault();
        //获取con的页面偏移距离
        var conX=$("#con").position().left;
        var conY=$("#con").position().top;
        //获取触摸位置坐标
        var x=Number(e.originalEvent.targetTouches[0].pageX);
        var y=Number(e.originalEvent.targetTouches[0].pageY);
        if(x<conX || x>conX+$("#con").width() || y<conY || y>conY+$("#con").height() ){
            return;
        }
        var liwhm=liWh+10;
        //判断移动到哪个方块上，应该用鼠标坐标减去con的left除以一个方块的大小然后获取余数就可以了
        var numY=Math.abs(Math.ceil((x-conX)/liwhm))-1;
        var numX=Math.abs(Math.ceil((y-conY)/liwhm)-1);
        var id = arr2[numX][numY];
        //点击删除当前格子后面所有的元素样式
        if(newArr.indexOf(id) >= 0 && newArr.length > 0){
            removeLine(id);
            //回退
            var romArr=newArr.slice(newArr.indexOf(id) + 1 ,newArr.length);
            console.log("romArr:" + romArr);
            for(var i=0;i < romArr.length;i++){
                $("#"+romArr[i]).removeClass("baca");

                removeLine(romArr[i]);
                newArr.pop();
                newArrXY.pop();
            }
            console.log("newArr:" + newArr);
        }
    });
    $("body").touchmove(function(e){
        e.preventDefault();
        //获取con的页面偏移距离
        var conX=$("#con").position().left;
        var conY=$("#con").position().top;
        //获取触摸位置坐标
        var x=Number(e.originalEvent.targetTouches[0].pageX);
        var y=Number(e.originalEvent.targetTouches[0].pageY);
        if(x<conX || x>conX+$("#con").width() || y<conY || y>conY+$("#con").height() ){
            return;
        }
        var liwhm=liWh+10;
        //判断移动到哪个方块上，应该用鼠标坐标减去con的left除以一个方块的大小然后获取余数就可以了
        var numY=Math.abs(Math.ceil((x-conX)/liwhm))-1;
        var numX=Math.abs(Math.ceil((y-conY)/liwhm)-1);
        var id = arr2[numX][numY];
        //判断第一个是否为空，
        if(newArr.indexOf(id) == -1 && noRoad.indexOf(id) == -1){
            newArr.push(id);
            var json=[numX,numY];
            newArrXY.push(json);
            $("#"+id).addClass("baca");
            //画线
            if(newArr[0] !== starNum){
                $("#"+id).removeClass("baca");
                //$("#"+id).next().children(".imgXian").remove();
                newArr.pop();
                newArrXY.pop();
            }

            if(newArr.length>1){
                //判断上下左右，不能斜划，不能跳过
                var arr=newArrXY[newArrXY.length - 2];
                if(((arr[0] - 1) >= 0 && id == arr2[arr[0] - 1][arr[1]] )
                    || ((arr[0] + 1) >= 0 && (arr[0] + 1) < hlArry[1] && id == arr2[arr[0] + 1][arr[1]])
                    || ((arr[1] - 1) >= 0 && id == arr2[arr[0]][arr[1] - 1])
                    || ((arr[1] + 1) >= 0 && (arr[1] + 1) < hlArry[0] && id == arr2[arr[0]][arr[1] + 1]))
                {

                    var linId = newArr[newArr.indexOf(id) -1];
                    var dqX=  $("#"+newArr[newArr.indexOf(id)]).position().left;
                    var nextX=  $("#"+newArr[newArr.indexOf(id)-1]).position().left;
                    var dqY=  $("#"+newArr[newArr.indexOf(id)]).position().top;
                    var nextY=  $("#"+newArr[newArr.indexOf(id)-1]).position().top;
                    if(dqY === nextY){
                        if (dqX < nextX){
                            $("#"+linId).append("<img src='images/img/xImg_07.png?randomNum=20180821' class='imgXianX2'/>");
                        } else {
                            $("#"+linId).append("<img src='images/img/xImg_07.png?randomNum=20180821' class='imgXianX'/>");
                        }
                    }
                    if(dqX === nextX){
                        if(dqY < nextY){
                            $("#"+linId).append("<img src='images/img/xImg_07.png?randomNum=20180821' class='imgXianY2'/>");
                        } else {
                            $("#"+linId).append("<img src='images/img/xImg_07.png?randomNum=20180821' class='imgXianY'/>");
                        }
                    }

                }else{
                    $("#"+id).removeClass("baca");
                    newArr.pop();
                    newArrXY.pop();
                }
            }
        }else{
            //滑动删除当前格子后面的一个元素样式
            if(newArr.indexOf(id) >= 0 && newArr.length > 0 && newArr[newArr.indexOf(id) + 1]  ==  newArr[newArr.length - 1]){
                removeLine(id);
                $("#"+newArr[newArr.length-1]).removeClass("baca");
                //回退
                newArr.pop();
                newArrXY.pop();

            }
        }
        var len = hlArry[0] * hlArry[1] - 4;
        if(newArr.length == len && sub == 1){
            sub = 2 ;
            subGameResult();
        }
    });

    $("#con li").touchend(function(e){
        e.preventDefault();
    })
}

var NowSeconds;
var s = 0;

function removeLine(id){
    $("#"+id).children(".imgXianX").remove();
    $("#"+id).children(".imgXianX2").remove();
    $("#"+id).children(".imgXianY2").remove();
    $("#"+id).children(".imgXianY").remove();
}

function restLine(){
    newArr = [] ;
    newArrXY = [] ;
    $("#"+starNum).siblings().removeClass("baca");
    $("#con li").siblings().children(".imgXianX").remove();
    $("#con li").siblings().children(".imgXianX2").remove();
    $("#con li").siblings().children(".imgXianY").remove();
    $("#con li").siblings().children(".imgXianY2").remove();
}


function countsub(){
    var btnReg=document.getElementById("btnReg");
    if(btnReg) {
        NowSeconds = new Date().getTime();
        s = parseInt((NowSeconds-backTime)/1000);
        //计时300秒
        if(s >=301){
            btnReg.value=s;
            btnReg.disabled=false;
            clearInterval(id);
            subGameResult();
        }
        else
        {
            if(s < 0|| isNaN(s) || s=="" ||s==undefined){
                s=0;
            }
            btnReg.value = s;
            s++;
        }
    }
}



