const time = document.querySelector('.time'),
    currentDate = document.querySelector('.date'),
    greeting = document.querySelector('.greeting'),
    name = document.querySelector('.name'),
    focus = document.querySelector('.focus'),
    btn = document.querySelector('.btn-bg'),
    btn1 = document.querySelector('.btn1-bg'),
    blockquote = document.querySelector('blockquote'),
    figcaption = document.querySelector('figcaption'),
    weatherIcon = document.querySelector('.weather-icon'),
    temperature = document.querySelector('.temperature'),
    weatherDescription = document.querySelector('.weather-description'),
    windSpeed = document.querySelector('.wind-speed'),
    humidity = document.querySelector('.humidity'),
    city = document.querySelector('.city');


let ind2 = Math.trunc(Math.random() * 6)
let night = ['0.jpg', '1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg']
let morning = ['6.jpg', '7.jpg', '8.jpg', '9.jpg', '10.jpg', '11.jpg']
let afternoon = ['12.jpg', '13.jpg', '14.jpg', '15.jpg', '16.jpg', '17.jpg']
let evening = ['18.jpg', '19.jpg', '20.jpg', '21.jpg', '22.jpg', '23.jpg']

let imgArr = ['0.jpg', '1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.jpg',
    '8.jpg', '9.jpg', '10.jpg', '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg',
    '16.jpg', '17.jpg', '18.jpg', '19.jpg', '20.jpg', '21.jpg', '22.jpg', '23.jpg'
]
let morningImg = parseInt(imgArr.find(i => i == morning[ind2]), 10)
let nightImg = parseInt(imgArr.find(i => i == night[ind2]), 10)
let afternoonImg = parseInt(imgArr.find(i => i == afternoon[ind2]), 10)
let eveningImg = parseInt(imgArr.find(i => i == evening[ind2]), 10)


const showTime = () => {

    let date = new Date()
    let hour = date.getHours()
    let min = date.getMinutes()
    let sec = date.getSeconds()

    time.innerHTML = `${addZero(hour)}<span>:</span>${addZero(min)}<span>:</span>${addZero(sec)}`
    setTimeout(showTime, 1000)
}


const showDate = () => {

    let date = new Date()
    let months = [
        'January', 'February', 'March',
        'April', 'May', 'June', 'July',
        'August', 'September', 'October',
        'November', 'December'
    ];
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    let dateS = date.getDate()

    let day = date.getDay()


    let month = date.getMonth()

    currentDate.innerHTML = `${days[day]}, ${dateS} of ${months[month]}`


}

const addZero = (value) => parseInt(value, 10) < 10 ? '0' + value : value


function everyHourBg() {

    let date = new Date();
    let sec = date.getSeconds();
    let min = date.getMinutes();
    let hour = date.getHours()

    if (min == '00' && sec == '00') {

        if (hour < 6) {
            document.body.style.backgroundImage = `url('./assets/img/${imgArr[nightImg++]}')`;
            if (nightImg >= 24) {
                document.body.style.backgroundImage = `url('./assets/img/${imgArr[morningImg++]}')`
            }
        }

        if (hour >= 6 && hour < 12) {
            document.body.style.backgroundImage = `url('./assets/img/${imgArr[morningImg++]}')`;
            if (morningImg >= 24) {
                document.body.style.backgroundImage = `url('./assets/img/${imgArr[afternoonImg++]}')`
            }
        }

        if (hour >= 12 && hour < 18) {
            document.body.style.backgroundImage = `url('./assets/img/${imgArr[afternoonImg++]}')`;
            if (afternoonImg >= 24) {
                document.body.style.backgroundImage = `url('./assets/img/${imgArr[eveningImg++]}')`
            }
        }

        if (hour >= 18 && hour < 24) {
            document.body.style.backgroundImage = `url('./assets/img/${imgArr[eveningImg++]}')`;
            if (eveningImg >= 24) {
                document.body.style.backgroundImage = `url('./assets/img/${imgArr[nightImg++]}')`
            }
        }
    }
}
let myVar = setInterval(everyHourBg, 500);


const changeTheme = () => {

    let date = new Date()

    let hour = date.getHours()

    if (hour < 6) {
        greeting.textContent = 'Good Night! ';
        document.body.style.backgroundImage = `url('./assets/img/${night[ind2]}')`;
    } else if (hour >= 6 && hour < 12) {
        greeting.textContent = 'Good Morning! ';
        document.body.style.backgroundImage = `url('./assets/img/${morning[ind2]}')`;
    } else if (hour >= 12 && hour < 18) {
        greeting.textContent = 'Good Afternoon! ';
        document.body.style.backgroundImage = `url('./assets/img/${afternoon[ind2]}')`;
        document.body.style.color = 'white'
    } else if (hour >= 18 && hour < 24) {
        document.body.style.backgroundImage = `url('./assets/img/${evening[ind2]}')`;
        greeting.textContent = 'Good Evening! ';
    }

}

