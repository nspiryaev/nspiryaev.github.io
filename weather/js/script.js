window.addEventListener('DOMContentLoaded', function () {

  /*  // Мобильное меню
   const burger = document.querySelector('.burger'),
     search = document.querySelector('.search');
 
   burger.addEventListener('click', function () {
     burger.classList.toggle('burger_active');
     search.classList.toggle('search_active');
   }); */


  // Определяем какой сегодня день недели
  function getDaysNumber(dateTime) {
    let date = new Date(dateTime),
      arrayDaysWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'],
      days = date.getDay();

    return arrayDaysWeek[days];
  }

  // Определяем дату и месяц
  function getDate(dateTime) {
    let arrayManth = ['Jan', 'Feb', 'Mar', 'Apr', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      date = new Date(dateTime),
      day = date.getDate(),
      month = date.getMonth();

    return `${day} ${arrayManth[month]}`;
  }

  // Добавляем нолик к одной цифре часов
  function addLeadingZero(num) {
    return (num < 10) ? '0' + num : '' + num;
  }

  // Вычленяем часы 
  function getHoursString(dateTime) {
    let date = new Date(dateTime),
      hours = addLeadingZero(date.getHours());

    return hours;
  }

  // Переводим фарингейты в градусы целсия
  function farengeitToCelsium(value) {
    return Math.round(value - 273) + '&deg;';
  }

  // Вычисляем время с подходящим часовы поясом
  function timezone(arrayPath) {
    return arrayPath.dt * 1000 - 10800000
  }

  // Получаем информацию о геоданных пользователя
  window.onload = function () {
    const geoArrayOfUser = ymaps.geolocation;
    let lat = geoArrayOfUser.latitude,
      lon = geoArrayOfUser.longitude;


    // Работа с openweathermap.org по API
    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=1060aee6bf7447ed7b414bc4030c7fc9`)
      .then(function (resp) { return resp.json() })
      .then(function (data) {

        // Подстановка информации в hero top
        document.querySelector('.main-content__city').textContent = data.city.name;
        document.querySelector('.main-content__degrees').innerHTML = Math.round(data.list[0].main.temp - 273) + '&deg;'
        document.querySelector('.main-content__type-weather').textContent = data.list[0].weather[0].description;

        // Подстановка информации в hero main
        let byTimeDataContainer = document.querySelector('.by-time'),
          forecasts = '';

        for (let i = 0; i < 6; i++) {
          let item = data.list[i],
            degress = farengeitToCelsium(item.main.temp),
            icon = item.weather[0].icon,
            hours = (i == 0) ? 'Now' : getHoursString(timezone(item)),
            template = `
            <li class="by-time__item">
              <div class="by-time__hour">
                ${hours}
              </div>
              <div class="by-time__icon icon__${icon}"></div>
              <div class="by-time__degress">
                ${degress}
              </div>
            </li>`;

          forecasts += template;
        }
        byTimeDataContainer.innerHTML = forecasts;

        // Подстановка информации в hero footer
        document.querySelector('.feels-like').innerHTML = farengeitToCelsium(data.list[0].main.feels_like);
        document.querySelector('.pressure').textContent = data.list[0].main.pressure + ' mm Hg';
        document.querySelector('.humidity').textContent = data.list[0].main.humidity + ' %';
        document.querySelector('.wind').textContent = data.list[0].wind.speed + ' m/s';

        // Подстановка информации в days
        let weatherListDataContainer = document.querySelector('.weather-list'),
          dailyForecast = '';

        for (let i = 0; i < data.list.length; i += 8) {
          let item = data.list[i],
            icon = item.weather[0].icon,
            dayWeek = getDaysNumber(timezone(item)),
            date = getDate(timezone(item)),
            degress = farengeitToCelsium(item.main.temp),
            feelsLike = farengeitToCelsium(item.main.feels_like),
            typeWeather = item.weather[0].description;

          let template = `
            <li class="weather-list__item">
              <div class="weather-list__weeks-day">
              ${dayWeek}
              </div>
              <div class="weather-list__date">
              ${date}
              </div>
              <div class="weather-list__icon icon__${icon}"></div>
              <div class="weather-list__degress">
              ${degress}
              </div>
              <div class="weather-list__feel-like">
              ${feelsLike}
              </div>
              <div class="weather-list__type-weather">
              ${typeWeather}
              </div>
          </li>`
          dailyForecast += template;
        }
        weatherListDataContainer.innerHTML = dailyForecast;

        // Красим субботу и воскресение в красный цвет
        let weathetListItem = document.querySelectorAll('.weather-list__item .weather-list__weeks-day');
        weathetListItem.forEach(function (item) {
          item.classList.remove('red');
          if (item.innerHTML.trim() === 'Sun' || item.innerHTML.trim() === 'Sat') {
            item.classList.add('red');
          }
        });

        // Подстановка названия города в футер сайта
        document.querySelector('.footer__description span').textContent = data.city.name;

      })
      .catch(function () {
        // catch any errors
      });
  }
});


