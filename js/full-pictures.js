import { isEscapeKey } from './util.js';

const COMMENTS_COUNT = 5;

const fullPhotoElement = document.querySelector('.big-picture');
const closeBtnElement = document.querySelector('.big-picture__cancel');
const commentsListElement = fullPhotoElement.querySelector('.social__comments');
const loadBtnElement = fullPhotoElement.querySelector('.comments-loader');

const renderComment = ({avatar, name, message}) =>
  `<li class="social__comment">
    <img
      class="social__picture"
      src="${avatar}"
      alt="${name}"
      width="35" height="35">
    <p class="social__text">${message}</p>
  </li>`;

const renderCurrentComments = (maxIndex, comments) => {
  let currentIndex = commentsListElement.children.length;
  if (maxIndex >= comments.length) {
    maxIndex = comments.length;
    loadBtnElement.classList.add('hidden');
  }
  while (currentIndex < maxIndex) {
    const comment = renderComment(comments[currentIndex]);
    commentsListElement.insertAdjacentHTML('beforeend', comment);
    currentIndex++;
  }
};

let onloadCommentsBtnClick;

const renderComments = (comments) => {
  let maxIndex = COMMENTS_COUNT;

  comments.forEach((item) => {
    const comment = renderComment(item);
    commentsListElement.insertAdjacentHTML('beforeend', comment);
  });

  onloadCommentsBtnClick = () => {
    renderCurrentComments(maxIndex, comments);
    fullPhotoElement.querySelector('.social__comment-shown-count').textContent = maxIndex > comments.length ? comments.length : maxIndex;
    maxIndex += COMMENTS_COUNT;
  };

  commentsListElement.innerHTML = '';
  loadBtnElement.classList.remove('hidden');
  onloadCommentsBtnClick();
  loadBtnElement.addEventListener('click', onloadCommentsBtnClick);
};

const renderFullPhoto = ({url, likes, comments, description}) => {
  fullPhotoElement.querySelector('img').src = url;
  fullPhotoElement.querySelector('.likes-count').textContent = likes;
  fullPhotoElement.querySelector('.social__comment-total-count').textContent = comments.length;
  fullPhotoElement.querySelector('.social__caption').textContent = description;

  renderComments(comments);

};

const closeFullPhoto = () => {
  fullPhotoElement.classList.add('hidden');

  document.body.classList.remove('modal-open');
  loadBtnElement.removeEventListener('click', onloadCommentsBtnClick);
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
