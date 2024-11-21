import { isEscapeKey } from './util.js';
import { onEffectsListClick } from './slider.js';

const MAX_COMMENT_LENGTH = 140;
const MAX_HASHTAGS = 5;
const REGEXP_FOR_HASHTAGS = /^#[\wа-яё]{1,19}$/i;

const Zoom = {
  MIN: 25,
  MAX: 100,
  STEP: 25
};

const formContainerElement = document.querySelector('.img-upload__form');
const inputPhotoElement = formContainerElement.querySelector('.img-upload__input');
const formElement = formContainerElement.querySelector('.img-upload__overlay');
const closeFormBtnElement = formContainerElement.querySelector('.img-upload__cancel');

const hashtagInputElement = formContainerElement.querySelector('.text__hashtags');
const commentInputElement = formContainerElement.querySelector('.text__description');

const scaleInputElement = formContainerElement.querySelector('.scale__control--value');

const effectsListElement = formContainerElement.querySelector('.effects__list');
const imageElement = formContainerElement.querySelector('.img-upload__preview img');

const resetCloseByEscape = (evt) => evt.stopPropagation();

const changeScaleElement = (factor = 1) => {
  let newValue = parseInt(scaleInputElement.value, 10);
  newValue = newValue + Zoom.STEP * factor;
  if (newValue > Zoom.MAX) {
    newValue = Zoom.MAX;
  }
  if (newValue < Zoom.MIN) {
    newValue = Zoom.MIN;
  }
  scaleInputElement.value = `${newValue}%`;
  imageElement.style.transform = `scale(${newValue / 100})`;
};

const onScaleBtnClick = (evt) => {
  if(evt.target.classList.contains('scale__control--smaller')) {
    changeScaleElement(-1);
  }
  if(evt.target.classList.contains('scale__control--bigger')) {
    changeScaleElement();
  }
};

const pristine = new Pristine(formContainerElement, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

const closeForm = () => {
  formElement.classList.add('hidden');
  document.body.classList.remove('modal-open');

  closeFormBtnElement.removeEventListener('click', closeForm);
  document.removeEventListener('keydown', closeFormByEscape);
  hashtagInputElement.removeEventListener('input', resetCloseByEscape);
  commentInputElement.removeEventListener('input', resetCloseByEscape);
  effectsListElement.removeEventListener('click', onEffectsListClick);
  formContainerElement.querySelector('.img-upload__scale').removeEventListener('click', onScaleBtnClick);

  imageElement.style.removeProperty('transform');
  imageElement.style.removeProperty('filter');

  formContainerElement.reset();
  pristine.reset();
};

function closeFormByEscape (evt) {
  if (isEscapeKey(evt)) {
    closeForm();
  }
}

const openForm = () => {
  formElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.querySelector('.img-upload__effect-level').classList.add('hidden');

  closeFormBtnElement.addEventListener('click', closeForm);
  document.addEventListener('keydown', closeFormByEscape);
  hashtagInputElement.addEventListener('input', resetCloseByEscape);
  commentInputElement.addEventListener('input', resetCloseByEscape);
  effectsListElement.addEventListener('click', onEffectsListClick);
  formContainerElement.querySelector('.img-upload__scale').addEventListener('click', onScaleBtnClick);
};

inputPhotoElement.addEventListener('change', openForm);

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