const changeBg = () => {
    let date = new Date()

    let hour = date.getHours()

    nightImg === 23 ? nightImg = 0 : nightImg = nightImg
    morningImg === 23 ? morningImg = 0 : morningImg = morningImg
    afternoonImg === 23 ? afternoonImg = 0 : afternoonImg = afternoonImg
    eveningImg === 23 ? eveningImg = 0 : eveningImg = eveningImg

    if (hour < 6) {
        document.body.style.backgroundImage = `url('./assets/img/${imgArr[++nightImg]}')`
    }
    if (hour >= 6 && hour < 12) {
        document.body.style.backgroundImage = `url('./assets/img/${imgArr[++morningImg]}')`
    }
    if (hour >= 12 && hour < 18) {
        document.body.style.backgroundImage = `url('./assets/img/${imgArr[++afternoonImg]}')`
    }
    if (hour >= 18 && hour < 24) {
        document.body.style.backgroundImage = `url('./assets/img/${imgArr[++eveningImg]}')`
    }
}


async function getQuote() {
    const url = `https://cors-anywhere.herokuapp.com/https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en`;
    const res = await fetch(url);
    const data = await res.json();
    blockquote.textContent = data.quoteText;
    figcaption.innerHTML = `<strong>${data.quoteAuthor}</strong>`;
}


async function getWeather() {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${getCity()}&lang=en&appid=f352d83c850e252425007f179758a562&units=metric`;
    const res = await fetch(url);
    const data = await res.json();
    if (data.message === 'city not found') {

        weatherIcon.style.display = 'none';
        city.innerText = 'Incorrect city'
        humidity.innerText = windSpeed.innerText = temperature.textContent = weatherDescription.textContent = "incorrect data"
        localStorage.setItem('city', 'Sydney')

    }
    weatherIcon.style.display = 'block'
    weatherIcon.className = 'weather-icon owf';
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);

    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    weatherDescription.textContent = data.weather[0].description;

    humidity.innerText = `${data.main.humidity}%`
    windSpeed.innerText = `${data.wind.speed} m/s`

}

function setCity(e) {
    if (e.type === 'keypress') {
        if (e.which == 13 || e.keyCode == 13) {
            localStorage.setItem('city', e.target.innerText);
            getWeather()
            city.blur()

        }
    } else if (city.innerText == '') {
        city.innerText = getCity()


    } else {
        localStorage.setItem('city', e.target.innerText);
        getWeather()
    }

}


const setName = (e) => {
    if (e.type === 'keypress') {
        if (e.which == 13 || e.keyCode == 13) {
            localStorage.setItem('name', e.target.innerText);
            name.blur();
        }
    } else if (name.innerText == '') {
        name.innerText = getName()
    } else {
        localStorage.setItem('name', e.target.innerText);
    }
}

const setFocus = (e) => {
    if (e.type === 'keypress') {
        if (e.which == 13 || e.keyCode == 13) {
            localStorage.setItem('focus', e.target.innerText);
            focus.blur();
        }
    } else if (focus.innerText == '') {
        focus.innerText = getFocus()
    } else {
        localStorage.setItem('focus', e.target.innerText);
    }
}


const getName = () => localStorage.getItem('name') === null || localStorage.getItem('name') === '' ?
    name.innerText = '[Enter your name]' : name.innerText = localStorage.getItem('name')


const getFocus = () => localStorage.getItem('focus') === null || localStorage.getItem('focus') === '' ?
    focus.innerText = '[Enter your focus]' : focus.innerText = localStorage.getItem('focus')

const getCity = () => localStorage.getItem('city') === null || localStorage.getItem('city') === '' || localStorage.getItem('city') === 'Incorrect city' ?
    city.innerText = 'Sydney' : city.innerText = localStorage.getItem('city')


const clearName = () => {
    name.innerText = ''
}
const clearFocus = () => {
    focus.innerText = ''
}

const clearCity = () => {
    city.innerText = ''
}
const blockBtn = () => {
    btn.disabled = true;
    setTimeout(function() { btn.disabled = false }, 1500);
}

name.addEventListener('keypress', setName)
name.addEventListener('blur', setName)
name.addEventListener('focus', clearName)
focus.addEventListener('keypress', setFocus)
focus.addEventListener('blur', setFocus)
focus.addEventListener('focus', clearFocus)
city.addEventListener('keypress', setCity)
city.addEventListener('blur', setCity)
city.addEventListener('focus', clearCity)
btn.addEventListener('click', changeBg)
btn1.addEventListener('click', getQuote)
btn.addEventListener('click', blockBtn)
document.addEventListener('DOMContentLoaded', getWeather);
document.addEventListener('DOMContentLoaded', changeTheme);


showTime()
showDate()
changeTheme()
getName()
getFocus()
getQuote()