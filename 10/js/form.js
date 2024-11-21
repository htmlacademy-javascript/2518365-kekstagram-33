import { isEscapeKey } from './util.js';

const MAX_COMMENT_LENGTH = 140;
const MAX_HASHTAGS = 5;
const REGEXP_FOR_HASHTAGS = /^#[\wа-яё]{1,19}$/i;

const formContainerElement = document.querySelector('.img-upload__form');
const inputPhotoElement = formContainerElement.querySelector('.img-upload__input');
const formElement = formContainerElement.querySelector('.img-upload__overlay');
const closeFormBtnElement = formContainerElement.querySelector('.img-upload__cancel');

const hashtagInputElement = formContainerElement.querySelector('.text__hashtags');
const commentInputElement = formContainerElement.querySelector('.text__description');

const resetCloseByEscape = (evt) => evt.stopPropagation();
hashtagInputElement.addEventListener('keydown', resetCloseByEscape);
commentInputElement.addEventListener('keydown', resetCloseByEscape);

const closeForm = () => {
  formElement.classList.add('hidden');
  document.body.classList.remove('modal-open');

  closeFormBtnElement.removeEventListener('click', closeForm);
  document.removeEventListener('keydown', closeFormByEscape);

  formContainerElement.reset();
};

function closeFormByEscape (evt) {
  if (isEscapeKey(evt)) {
    closeForm();
  }
}

const openForm = () => {
  formElement.classList.remove('hidden');
  document.body.classList.add('modal-open');

  closeFormBtnElement.addEventListener('click', closeForm);
  document.addEventListener('keydown', closeFormByEscape);
};

inputPhotoElement.addEventListener('change', openForm);

const pristine = new Pristine(formContainerElement, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

const validateHashtag = (value) => {
  const hashtagArray = value.toLowerCase().trim().split(/\s+/);

  return !(hashtagArray.find((item) => !REGEXP_FOR_HASHTAGS.test(item))) &&
        !(hashtagArray.length > MAX_HASHTAGS) &&
        (new Set(hashtagArray).size === hashtagArray.length);
};

const getHashtagErrorMessage = () => {
  const hashtagArray = hashtagInputElement.value.toLowerCase().trim().split(/\s+/);

  if (hashtagArray.find((item) => !REGEXP_FOR_HASHTAGS.test(item))) {
    return 'Введён невалидный хэш-тег';
  }
  if (hashtagArray.length > MAX_HASHTAGS) {
    return 'Превышено количество хэш-тегов';
  }
  if (new Set(hashtagArray).size !== hashtagArray.length) {
    return 'Хэш-теги не должны повторяться';
  }
};

pristine.addValidator(hashtagInputElement, validateHashtag, getHashtagErrorMessage);

const validateComment = (value) => value.length < MAX_COMMENT_LENGTH;

pristine.addValidator(commentInputElement, validateComment, `Длина комментария больше ${MAX_COMMENT_LENGTH} символов`);

formContainerElement.addEventListener('submit', (evt) => {
  if (!pristine.validate()) {
    evt.preventDefault();
  }
});