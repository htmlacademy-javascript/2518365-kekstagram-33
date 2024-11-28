import { renderPhotos } from './pictures.js';
import './form.js';
import { getData } from './server.js';
import { showDataErrorMessage } from './util.js';
import { applyFilter } from './filter.js';

const addPhotos = (data) => {
  renderPhotos(data);
  applyFilter(data);
};

getData(addPhotos, showDataErrorMessage);

