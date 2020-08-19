'use strict';

(function () {
  const sortingContainer = document.querySelector('.img-filters ');
  const sortingButtons = sortingContainer.querySelectorAll('.img-filters__button');
  const pictures = document.querySelector('.pictures');
  let photosData;
  let lastTimeout;

  const DEBOUNCE = 500;

  function removeOldPhotos () {
    const oldPhotos = pictures.querySelectorAll('.picture__link');
    if (oldPhotos) {
      [].forEach.call(oldPhotos, function (element) {
        pictures.removeChild(element);
      });
    }
  }

  function renderPhotoCards(data) {
    removeOldPhotos();
    const photoTemplate = document.querySelector('#picture').content.querySelector('.picture__link');
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < data.length; i++) {
      const photoElement = photoTemplate.cloneNode(true);

      photoElement.querySelector('.picture__img').src = data[i].url;
      photoElement.querySelector('.picture__stat--comments').textContent = data[i].comments.length - 1;
      photoElement.querySelector('.picture__stat--likes').textContent = data[i].likes;

      fragment.appendChild(photoElement);
    }
    document.querySelector('.pictures').appendChild(fragment);
  }

   function onSortButtonClick(e) {
    const activeElement = e.target;
    sortingContainer.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
    activeElement.classList.add('img-filters__button--active');
    let photosCopy = photosData.slice();
    switch (activeElement.id) {
      case 'filter-popular':
        photosCopy = photosCopy.sort(function (first, second) {
          return second.likes - first.likes;
        });
        break;

      case 'filter-discussed':
        photosCopy = photosCopy.sort(function (first, second) {
          return second.comments.length - first.comments.length;
        });
        break;

      case 'filter-random':
        break;
    }
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(function () {
      renderPhotoCards(photosCopy);
    }, DEBOUNCE);
  }

  function onGetSuccess(data) {
    photosData = data;
    // window.data = photosData;

    renderPhotoCards(photosData);
    sortingContainer.classList.remove('img-filters--inactive');
    [].forEach.call(sortingButtons, function (button) {
      button.addEventListener('click', onSortButtonClick);
    });
  }

  onGetSuccess(window.data)

  // window.backend.get(onGetSuccess);
  window.gallery = {};
})();

