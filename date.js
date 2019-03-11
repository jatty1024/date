function removeDate(obj){
    var ID = $(obj).parent().siblings('[data="myDate"]').attr('id'),
        __date = $(obj).parent().attr('data');
    $(obj).parent().remove();
    $('#mDate_'+ ID).find('[data-day="'+ __date +'"]').removeClass('active');
    event.stopPropagation();
}
function CJDate(obj) {
    var D = new Date(),
        Y = D.getFullYear(),
        M = (D.getMonth() + 1) < 10 ? '0' + (D.getMonth() + 1) : (D.getMonth() + 1),
        ID= obj.find('input[data="myDate"]').attr('id');
    obj.addClass('clicked');
    if($('#mDate_'+ ID).length){
        $('#mDate_'+ ID).show();
    }else{
        CJGetdate(Y, M,obj); 
    }
    $(document).bind("click",function(e){
        var target = $(e.target);
        if(target.closest('#mDate_'+ ID).length == 0 && target.closest(obj).length == 0){
            $('#mDate_'+ ID).hide();
            obj.removeClass('clicked');
        }
    })
}

function CJGetdate(Y, M, obj) {
    var X = obj.get(0).offsetLeft,
        T = obj.get(0).offsetTop + obj.height(),
        ID = obj.find('input[data="myDate"]').attr('id'),
        M2 = ((parseFloat(M) + 1) > 12) ? '01' : (parseFloat(M) + 1) < 10 ? '0' + (parseFloat(M) + 1) : (parseFloat(M) + 1),
        Y2 = (parseFloat(M2) == 1) ? (Y + 1) : Y,
        Box = $('<div id="mDate_'+ ID +'" class="dateBox" style="position:absolute; left:'+ X +'px; top:'+ T +'px;">' +
            '<div class="date__body">' +
                '<div class="date__content is-left">' +
                    '<div class="date__header">' +
                        '<button type="button" class="icon-d-arrow-left J-prevYear">&laquo;</button>' +
                        '<button type="button" class="icon-arrow-left J-prevMonth">&lsaquo;</button>' +
                        '<div></div>' +
                    '</div>' +
                    '<div class="date-table">' +
                        '<ul class="week">' +
                            '<li>日</li>' +
                            '<li>一</li>' +
                            '<li>二</li>' +
                            '<li>三</li>' +
                            '<li>四</li>' +
                            '<li>五</li>' +
                            '<li>六</li>' +
                        '</ul>' +
                        '<ul class="date">' +

                        '</ul>' +
                    '</div>' +
                '</div>' +
                '<div class="date__content is-right">' +
                    '<div class="date__header">' +
                        '<button type="button" class="icon-d-arrow-right J-nextYear">&raquo;</button>' +
                        '<button type="button" class="icon-arrow-right J-nextMonth">&rsaquo;</button>' +
                        '<div></div>' +
                    '</div>' +
                    '<div class="date-table">' +
                        '<ul class="week">' +
                            '<li>日</li>' +
                            '<li>一</li>' +
                            '<li>二</li>' +
                            '<li>三</li>' +
                            '<li>四</li>' +
                            '<li>五</li>' +
                            '<li>六</li>' +
                        '</ul>' +
                        '<ul class="date">' +
                            
                        '</ul>' +
                    '</div>' +
                '</div>' +
            '</div>' +
            '<div class="date__footer">' +
                '<a class="btn date-reset">清空</a>' +
                '<button type="button" class="btn date-submit">确定</button>' +
            '</div>');
    CJDatedata(Box.find('.is-left'),Y,M);
    CJDatedata(Box.find('.is-right'),Y2,M2);
    obj.after(Box);

    Box.on('click','.J-prevYear',function(){
        var Year  = parseInt($(this).siblings('div').attr('data-Year')),
            prevYear = Year - 1;
        CJDatedata(Box.find('.is-left'),prevYear, M);
        CJDatedata(Box.find('.is-right'),prevYear, M2);
    }).on('click','.J-prevMonth',function(){
        var Month = parseInt($(this).siblings('div').attr('data-Month')),
            Year  = parseInt($(this).siblings('div').attr('data-Year')),
            prevMonth = ((Month - 1) == 0) ? 12 : ((Month - 1) < 10) ? '0'+ (Month - 1) : (Month - 1),
            prevYear  = (parseFloat(prevMonth) == 12) ? (Year - 1) : Year,
            prevMonth2 = (Month < 10) ? '0' + Month : Month,
            prevYear2  = Year;
            CJDatedata(Box.find('.is-left'),prevYear,prevMonth);
            CJDatedata(Box.find('.is-right'),prevYear2,prevMonth2);
    }).on('click','.J-nextYear',function(){
        var Year  = parseInt($(this).siblings('div').attr('data-Year')),
            nextYear = Year + 1;
        CJDatedata(Box.find('.is-left'),nextYear, M);
        CJDatedata(Box.find('.is-right'),nextYear, M2);
    }).on('click','.J-nextMonth',function(){
        var Month = parseInt($(this).siblings('div').attr('data-Month')),
            Year  = parseInt($(this).siblings('div').attr('data-Year')),
            nextMonth = ((Month + 1) > 12) ? '01' : (Month + 1) < 10 ? '0' + (Month + 1) : (Month + 1),  //判断下个月的月份,如果当月是12月份的话,那么下个月就是01月
            nextYear  = (parseFloat(nextMonth) == 1) ? (Year + 1) : Year,
            nextMonth2 = (Month < 10) ? '0' + Month : Month,
            nextYear2 = Year;
            CJDatedata(Box.find('.is-left'),nextYear2,nextMonth2);
            CJDatedata(Box.find('.is-right'),nextYear,nextMonth);
    }).on('click','.date li',function(){
        var selectDate = $(this).attr('data-day');
        Box.find('[data-day="'+ selectDate +'"]').removeClass('active');
        $(this).toggleClass('active');
    }).on('click','.date-reset',function(){
        Box.find('.date li').removeClass('active');
        obj.find('input[data="myDate"]').nextAll().remove();
        obj.find('input[data="myDate"]').val('');
    }).on('click','.date-submit',function(){
        var data = [],
            str = '';
        obj.find('input[data="myDate"]').nextAll().remove();
        obj.find('input[data="myDate"]').val('');
        Box.find('.date li.active').each(function () {
            data.push($(this).attr('data-day'));
        })
        for (var i = 0; i < data.length; i++) {
            str += '<span data="'+ data[i] +'">' + data[i] + '<i onclick="removeDate(this)">&times;</i></span>';
        }
        obj.append(str);
        obj.find('input[data="myDate"]').val(data.join(','));
        obj.removeClass('clicked');
        Box.hide();
    });
}

