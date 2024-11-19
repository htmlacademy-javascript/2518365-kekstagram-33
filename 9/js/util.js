const getRandomInteger = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const isEscapeKey = (evt) => evt.key === 'Escape';

export { getRandomInteger, isEscapeKey };
