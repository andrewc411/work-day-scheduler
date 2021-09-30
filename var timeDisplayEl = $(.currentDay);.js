var timeDisplayEl = $('#currentDay');

function displayTime(){
    var rightNow = moment().format("[Today is] dddd");
    timeDisplayEl.text(rightNow);
}
var dayWeek = today.format("[Today is] dddd")
$("#2a").text(dayWeek);
