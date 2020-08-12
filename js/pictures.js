'use strict';

const COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
]
const DESCRIPTIONS = [
  'Тестим новую камеру!',
  'Затусили с друзьями на море',
  'Как же круто тут кормят',
  'Отдыхаем...',
  'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
  'Вот это тачка!'
]

const photoData = {
  count: 25,
  likesMax: 200,
  likesMin: 15,
  comments: COMMENTS,
  descriptions: DESCRIPTIONS
};

function getRandom(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateData() {
  const data = [];

  for (let i = 1; i < photoData.count; i++) {
    data.push({
      url: `photos/${i}.jpg`,
      likes: getRandom(photoData.likesMin, photoData.likesMax),
      comments: getRandom(1, 2) === 1 ? [COMMENTS[getRandom(0, COMMENTS.length - 1)]]
        : [COMMENTS[getRandom(0, COMMENTS.length - 1)], COMMENTS[getRandom(1, COMMENTS.length - 1)]],
      description: DESCRIPTIONS[getRandom(0, DESCRIPTIONS.length - 1)]
    })
  }

  return data
}

const data = generateData();

function renderPhotoCard({ url, likes, comments }) {
  const template = document.querySelector('#picture').content.querySelector('.picture__link');
  const element = template.cloneNode(true);

  element.querySelector('.picture__img').src = url;
  element.querySelector('.picture__stat--comments').textContent = comments.length;
  element.querySelector('.picture__stat--likes').textContent = likes;

  return element
}

function renderPhotoCards(arr) {
  const pictures = document.querySelector('.pictures');
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < arr.length; i++) {
    fragment.appendChild(renderPhotoCard(data[i]));
  }

  pictures.appendChild(fragment);
}

function renderBigPicture({ url, likes, comments }) {
  const bigPicture = document.querySelector('.big-picture');
  bigPicture.classList.remove('hidden');
  const fragment = document.createDocumentFragment();
  const socialCommentsList = document.querySelector('.social__comments');

  bigPicture.querySelector('.big-picture__img img').src = url;
  bigPicture.querySelector('.likes-count').textContent = likes;
  bigPicture.querySelector('.comments-count').textContent = comments.length;

  for (let i = 0; i < comments.length; i++) {
    const element = document.querySelector('.social__comment').cloneNode();
    const userPic = document.querySelector('.social__picture').cloneNode(true);
    const textElem = document.createTextNode(comments[i]);

    userPic.src = `img/avatar-${getRandom(1, 6)}.svg`;
    element.appendChild(userPic);
    element.appendChild(textElem);
    fragment.appendChild(element);
  }

  while (socialCommentsList.firstChild) {
    socialCommentsList.removeChild(socialCommentsList.firstChild);
  }

  document.querySelector('.social__comment-count').classList.add('visually-hidden');
  document.querySelector('.social__comment-loadmore').classList.add('visually-hidden');

  socialCommentsList.appendChild(fragment);
}

renderPhotoCards(data)
renderBigPicture(data[0])

