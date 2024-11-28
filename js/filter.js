import { renderPhotos } from './pictures.js';
import { getRandomInteger, debounce } from './util.js';

const RANDOM_PHOTOS_COUNT = 10;
const DELAY = 500;

const filterContainerElement = document.querySelector('.img-filters');
const filterElement = filterContainerElement.querySelector('.img-filters__form');

let photos = [];

const getRandomPhotos = (data) => {
  const randomPhotos = new Set();
  while (randomPhotos.size < RANDOM_PHOTOS_COUNT) {
    randomPhotos.add(data[getRandomInteger(0, data.length - 1)],);
  }
  return randomPhotos;
};

const getDiscussedPhotos = (data) => {
  const sortPhotos = data.slice().sort((first, second) => second.comments.length - first.comments.length);
  return sortPhotos;
};

const setFilter = (cb) => {
  filterElement.addEventListener('click', (evt) => {
    let newPhotos = photos.slice();
    filterElement.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
    evt.target.classList.add('img-filters__button--active');
    if (evt.target.id.includes('random')) {
      newPhotos = getRandomPhotos(photos);
    }
    if (evt.target.id.includes('discussed')) {
      newPhotos = getDiscussedPhotos(photos);
    }
    cb(newPhotos);
  });
};

const applyFilter = (data) => {
  photos = data.slice();
  filterContainerElement.classList.remove('img-filters--inactive');
  setFilter(debounce(renderPhotos, DELAY));
};

export { applyFilter };
