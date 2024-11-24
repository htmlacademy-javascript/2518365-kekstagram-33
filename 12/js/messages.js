import { isEscapeKey } from './util';

const successMessageElement = document.querySelector('#success').content.querySelector('.success');
const errorMessageElement = document.querySelector('#error').content.querySelector('.error');


const removeMessage = () => {
  document.body.lastChild.remove();
  document.removeEventListener('keydown', onEscapeBtnKeydown);
};
function onEscapeBtnKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    removeMessage();
  }
}

const renderMessage = (element) => {
  const message = element.cloneNode(true);
  message.querySelector('button').addEventListener('click', () => {
    removeMessage();
  });

  message.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('success') || evt.target.classList.contains('error')) {
      removeMessage();
    }
  });

  document.addEventListener('keydown', onEscapeBtnKeydown);
  document.body.append(message);
};

const showErrorMessage = () => {
  renderMessage(errorMessageElement);
  document.querySelector('.img-upload__submit').disabled = false;
};

const showSuccessMessage = () => {
  renderMessage(successMessageElement);
};

export { showErrorMessage, showSuccessMessage };