function CJDatedata(Box,Y,M){
    var T = new Date(Y, M, 0),
        N = T.getDate(),
        F = Y + '-' + M + '-01',
        Z = CJGetweek(new Date(F)),
        M = parseFloat(M),
        K = CJGetweekNum(Z),    //判断第一天是星期几,获取前面插入的天数
        S = '',
        E = '';
    Box.find('.date').empty();
    //插入上个月的日期
    for (var i = K; i > 0; i--) {
        var prevDate = new Date(dateAdd(F, -i));
        //判断今天
        if (dateAdd(F, -i) == GetDateStr(1)) {
            //判断插入的最后一天是否是今天,并且今天的日期不可选,加上gray
            S += '<li class="available today" data-day="' + dateAdd(F, -i) + '">' + prevDate.getDate() + '</li>';
        } else if (dateAdd(F, -i) < GetDateStr(2)) {
            //判断插入的最后一天,如果是则加上月份,否则就不加月份,并且今天以前的日期不可选,加上gray
            S += '<li class="prev-month" data-day="' + dateAdd(F, -i) + '">' + prevDate.getDate() + '</li>';
        } else {
            //判断插入的最后一天,如果是则加上月份,否则就不加月份
            S += '<li class="prev-month" data-day="' + dateAdd(F, -i) + '">' + prevDate.getDate() + '</li>';
        }
    }
    //当前月的日期
    for (var i = 1; i < N + 1; i++) {
        i = (i < 10) ? '0' + i : i;//当 i 小于10的时候在他前面加0;
        if (dateAdd(F, i) == GetDateStr(1)) {
            //判断第一天是否是今天,如果是则加上月份,否则就不加月份,并且今天的日期不可选,加上gray
            S += '<li class="available today" data-day="' + dateAdd(F, (i - 1)) + '">' + i + '</li>';
        } else if (dateAdd(F, i) < GetDateStr(2)) {
            //判断第一天是否是今天,如果是则加上月份,否则就不加月份,并且今天以前的日期不可选,加上gray
            S += '<li class="available" data-day="' + dateAdd(F, (i - 1)) + '">' + i + '</li>';
        } else {
            S += '<li class="available" data-day="' + dateAdd(F, (i - 1)) + '">' + i + '</li>';
        }
    }
    Box.find('.date').append(S);
    //插入下个月的日期
    for (var i = 1; i < (42 - (N + K) + 1); i++) {
        i = (i < 10) ? '0' + i : i;//当 i 小于10的时候在他前面加0;
        E += '<li class="next-month" data-day="' + dateAdd(F, (N + (i - 1))) + '">' + i + '</li>';
    }
    Box.find('.date').append(E);
    Box.find('.date__header div').text(Y +'年'+ M +'月');
    Box.find('.date__header div').attr({'data-Year':Y,'data-Month':M});
}

function GetDateStr(AddDayCount) {
    var dd = new Date();
    dd.setDate(dd.getDate() + AddDayCount);//获取AddDayCount天后的日期 
    var y = dd.getFullYear();
    var m = (dd.getMonth() + 1) < 10 ? "0" + (dd.getMonth() + 1) : (dd.getMonth() + 1);//获取当前月份的日期，不足10补0
    var d = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate(); //获取当前几号，不足10补0
    return y + "-" + m + "-" + d;
}

function dateAdd(dd, n) {
    var strs = new Array();
    strs = dd.split("-");
    var y = strs[0];
    var m = strs[1];
    var d = strs[2];
    var t = new Date(y, m - 1, d);
    var str = t.getTime() + n * (1000 * 60 * 60 * 24);
    var newdate = new Date();
    newdate.setTime(str);
    var strYear = newdate.getFullYear();
    var strDay = newdate.getDate();
    if (strDay < 10) {
        strDay = "0" + strDay;
    }
    var strMonth = newdate.getMonth() + 1;
    if (strMonth < 10) {
        strMonth = "0" + strMonth;
    }
    var strdate = strYear + "-" + strMonth + "-" + strDay;
    return strdate;
}

function CJGetweek(date) {
    var weekDay = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
    return weekDay[date.getDay()];
}

function CJGetweekNum(Z) {
    var N;
    if (Z == '周日') {
        N = 0;
    } else if (Z == '周一') {
        N = 1;
    } else if (Z == '周二') {
        N = 2;
    } else if (Z == '周三') {
        N = 3;
    } else if (Z == '周四') {
        N = 4;
    } else if (Z == '周五') {
        N = 5;
    } else if (Z == '周六') {
        N = 6;
    }
    return N;
}
