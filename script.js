let currentDateEl = $('#currentDate');
let currentDate;
let currentTime;
let calEntryEventTime;
let calEntryEventTxt;
let timeArr = [9, 10, 11, 12, 13, 14, 15, 16, 17];
let saveBtn = $('.saveBtn');
let calTimeblock;
let timerInterval;
let timeblockID = $("textarea[id*='timeblock']");


function init() {
    currentMomentDate();
    renderEvents();
    setBGColors();
};


function currentMomentDate() {
    currentDate = moment().format('dddd, LL');
    currentDateEl.text(currentDate);
};
console.log(currentDate)


function renderEvents() {
    for (let i = 0; i < timeArr.length; i++) { 
        $('[id^=timeblock-]').each(function (i, v) {
            $(v).val(localStorage.getItem(timeArr[i]));
        })
    }
};


saveBtn.on('click', saveButtonClickHandler);


function saveButtonClickHandler(event) {
    event.preventDefault();
    calEntryEventTime = $(this).attr('id').split('-')[1];
    calEntryEventTxt = $(this).siblings('textarea[name^="timeblock"]').val().trim();
    storeEvents();
};


function storeEvents() {
    localStorage.setItem(calEntryEventTime, calEntryEventTxt);
};

function setBGColors() {
    timeblockID.each(function () { 
    calTimeBlock = $(this).attr('id').split('-')[1];
    calTimeBlock = parseInt(moment(calTimeBlock, 'H').format('H'));
    currentTime = parseInt(moment().format('H'));
    
    if (currentTime < calTimeBlock) {
        $(this).removeClass('past present');
        $(this).addClass('future');
    } else if (currentTime === calTimeBlock) {
        $(this).removeClass('past future');
        $(this).addClass('present');
    } 
    else (currentTime > calTimeBlock) ;{
        $(this).removeClass('present future');
        $(this).addClass('past');
    }
    })
};

function setIntervalOnMinute() {
    var currentDateSeconds = new Date().getSeconds();
    if (currentDateSeconds == 0) {
        setInterval(currentMomentDate, 60000);
        setInterval(setBGColors, 60000);
    } else {
        setTimeout(function () {
            setIntervalOnMinute();
        }, (60 - currentDateSeconds) * 1000);
    }
    currentMomentDate();
    setBGColors();
};

setIntervalOnMinute();


init();