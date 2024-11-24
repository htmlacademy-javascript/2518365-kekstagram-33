import { renderPhotos } from './pictures.js';
import './form.js';
import { getData } from './server.js';
import {showDataErrorMessage} from './util.js';

let photos = [];

const addPhotos = (data) => {
  photos = data.slice();
  renderPhotos(photos);
};

getData(addPhotos, showDataErrorMessage);

