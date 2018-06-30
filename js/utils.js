'use strict';

(function () {

  // событие нажатия клавиши ESC
  var isEscEvent = function (evt, action) {
    if (evt.keyCode === window.constants.ESC_KEYCODE) {
      action();
    }
    return action;
  };

  // событие нажатия клавиши ENTER
  var isEnterEvent = function (evt, action) {
    if (evt.keyCode === window.constants.ENTER_KEYCODE) {
      action();
    }
    return action;
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

    // массив объектов объявлений
  var getRandomAdverts = function (advertCount) {
    var advertsArr = [];

    var getUserAvatar = function (index) {
      var pictureQuantity = index + 1;
      return 'img/avatars/user0' + pictureQuantity + '.png';
    };

    for (var i = 0; i < advertCount; i++) {
      var locationX = getRandomQuantity(window.constants.LOCATION_MIN_X, window.constants.LOCATION_MAX_X);
      var locationY = getRandomQuantity(window.constants.LOCATION_MIN_Y, window.constants.LOCATION_MAX_Y);

      var advert = {
        author: {
          avatar: getUserAvatar(i)
        },
        offer: {
          title: window.constants.TITLES[i],
          address: locationX + ', ' + locationY,
          price: getRandomQuantity(window.constants.PRICE_MIN, window.constants.PRICE_MAX),
          type: getRandomElement(window.constants.TYPES),
          rooms: getRandomQuantity(window.constants.ROOMS_MIN, window.constants.ROOMS_MAX),
          guests: getRandomQuantity(window.constants.GUESTS_MIN, window.constants.GUESTS_MAX),
          checkin: getRandomElement(window.constants.CHECKIN_TIME),
          checkout: getRandomElement(window.constants.CHECKOUT_TIME),
          features: getRandomLength(window.constants.FEATURES),
          description: '',
          photos: getRandomMixArray(window.constants.PHOTOS)
        },
        data: i,
        location: {
          x: locationX,
          y: locationY
        }
      };

      advertsArr.push(advert);
    }

    return advertsArr;
  };

  var adverts = getRandomAdverts(window.constants.ADVERTS_COUNT);

  window.utils = {
    isEscEvent: isEscEvent,
    isEnterEvent: isEnterEvent,
    getRandomElement: getRandomElement,
    getRandomQuantity: getRandomQuantity,
    getRandomMixArray: getRandomMixArray,
    getRandomLength: getRandomLength,
    getRandomAdverts: getRandomAdverts,
    adverts: adverts
  };
})();
