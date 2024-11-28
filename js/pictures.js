import { openFullPhoto } from './full-pictures.js';

const containerElement = document.querySelector('.pictures');
const pictureTemplateElement = document.querySelector('#picture').content.querySelector('.picture');

const renderPhoto = (picture) => {
  const {url, description, likes, comments} = picture;
  const pictureElement = pictureTemplateElement.cloneNode(true);

  pictureElement.querySelector('.picture__img').src = url;
  pictureElement.querySelector('.picture__img').alt = description;
  pictureElement.querySelector('.picture__likes').textContent = likes;
  pictureElement.querySelector('.picture__comments').textContent = comments.length;

  pictureElement.addEventListener('click', (evt) => {
    evt.preventDefault();
    openFullPhoto(picture);
  });

  return pictureElement;
};

const clearPicturesContainer = () => {
  if (containerElement.querySelectorAll('a.picture')) {
    containerElement.querySelectorAll('a.picture').forEach((item) => item.remove());
  }
};

const renderPhotos = (photos) => {
  clearPicturesContainer();
  const fragment = document.createDocumentFragment();
  photos.forEach((photo) => {
    fragment.appendChild(renderPhoto(photo));
  });

  containerElement.appendChild(fragment);
};

export { renderPhotos };

