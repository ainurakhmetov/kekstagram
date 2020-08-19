'use strict';

(function () {
  window.backend = {
    get: function (onSuccess) {
      let xhr = new XMLHttpRequest();
      xhr.responseType = 'json'

      xhr.onload = function () {
        if (xhr.status !== 200) {
          alert(`Ошибка ${xhr.status}: ${xhr.statusText}`);
        } else {
          onSuccess(xhr.response)
        }
      };

      xhr.onerror = function () {
        alert("Запрос не удался! Повторите попытку позднее.");
      };

      xhr.timeout = 10000
      xhr.open('GET', 'https://js.dump.academy/kekstagram/data')
      xhr.send()
    },
    post: function (data, onSuccess, onError) {
      let xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.onload = function () {
        if (xhr.status !== 200) {
          onError()
          console.error(`Ошибка ${xhr.status}: ${xhr.statusText}`);
        } else {
          onSuccess(xhr.response)
          console.log(xhr.response)
        }
      };

      xhr.onerror = function () {
        onError()
      };

      xhr.timeout = 10000
      xhr.open('POST', 'https://javascript.pages.academy/kekstagram')
      xhr.send(data);
    }
  }

})()

