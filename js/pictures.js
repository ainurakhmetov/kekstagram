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

const pictures = document.querySelector('.pictures');

function renderPhotoCards(arr) {
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

// --------------- module 4 ---------------

const keyCodeList = {
  ESC: 27,
  ENTER: 13
};

const uploadCancel = document.querySelector('.img-upload__cancel');
const uploadFile = document.querySelector('#upload-file');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const hashtags = document.querySelector('.text__hashtags');
const textDescription = document.querySelector('.text__description');

const filtersList = document.querySelector('.effects__list');
const uploadPreview = document.querySelector('.img-upload__preview');

document.addEventListener('keydown', onOverlayEsc)

uploadFile.addEventListener('change', function () {
  const uploadOverlay = document.querySelector('.img-upload__overlay');

  uploadOverlay.classList.remove('hidden');
})

uploadCancel.addEventListener('click', closeUploadOverlay);

document.addEventListener('.scale__value', onDepthChange);

function closeUploadOverlay() {
  uploadOverlay.classList.add('hidden');
}

function onOverlayClose() {
  uploadOverlay.classList.add('hidden');

  uploadFile.value = '';
  uploadPreview.removeAttribute('style');
  uploadPreview.removeAttribute('class');
  scaleValue.removeAttribute('value');
  uploadPreview.querySelector('img').removeAttribute('style');
  resizeValue.value = `${100}%`;
  filterNone.selected = true;

  document.removeEventListener('keydown', onOverlayEsc);
}

function onBigPictureClose() {
  bigPicture.classList.add('hidden');
}

function onOverlayEsc(e) {
  if (e.keyCode === keyCodeList.ESC && document.activeElement !== hashtags && document.activeElement !== textDescription) {
    onOverlayClose();
    uploadOverlay.classList.add('hidden');
  }
}

const bigPicture = document.querySelector('.big-picture');
const bigPictureClose = document.querySelector('.big-picture__cancel');

const effectScale = document.querySelector('.img-upload__scale');
const scaleLine = effectScale.querySelector('.scale__line');
const scalePin = scaleLine.querySelector('.scale__pin');
const scaleLevel = scaleLine.querySelector('.scale__level');
const scaleValue = document.querySelector('.scale__value');
const uploadResize = document.querySelector('.img-upload__resize');
const resizeMinus = uploadResize.querySelector('.resize__control--minus');
const resizePlus = uploadResize.querySelector('.resize__control--plus');
const resizeValue = uploadResize.querySelector('.resize__control--value');

const filterChrome = filtersList.querySelector('#effect-chrome');
const filterSepia = filtersList.querySelector('#effect-sepia');
const filterMarvin = filtersList.querySelector('#effect-marvin');
const filterPhobos = filtersList.querySelector('#effect-phobos');
const filterHeat = filtersList.querySelector('#effect-heat');
const filterNone = filtersList.querySelector('#effect-none');

const filtersClass = {
  CHROME: 'effects__preview--chrome',
  SEPIA: 'effects__preview--sepia',
  MARVIN: 'effects__preview--marvin',
  PHOBOS: 'effects__preview--phobos',
  HEAT: 'effects__preview--heat'
};

function onDepthChange() {
  function getEffectDepth() {
    return (scaleLevel.offsetWidth / scaleLine.offsetWidth).toFixed(2);
  }
  const depth = getEffectDepth();
  if (filterChrome.checked) {
    uploadPreview.style = `filter: grayscale(${depth});`;
    scaleValue.setAttribute('value', depth);
  }
  if (filterSepia.checked) {
    uploadPreview.style = `filter: sepia(${depth})`;
    scaleValue.setAttribute('value', depth);
  }
  if (filterMarvin.checked) {
    uploadPreview.style = `filter: invert(${depth * 100}%);`;
    scaleValue.setAttribute('value', depth * 100 + '%');
  }
  if (filterPhobos.checked) {
    uploadPreview.style = `filter: blur(${depth * 3}px);`;
    scaleValue.setAttribute('value', (depth * 3).toFixed(2) + 'px');
  }
  if (filterHeat.checked) {
    uploadPreview.style = `filter: brightness(${depth * 3});`;
    scaleValue.setAttribute('value', (depth * 3).toFixed(2));
  }
}

function onFilterChange(scaleIsHidden, filterClassNameAdd) {
  uploadPreview.removeAttribute('class');
  if (scaleIsHidden) {
    effectScale.classList.add('hidden');
    uploadPreview.removeAttribute('style');
    scaleValue.removeAttribute('value');
  } else {
    effectScale.classList.remove('hidden');
  }
  if (filterClassNameAdd) {
    uploadPreview.className = filterClassNameAdd;
  }
  onDepthChange();
}

filtersList.addEventListener('click', function (evt) {
  switch (evt.target) {
    case filterChrome :
      onFilterChange(false, filtersClass.CHROME);
      break;
    case filterSepia :
      onFilterChange(false, filtersClass.SEPIA);
      break;
    case filterMarvin :
      onFilterChange(false, filtersClass.MARVIN);
      break;
    case filterPhobos :
      onFilterChange(false, filtersClass.PHOBOS);
      break;
    case filterHeat :
      onFilterChange(false, filtersClass.HEAT);
      break;
    default:
      onFilterChange(true);
      break;
  }
});

scalePin.addEventListener('mouseup', onDepthChange);

function onImgResize(mode) {
  const img = uploadPreview.querySelector('img');
  const inputValue = parseInt(resizeValue.value, 10);
  const max = 100;
  const min = 25;
  const step = 25;
  if (mode === 'minus') {
    if (inputValue > min) {
      img.style.transform = `scale(0.${inputValue - step})`;
      resizeValue.value = `${inputValue - step}%`;
    }
  }
  if (mode === 'plus') {
    if (inputValue < max) {
      let currentSize = inputValue + step;
      if (currentSize > max) currentSize = max;
      img.style.transform = `scale(0.${currentSize})`;
      resizeValue.value = `${currentSize}%`;
      if (parseInt(resizeValue.value, 10) === max) {
        img.removeAttribute('style');
        resizeValue.value = `${max}%`;
      }
    }
  }
}

uploadResize.addEventListener('click', function (evt) {
  switch (evt.target) {
    case resizeMinus:
      onImgResize('minus');
      break;
    case resizePlus:
      onImgResize('plus');
      break;
  }
});

function onPictureMinClick(evt) {
  if (evt.target.parentElement.className === 'picture__link') {
    const target = evt.target;
    for (let i = 0; i < data.length; i++) {
      if (target.getAttribute('src') === data[i].url) {
        renderBigPicture(data[i]);
      }
    }
    document.addEventListener('keydown', onBigPictureClose);
    bigPictureClose.addEventListener('click', onBigPictureClose);
  }
}

pictures.addEventListener('click', onPictureMinClick);

function hashtagsValidate() {
  const tags = hashtags.value;
  let validationError = '';
  let duplicate = 0;
  if (tags) {
    const tagsArray = tags.split(' ').filter(function (el) {
      return el !== null && el !== "" && el !== undefined;
    });
    if (tagsArray.length > 0) {
      for (let i = 0; i < tagsArray.length; i++) {
        for (let j = 0; j < tagsArray.length; j++) {
          if (tagsArray[i].toLowerCase() === tagsArray[j].toLowerCase()) {
            duplicate++;
          }
        }
        if (duplicate > tagsArray.length) {
          validationError = 'Хеш-тэги не должны совпадать'
        }
        let tag = tagsArray[i].toString().replace(/ /g, "").split('');
        if (tag[0] === '#') {
          if (tag.length > 1) {
            if (tagsArray[i].split('#').length > 2) {
              validationError ='Хеш-теги должны разделяться пробелами'
            }
          }
          else if (tag.length === 1) {
            validationError = 'Хеш-тег не может состоять только из одной решётки'
          }
        }
        else {
          validationError = 'Хеш-тег должен начинается с символа #'
        }
        if (tag.length > 20) {
          validationError = 'Максимальная длина одного хэш-тега 20 символов, включая решётку'
        }
      }
      if (tagsArray.length > 5) {
        validationError = 'Нельзя указать больше пяти хэш-тегов'
      }
    }
    hashtags.setCustomValidity(validationError)
  }
}

hashtags.addEventListener('blur', hashtagsValidate);


