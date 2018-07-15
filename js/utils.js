'use strict';

(function () {
  var constants = window.constants;

  // событие нажатия клавиши ESC
  var isEscEvent = function (evt, action) {
    if (evt.keyCode === constants.ESC_KEYCODE) {
      action();
    }
  };

  // событие нажатия клавиши ENTER
  var isEnterEvent = function (evt, action) {
    if (evt.keyCode === constants.ENTER_KEYCODE) {
      action();
    }
  };

  // рандомный элемент массива
  var getRandomElement = function (arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  };

  // рандомное число массива
  var getRandomQuantity = function (min, max) {
    return Math.floor(min + Math.random() * (max + 1 - min));
  };

  // перемешать массив
  var getRandomMixArray = function (arr) {
    return arr.sort(function () {
      return Math.random() - 0.5;
    });
  };

  // рандомная длина массива
  var getRandomLength = function (arr) {
    return arr.slice(getRandomQuantity(0, arr.length - 1));
  };

    // устранение "дребезга"
  var debounce = function (fun) {
    var lastTimeout = null;
    return function () {
      var args = arguments;
      if (lastTimeout) {
        clearTimeout(lastTimeout);
      }
      lastTimeout = setTimeout(function () {
        fun.apply(null, args);
      }, constants.DEBOUNCE_INTERVAL);
    };
  };


  window.utils = {
    isEscEvent: isEscEvent,
    isEnterEvent: isEnterEvent,
    getRandomElement: getRandomElement,
    getRandomQuantity: getRandomQuantity,
    getRandomMixArray: getRandomMixArray,
    getRandomLength: getRandomLength,
    debounce: debounce
  };

})();
