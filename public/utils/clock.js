import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
//Updating Clock Element
const dateElement = document.querySelector('.js-date-info');
const clockElement = document.querySelector('.js-time-info');

export function updateClock() {
  const currentDate = dayjs().format('MMMM D, YYYY');
  const currentTime = dayjs().format('hh:mm:ss A');

  dateElement.innerText = currentDate;
  clockElement.innerText = currentTime;
}
