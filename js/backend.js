'use strict';

// загрузка похожих объявлений с сервера
(function () {
  var URL = 'https://js.dump.academy/keksobooking';

  // обработка ошибок
  var setup = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
        window.advertsData = xhr.response;
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
    xhr.timeout = 100000;
    return xhr;
  };

  // загрузка данных с сервера
  var load = function (onLoad, onError) {
    var xhr = setup(onLoad, onError);
    xhr.open('GET', URL + '/data');
    xhr.send();
  };

  // отправка данных на сервер
  var save = function (data, onLoad, onError) {
    var xhr = setup(onLoad, onError);
    xhr.open('POST', URL);
    xhr.send(data);
  };

  // элемент с текстом ошибки
  var onLoadError = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 3; width: 100%; height: 100%; padding-top: 300px; text-align: center; background-color: rgba(0, 0, 0, 0.8)';
    node.style.position = 'fixed';
    node.style.left = '0';
    node.style.top = '0';
    node.style.fontSize = '50px';
    node.style.color = '#ffffff';
    node.style.fontWeight = '700';
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
    return node;
  };

  window.backend = {
    load: load,
    save: save,
    onLoadError: onLoadError
  };

})();
