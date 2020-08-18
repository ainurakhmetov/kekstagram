'use strict';

(function () {
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

  function generateData() {
    const data = [];

    for (let i = 1; i < photoData.count; i++) {
      data.push({
        url: `photos/${i}.jpg`,
        likes: window.utils.getRandom(photoData.likesMin, photoData.likesMax),
        comments: window.utils.getRandom(1, 2) === 1 ? [COMMENTS[window.utils.getRandom(0, COMMENTS.length - 1)]]
          : [COMMENTS[window.utils.getRandom(0, COMMENTS.length - 1)], COMMENTS[window.utils.getRandom(1, COMMENTS.length - 1)]],
        description: DESCRIPTIONS[window.utils.getRandom(0, DESCRIPTIONS.length - 1)]
      })
    }

    return data
  }

  window.data = generateData();
})()

