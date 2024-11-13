import { isEscapeKey } from './util.js';

const fullPhotoElement = document.querySelector('.big-picture');
const closeBtnElement = document.querySelector('.big-picture__cancel');
const commentsListElement = fullPhotoElement.querySelector('.social__comments');

const renderComment = ({avatar, name, message}) =>
  `<li class="social__comment">
    <img
      class="social__picture"
      src="${avatar}"
      alt="${name}"
      width="35" height="35">
    <p class="social__text">${message}</p>
  </li>`;

const renderComments = (comments) => {
  commentsListElement.innerHTML = '';

  comments.forEach((item) => {
    const comment = renderComment(item);
    commentsListElement.insertAdjacentHTML('beforeend', comment);
  });
};

const renderFullPhoto = ({url, likes, comments, description}) => {
  fullPhotoElement.querySelector('img').src = url;
  fullPhotoElement.querySelector('.likes-count').textContent = likes;
  fullPhotoElement.querySelector('.social__comment-shown-count').textContent = comments.length;
  fullPhotoElement.querySelector('.social__comment-total-count').textContent = comments.length;
  fullPhotoElement.querySelector('.social__caption').textContent = description;

  renderComments(comments);

  fullPhotoElement.querySelector('.social__comment-count').classList.add('hidden');
  fullPhotoElement.querySelector('.comments-loader').classList.add('hidden');
};

const closeFullPhoto = () => {
  fullPhotoElement.classList.add('hidden');

  document.body.classList.remove('modal-open');
  closeBtnElement.removeEventListener('click', closeFullPhoto);
  document.removeEventListener('keydown', onEscapeBtnKeydown);
};

function onEscapeBtnKeydown (evt) {
  if ((isEscapeKey(evt))) {
    evt.preventDefault();
    closeFullPhoto();
  }
}

const openFullPhoto = (photo) => {
  renderFullPhoto(photo);

  document.body.classList.add('modal-open');
  fullPhotoElement.classList.remove('hidden');
  closeBtnElement.addEventListener('click', closeFullPhoto);
  document.addEventListener('keydown', onEscapeBtnKeydown);
};


export { openFullPhoto };
