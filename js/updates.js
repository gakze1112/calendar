function addOrdinalIndicator(date) {
    // Ordinal Numbers 規則
    // 尾數為 1，填 -st
    // 尾數為 2，填 -nd
    // 尾數為 3，填 -rd
    // 尾數為 0,4,5,6,7,8,9，填 -th
    // 例外狀況 : 11,12,13

    let str = "";
    switch (date) {
        case 1:
        case 21:
        case 31:
            str = "st";
            break;
        case 2:
        case 22:
            str = "nd";
            break;
        case 3:
        case 23:
            str = "rd";
            break;
        default:
            str = "th";
    }

    return `${date}<sup>${str}</sup>`;
}

function convert2Weekday(day) {
    const weeks = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return weeks[day];
}

function convert2MonthName(month) {
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
    return months[month];
}

function updateData() {
    document.getElementById("background-year").innerHTML = thisYear;
    document.getElementById("cur-year").innerHTML = thisYear;
    document.getElementById("cur-month").innerHTML = convert2MonthName(thisMonth);
    document.getElementById("cur-day").innerHTML = convert2Weekday(thisDay);
    document.getElementById("cur-date").innerHTML = addOrdinalIndicator(thisDate);

    fillInMonth(thisYear,thisMonth);
}

function fillInMonth(thisYear,thisMonth){
    // 更新月曆-年、月
    // P.S. document.getElementsByClassName 會抓到一組陣列，必須從陣列中取得要改變的元素。
    document.getElementsByClassName("cal-month")[0].innerHTML = convert2MonthName(thisMonth);
    document.getElementById("cal-year").innerHTML = thisYear;

    let monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if ((thisYear % 4 === 0 && thisYear % 100 !== 0) || thisYear % 400 === 0) monthDays[1] = 29;

    // 表格的 index 起點: 當月1號的星期幾 (day)firstDayOfThisMonth.getDay();
    // 迴圈的圈數 : 當月1號的星期幾 + 當月的總天數
    let calendar = document.getElementsByTagName("td"); // 資料型態 : array-like object
    const firstDateOfThisMonth = new Date(thisYear, thisMonth, 1);
    let weekday = firstDateOfThisMonth.getDay();
    for (let i = weekday, d = 1; i < weekday + monthDays[thisMonth]; i++, d++) {
        calendar[i].innerHTML = d;

        let uid = getUID(thisYear,thisMonth,d);
        calendar[i].setAttribute("data-uid",uid);
        appendSpriteToCellAndTooltip(uid,calendar[i]);
    }

    // 移除月曆表格的背景顏色
    for(let i=0; i<calendar.length; i++){
        if(calendar[i].classList.contains("color")) calendar[i].classList.remove("color");
    }
    
    // 填入上個月日期
    let lastMonthWeekday = weekday - 1 >= 0 ? weekday - 1 : 6;
    let lastMonth = thisMonth - 1 >= 0 ? thisMonth - 1 : 11;
    for (let i = lastMonthWeekday, d = monthDays[lastMonth]; i >= 0; i--, d--) {
        calendar[i].innerHTML = d;
        calendar[i].classList.add("color");
        calendar[i].classList.remove("prev-month-last-day");

        let uid = getUID(thisYear,thisMonth-1,d);
        calendar[i].setAttribute("data-uid",uid);
        appendSpriteToCellAndTooltip(uid,calendar[i]);
    }
    if(weekday > 0) calendar[weekday - 1].classList.add("prev-month-last-day");

    // 填入下個月日期
    let nextMonthWeekday = weekday + monthDays[thisMonth];
    for (let i = nextMonthWeekday, d = 1; i < calendar.length; i++, d++) {
        calendar[i].innerHTML = d;
        calendar[i].classList.add("color");

        let uid = getUID(thisYear,thisMonth+1,d);
        calendar[i].setAttribute("data-uid", uid);
        appendSpriteToCellAndTooltip(uid,calendar[i]);
    }

    // 處理今日元素表格的顯著背景設定

    // 清除 current-id 
    if(document.getElementById("current-day")) document.getElementById("current-day").removeAttribute("id");

    // 日期是 "今天" 才標示 current-id
    const today = new Date();
    if(thisYear === today.getFullYear() && thisMonth === today.getMonth())
        calendar[weekday + thisDate - 1].setAttribute("id","current-day");

    // 月曆的每一格的 onclick 事件
    for(let i=0; i<calendar.length; i++){
        calendar[i].setAttribute("onclick","dayClicked(this);");
    }

    changeColor();
}

function previousMonth(){
    thisMonth--;
    if(thisMonth < 0){
        thisMonth = 11;
        thisYear--;
    }
    fillInMonth(thisYear,thisMonth);
}

function nextMonth(){
    thisMonth++;
    if(thisMonth > 11){
        thisMonth = 0;
        thisYear++;
    }
    fillInMonth(thisYear,thisMonth);
}

// 方向鍵-左右，控制月份切換
document.onkeydown = function(e) {
    switch(e.key){
        case "ArrowLeft": previousMonth(); break;
        case "ArrowRight": nextMonth(); break;
    }
};