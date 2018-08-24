

function showMsg (str, timeout) {
    var rand = parseInt(Math.random() * 1000000);
    var msg_id = 'append-msg-' + rand;
    var appendHtml = '<div id="' + msg_id + '" style="position: fixed;right: 0;width: 100%;margin-top: 64px; height: auto;z-index:99999999;text-align: center;background-color: rgba(222, 222, 222, 0.4);">' + str + '</div>';
    $('body').prepend(appendHtml);

    function hide () {
        $('#' + msg_id).remove();
    }

    setTimeout(hide, timeout);
}


function autoSolve (autoSubmit) {

    var g_container = $('#con');
    var g_elements_arr = g_container.find('li');
    var g_element_start = g_container.find('.baca');

    var g_cnt_x = Math.round(g_container.width() / (g_element_start.width() + 12));
    var g_cnt_y = g_elements_arr.length / g_cnt_x;

    console.log('行列检测: ', g_cnt_x, g_cnt_y);

    var g_table = [];
    var g_start = null;
    for (var y = 0; y < g_cnt_y; y++) {
        g_table[y] = [];
        for (var x = 0; x < g_cnt_x; x++) {
            g_table[y][x] = {
                id: $(g_elements_arr[y * g_cnt_x + x]).attr('id'),
                is: $(g_elements_arr[y * g_cnt_x + x]).hasClass('bacb') ? 0 : 1,
                ed: 0,
                y: y,
                x: x
            };
            if (g_element_start[0] === g_elements_arr[y * g_cnt_x + x]) {
                g_start = g_table[y][x];
            }
        }
    }


    var m_arr = g_table;

    function get_top (e) {
        if (0 === e.y || 0 === m_arr[e.y - 1][e.x].is) {
            return null;
        }
        return m_arr[e.y - 1][e.x];
    }

    function get_right (e) {
        if (g_cnt_x - 1 === e.x || 0 === m_arr[e.y][e.x + 1].is) {
            return null;
        }
        return m_arr[e.y][e.x + 1];
    }

    function get_bottom (e) {
        if (g_cnt_y - 1 === e.y || 0 === m_arr[e.y + 1][e.x].is) {
            return null;
        }
        return m_arr[e.y + 1][e.x];
    }

    function get_left (e) {
        if (0 === e.x || 0 === m_arr[e.y][e.x - 1].is) {
            return null;
        }
        return m_arr[e.y][e.x - 1];
    }

    function isDone () {
        for (var y = 0; y < g_cnt_y; y++) {
            for (var x = 0; x < g_cnt_x; x++) {
                if (m_arr[y][x].is && !m_arr[y][x].ed)
                    return false;
            }
        }
        return true
    }

    function print_arr (arr) {
        var route = '';
        for (var i = 0; i < arr.length; i++) {
            route += (arr[i].y + ',' + arr[i].x) + ' ';

            var ele = $("#" + arr[i].id);
            ele.addClass("baca");
            newArr.push(arr[i].id);
            newArrXY.push([arr[i].y, arr[i].x]);

            if (i > 0) {
                var ele_last = $("#" + arr[i - 1].id);
                if (arr[i].x !== arr[i - 1].x) {
                    if (arr[i].x < arr[i - 1].x) {
                        ele_last.append("<img src='images/img/xImg_07.png?randomNum=20180821' class='imgXianX2'/>");
                    } else {
                        ele_last.append("<img src='images/img/xImg_07.png?randomNum=20180821' class='imgXianX'/>");
                    }
                }
                if (arr[i].y !== arr[i - 1].y) {
                    if (arr[i].y < arr[i - 1].y) {
                        ele_last.append("<img src='images/img/xImg_07.png?randomNum=20180821' class='imgXianY2'/>");
                    } else {
                        ele_last.append("<img src='images/img/xImg_07.png?randomNum=20180821' class='imgXianY'/>");
                    }
                }
            }
        }

        console.log(route);
    }

    var m_route = [];

    function find_route (now) {

        var next = null;

        next = get_top(now);
        if (next && !next.ed) {
            next.ed = 1;
            m_route.push(next);
            // print_arr(m_route);
            if (find_route(next))
                return true;
        }

        next = get_right(now);
        if (next && !next.ed) {
            next.ed = 1;
            m_route.push(next);
            // print_arr(m_route);
            if (find_route(next))
                return true;
        }

        next = get_bottom(now);
        if (next && !next.ed) {
            next.ed = 1;
            m_route.push(next);
            // print_arr(m_route);
            if (find_route(next))
                return true;
        }

        next = get_left(now);
        if (next && !next.ed) {
            next.ed = 1;
            m_route.push(next);
            // print_arr(m_route);
            if (find_route(next))
                return true;
        }


        if (isDone()) {
            console.log('Done:');
            print_arr(m_route);
            showMsg('OK', 1000);
            if(autoSubmit){
                subGameResult();
            }
            return true;
        }

        if (m_route.length === 0) {
            console.log('无解');
            showMsg('无解', 1000);
            return false;
        }


        var last = m_route.pop();
        last.ed = 0;


        /*setTimeout(function () {
            find_route(next, route);
        }, 200);*/
    }

    g_start.ed = 1;
    m_route.push(g_start);
    console.log('find_route:', find_route(g_start));

}

// restLine();

(function () {
    var appendHtml = '<button id="append-content-btn" style="position: fixed;right: 0;width: 50px;height: 30px;z-index:99999999;text-align: center;background-color: white" onclick="autoSolve(1)">提交</button>' +
        '<button id="append-content-btn" style="position: fixed;right: 50px;width: 50px;height: 30px;z-index:99999999;text-align: center;background-color: white" onclick="autoSolve()">解答</button>';
    $('body').prepend(appendHtml);
    console.log('[浦发助手] Injected !')
})();