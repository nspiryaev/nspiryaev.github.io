let year = 2024;
let newYear = '1 Jan ' + year;
let headingYear = document.querySelector('.heading span');
let daysElement = document.querySelector('.days__numbers');
let hoursElement = document.querySelector('.hours__numbers');
let minutesElement = document.querySelector('.minutes__numbers');
let secondsElement = document.querySelector('.seconds__numbers');

const currentYear = new Date();

if (currentYear.getFullYear() >= year) {
    year++;
    headingYear.textContent = year;
}

function newYearTimer() {
    const newYearDate = new Date(newYear);
    const currentDate = new Date();
    const totalSecods = (newYearDate - currentDate) / 1000;
    const days = Math.floor(totalSecods / 3600 / 24);
    const hours = Math.floor(totalSecods / 3600) % 24;
    const minutes = Math.floor(totalSecods / 60) % 60;
    const seconds = Math.floor(totalSecods) % 60;

    daysElement.textContent = days;
    hoursElement.textContent = hours;
    minutesElement.textContent = minutes;
    secondsElement.textContent = seconds;

};

setInterval(newYearTimer, 1000);

