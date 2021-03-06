'use strict';

(function () {

  var constants = window.constants;
  var pinElements = document.querySelector('.map__pins');
  var mainPin = document.querySelector('.map__pin--main');
  var pinActive = document.querySelector('.map__pin--active');

  // добавление пинам активного класса
  var activatePin = function (element) {
    deactivatePin();
    pinActive = element;
    pinActive.classList.add('map__pin--active');
  };

  // удаление у пинов активного класса
  var deactivatePin = function () {
    if (pinActive) {
      pinActive.classList.remove('map__pin--active');
    }
  };

  // создание меток на карте
  var renderPin = function (card) {
    var pinElement = document.createElement('button');
    pinElement.classList.add('map__pin');
    pinElement.style = 'left: ' + (card.location.x - 0.5 * constants.PIN_WIDTH) + 'px; top: ' + (card.location.y - constants.PIN_HEIGHT) + 'px;';
    var pinAvatar = document.createElement('img');
    pinAvatar.src = card.author.avatar;
    pinAvatar.alt = card.offer.title;
    pinAvatar.width = constants.AVATAR_SIZE;
    pinAvatar.height = constants.AVATAR_SIZE;
    pinElement.appendChild(pinAvatar);

    pinElement.addEventListener('click', function () {
      window.card.show(card);
      activatePin(pinElement);
    });

    return pinElement;
  };

  // отрисовка меток на карте
  var renderPinFragment = function (adverts) {
    var pinFragment = document.createDocumentFragment();
    adverts.slice(0, constants.PIN_COUNT).forEach(function (item) {
      pinFragment.appendChild(renderPin(item));
    });
    pinElements.appendChild(pinFragment);
  };

  // удаление пинов
  var resetPins = function () {
    var existingPinElements = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    existingPinElements.forEach(function (item) {
      pinElements.removeChild(item);
    });
  };

  // получение координат главного пина
  var getMainPinCoords = function () {
    var mainPinX = mainPin.offsetLeft + constants.MAIN_PIN_WIDTH / 2;
    var mainPinY = mainPin.offsetTop + constants.MAIN_PIN_HEIGHT / 2;
    return Math.floor(mainPinX) + ', ' + Math.floor(mainPinY);
  };

  window.map = {
    renderPin: renderPin,
    deactivatePin: deactivatePin,
    renderPinFragment: renderPinFragment,
    getMainPinCoords: getMainPinCoords,
    resetPins: resetPins
  };

})();
