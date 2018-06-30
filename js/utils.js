'use strict';

(function () {
  var constants = window.constants;

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
      var locationX = getRandomQuantity(constants.LOCATION_MIN_X, constants.LOCATION_MAX_X);
      var locationY = getRandomQuantity(constants.LOCATION_MIN_Y, constants.LOCATION_MAX_Y);

      var advert = {
        author: {
          avatar: getUserAvatar(i)
        },
        offer: {
          title: constants.TITLES[i],
          address: locationX + ', ' + locationY,
          price: getRandomQuantity(constants.PRICE_MIN, constants.PRICE_MAX),
          type: getRandomElement(constants.TYPES),
          rooms: getRandomQuantity(constants.ROOMS_MIN, constants.ROOMS_MAX),
          guests: getRandomQuantity(constants.GUESTS_MIN, constants.GUESTS_MAX),
          checkin: getRandomElement(constants.CHECKIN_TIME),
          checkout: getRandomElement(constants.CHECKOUT_TIME),
          features: getRandomLength(constants.FEATURES),
          description: '',
          photos: getRandomMixArray(constants.PHOTOS)
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

  var adverts = getRandomAdverts(constants.ADVERTS_COUNT);

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
