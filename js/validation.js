'use strict';

(function () {
  const hashtags = document.querySelector('.text__hashtags');
  const textDescription = document.querySelector('.text__description');
  const uploadForm = document.querySelector('.img-upload__form');
  const error = document.querySelector('.img-upload__message--error');
  const errorLinks = document.querySelectorAll('.error__link');

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

  function descriptionValidate() {
    const description = textDescription.value;
    if (description.length > 140) {
      textDescription.setCustomValidity('длина комментария не может составлять больше 140 символов')
    }
  }

  function postData() {
    window.backend.post(new FormData(uploadForm), function () {
      error.classList.add('hidden');
      window.editPicture.uploadOverlay.classList.add('hidden');
      uploadForm.reset();
    }, uploadError);
  }

  function uploadError() {
    error.classList.remove('hidden');
    errorLinks[0].addEventListener('click', postData)
    errorLinks[1].addEventListener('click', function () {
      window.editPicture.uploadOverlay.classList.remove('hidden');
    })
    window.editPicture.uploadOverlay.classList.add('hidden');
  }

  uploadForm.addEventListener('submit', function (e) {
    e.preventDefault();
    postData()
  });

  hashtags.addEventListener('blur', hashtagsValidate);
  textDescription.addEventListener('blur', descriptionValidate);
})()

