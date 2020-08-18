'use strict';

(function () {
  const pictures = document.querySelector('.pictures');

  function renderPhotoCard({ url, likes, comments }) {
    const template = document.querySelector('#picture').content.querySelector('.picture__link');
    const element = template.cloneNode(true);

    element.querySelector('.picture__img').src = url;
    element.querySelector('.picture__stat--comments').textContent = comments.length;
    element.querySelector('.picture__stat--likes').textContent = likes;

    return element
  }

  function renderPhotoCards(arr) {
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < arr.length; i++) {
      fragment.appendChild(renderPhotoCard(window.data[i]));
    }

    pictures.appendChild(fragment);
  }

  renderPhotoCards(window.data)
})()

