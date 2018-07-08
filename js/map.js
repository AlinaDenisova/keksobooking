'use strict';

(function () {

  var constants = window.constants;
  var pinElements = document.querySelector('.map__pins');
  var mainPin = document.querySelector('.map__pin--main');
  var userMap = document.querySelector('.map');
  var pinActive = document.querySelector('.map__pin--active');

  // добавление пинам активного класса
  var activatePin = function (pin) {
    pin.classList.add('.map__pin--active');
  };

  // удаление у пинов активного класса
  var deactivatePin = function () {
    if (pinActive !== null) {
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
    pinAvatar.width = 40;
    pinAvatar.height = 40;
    pinElement.appendChild(pinAvatar);

    pinElement.addEventListener('click', function () {
      var mapCard = document.querySelector('.map__card');

      if (mapCard) {
        mapCard.remove();
        deactivatePin();
      }

      activatePin(pinElement);
      window.card.renderCard(card);

      var popupCloseButton = userMap.querySelector('.popup__close');
      popupCloseButton.addEventListener('click', function () {
        window.card.deleteCard();
      });
    });

    return pinElement;
  };

  // отрисовка меток на карте
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
    deactivatePin: deactivatePin,
    renderPinFragment: renderPinFragment,
    getMainPinCoords: getMainPinCoords,
  };
})();

