import {getRandomInteger} from './util.js';

const PHOTO_COUNT = 25;
const DESCRIPTION = [
  'красивый город',
  'голубое небо',
  'солнечный день',
  'интересная прогулка',
  'красивое платье',
  'люксовая косметика',
  'прекрасное путешествие',
  'дождливая погода',
  'дурацкий телефон',
];
const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];
const NAMES = [
  'Софья',
  'Анастасия',
  'Виктория',
  'Ксения',
  'Арина',
  'Елизавета',
  'Аделина',
  'Ирина',
  'Елена',
  'Полина',
  'Дарья',
  'Наталья',
  'Светлана',
  'Вера',
  'Надежда',
  'Галина',
  'Любовь',
  'Александра',
  'Мария',
  'Анна',
  'Ангелина',
  'Марина',
  'Екатерина',
  'Людмила',
  'Татьяна',
];


const Likes = {
  MIN: 15,
  MAX: 200
};

const Comments = {
  MIN: 0,
  MAX: 30
};

const Avatars = {
  MIN: 1,
  MAX: 6
};

const addComment = (index) => ({
  id: index,
  avatar: `img/avatar-${getRandomInteger(Avatars.MIN, Avatars.MAX)}.svg`,
  message: MESSAGES[getRandomInteger(0, MESSAGES.length - 1)],
  name: NAMES[getRandomInteger(0, NAMES.length - 1)]
});

const addComments = () => Array.from({length: getRandomInteger(Comments.MIN, Comments.MAX)}, (_,index) => addComment(index));

const addPhoto = (index) => ({
  id: index,
  url: `photos/${index + 1}.jpg`,
  description: DESCRIPTION[getRandomInteger(0, DESCRIPTION.length - 1)],
  likes: getRandomInteger(Likes.MIN, Likes.MAX),
  comments:addComments()
});

const addPhotos = () => Array.from({length: PHOTO_COUNT}, (_,index) => addPhoto(index));
const photos = addPhotos();
export {photos};
