'use strict';

(function () {
  const keyCodeList = {
    ESC: 27,
    ENTER: 13
  };

  const uploadCancel = document.querySelector('.img-upload__cancel');
  const uploadFile = document.querySelector('#upload-file');
  const uploadOverlay = document.querySelector('.img-upload__overlay');

  const filtersList = document.querySelector('.effects__list');
  const uploadPreview = document.querySelector('.img-upload__preview');

  const hashtags = document.querySelector('.text__hashtags');
  const textDescription = document.querySelector('.text__description');

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

  function onOverlayEsc(e) {
    if (
      e.keyCode === keyCodeList.ESC &&
      document.activeElement !== hashtags &&
      document.activeElement !== textDescription
    ) {
      onOverlayClose();
      uploadOverlay.classList.add('hidden');
    }
  }

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
      scaleValue.setAttribute('value', `${depth * 100}%`);
    }
    if (filterPhobos.checked) {
      uploadPreview.style = `filter: blur(${depth * 3}px);`;
      scaleValue.setAttribute('value', `${(depth * 3).toFixed(2)}px`);
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

  scalePin.addEventListener('mousedown', function (event) {
    event.preventDefault();

    let startX = event.clientX;

    function onMouseMove(eventMove) {
      eventMove.preventDefault();
      const shift = startX - eventMove.clientX;
      startX = eventMove.clientX;

      scalePin.style.left = `${scalePin.offsetLeft - shift}px`;
      scaleLevel.style.width = `${scalePin.offsetLeft / scaleLine.offsetWidth * 100}%`;

      if (scalePin.offsetLeft <= 0) {
        scalePin.style.left = '0px';
        scaleLevel.style.width = '0%';
      }
      if (scalePin.offsetLeft >= scaleLine.offsetWidth) {
        scalePin.style.left = `${scaleLine.offsetWidth}px`;
        scaleLevel.style.width = '100%';
      }
      onDepthChange();
    }

    function onMouseUp(eventUp) {
      eventUp.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  })

})()
