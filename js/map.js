'use strict';

(function () {

  var constants = window.constants;
  var pinTemplate = document.querySelector('template')
    .content
    .querySelector('.map__pin');
  var pinElements = document.querySelector('.map__pins');
  var mainPin = document.querySelector('.map__pin--main');

  // отрисовка меток на карте
  var renderPin = function (mapPin) {
    var pinElement = pinTemplate.cloneNode(true);
    pinElement.style = 'left: ' + (mapPin.location.x - 0.5 * constants.PIN_WIDTH) + 'px; top: ' + (mapPin.location.y - constants.PIN_HEIGHT) + 'px;';
    pinElement.querySelector('img').src = mapPin.author.avatar;
    pinElement.querySelector('img').alt = mapPin.offer.title;
    pinElement.setAttribute('data-ad-Quantity', mapPin.data);
    return pinElement;
  };

  var renderPinFragment = function (adverts) {
    var pinFragment = document.createDocumentFragment();
    for (var i = 0; i < adverts.length; i++) {
      pinFragment.appendChild(renderPin(adverts[i]));
    }
    pinElements.appendChild(pinFragment);
  };

  // получение координат главного пина
  var getMainPinCoords = function () {
    var mainPinX = mainPin.offsetLeft + constants.MAIN_PIN_WIDTH / 2;
    var mainPinY = mainPin.offsetTop + constants.MAIN_PIN_HEIGHT / 2;
    return Math.floor(mainPinX) + ', ' + Math.floor(mainPinY);
  };

  window.map = {
    renderPinFragment: renderPinFragment,
    getMainPinCoords: getMainPinCoords
  };
})();

