const ALERT_SHOW_TIME = 5000;

const getRandomInteger = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const isEscapeKey = (evt) => evt.key === 'Escape';

const showDataErrorMessage = () => {
  const message = document.querySelector('#data-error').content.querySelector('.data-error').cloneNode(true);
  document.body.append(message);
  setTimeout(() => {
    message.remove();
  }, ALERT_SHOW_TIME);
};

const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export { isEscapeKey, showDataErrorMessage, getRandomInteger, debounce };
