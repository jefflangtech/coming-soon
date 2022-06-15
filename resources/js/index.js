const launchDateElem = document.querySelector('#launch-date')
const daysElem = document.querySelector('#days')
const hoursElem = document.querySelector('#hours')
const minElem = document.querySelector('#min')
const secElem = document.querySelector('#sec')
const dateNow = Date.now()

const getLaunchDate = function(now) {
  const launchDate = new Date()
  return launchDate.setTime(now + (1000 * 60 * 60 * 24 * 30))
}

const setDateHtml = function(element, date) {
  const options = { day: 'numeric', year: 'numeric', month: 'short' }
  const dateArray = new Intl.DateTimeFormat('default', options).formatToParts(date)

  const dt = {}
  dateArray.forEach(element => {
    if (element.type === 'day') {
      dt.day = element.value
    } else if (element.type === 'month') {
      dt.month = element.value
    } else if (element.type === 'year') {
      dt.year = element.value
    }
  })

  element.innerHTML = `${dt.day} ${dt.month} ${dt.year}`
}

const getSecondsToLaunch = function(dateNow, launchDate) {
  const options = { day: 'numeric', year: 'numeric', month: 'numeric' }
  const dateArray = new Intl.DateTimeFormat('default', options).formatToParts(launchDate)

  const dt = {}
  dateArray.forEach(element => {
    if (element.type === 'day') {
      dt.day = element.value
    } else if (element.type === 'month') {
      dt.month = element.value
    } else if (element.type === 'year') {
      dt.year = element.value
    }
  })

  const midnightDate = new Date(Date.UTC(dt.year, dt.month - 1, dt.day, 0 + 7, 0, 0))
  return Math.floor((midnightDate - dateNow) / 1000)
}

const formatTwoDigits = function(num) {
  if(num < 10) {
    return `0${num}`
  }
  return `${num}`
}

const setTimerHtml = function(seconds, daysElem, hoursElem, minElem, secElem) {
  const days = Math.floor(seconds / (60 * 60 * 24))
  daysElem.innerHTML = formatTwoDigits(days)
  const hours = Math.floor((seconds - (days * 24 * 60 * 60)) / (60 * 60))
  hoursElem.innerHTML = formatTwoDigits(hours)
  const min = Math.floor((seconds - (days * 24 * 60 * 60) - (hours * 60 * 60)) / 60)
  minElem.innerHTML = formatTwoDigits(min)
  const sec = seconds - (days * 24 * 60 * 60) - (hours * 60 * 60) - (min * 60)
  secElem.innerHTML = formatTwoDigits(sec)
}

const launchDate = getLaunchDate(dateNow)
let seconds = getSecondsToLaunch(dateNow, launchDate)
setDateHtml(launchDateElem, launchDate)
setTimerHtml(seconds, daysElem, hoursElem, minElem, secElem)

const intervalID = setInterval(function() {
  seconds -= 1
  if(seconds === 0) {
    clearInterval(intervalID)
  }
  setTimerHtml(seconds, daysElem, hoursElem, minElem, secElem)
}, 1000, seconds)