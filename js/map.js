'use strict';

(function () {

  // отрисовка меток на карте
  var pinTemplate = document.querySelector('template')
    .content
    .querySelector('.map__pin');
  var pinElements = document.querySelector('.map__pins');

  var renderPin = function (mapPin) {
    var pinElement = pinTemplate.cloneNode(true);
    pinElement.style = 'left: ' + (mapPin.location.x - 0.5 * window.constants.PIN_WIDTH) + 'px; top: ' + (mapPin.location.y - window.constants.PIN_HEIGHT) + 'px;';
    pinElement.querySelector('img').src = mapPin.author.avatar;
    pinElement.querySelector('img').alt = mapPin.offer.title;
    pinElement.setAttribute('data-ad-Quantity', mapPin.data);
    return pinElement;
  };

  var renderPinFragment = function () {
    var pinFragment = document.createDocumentFragment();
    for (var i = 0; i < window.utils.adverts.length; i++) {
      pinFragment.appendChild(renderPin(window.utils.adverts[i]));
    }
    pinElements.appendChild(pinFragment);
  };

    // получение координат главного пина
    var getMainPinCoords = function () {
      var mainPin = document.querySelector('.map__pin--main');
      var mainPinX = mainPin.offsetLeft + window.constants.MAIN_PIN_WIDTH / 2;
      var mainPinY = mainPin.offsetTop + window.constants.PIN_HEIGHT / 2;
      return Math.floor(mainPinX) + ', ' + Math.floor(mainPinY);
    };

  window.map = {
    renderPinFragment: renderPinFragment,
    getMainPinCoords: getMainPinCoords
  };

})();

