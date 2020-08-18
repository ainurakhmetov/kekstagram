'use strict';

(function () {
  const bigPicture = document.querySelector('.big-picture');
  const bigPictureClose = document.querySelector('.big-picture__cancel');
  const pictures = document.querySelector('.pictures');

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

      userPic.src = `img/avatar-${window.utils.getRandom(1, 6)}.svg`;
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

  function onBigPictureClose() {
    bigPicture.classList.add('hidden');
  }

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
})()
