const ALERT_SHOW_TIME = 5000;
const isEscapeKey = (evt) => evt.key === 'Escape';

const showDataErrorMessage = () => {
  const message = document.querySelector('#data-error').content.querySelector('.data-error').cloneNode(true);
  document.body.append(message);
  setTimeout(() => {
    message.remove();
  }, ALERT_SHOW_TIME);
};

export { isEscapeKey, showDataErrorMessage };
