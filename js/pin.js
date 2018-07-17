'use strict';

(function () {

  // перетаскивание пина
  var mainPin = document.querySelector('.map__pin--main');
  var userMap = document.querySelector('.map');
  var constants = window.constants;

  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var mainPinX = mainPin.offsetLeft - shift.x;
      var mainPinY = mainPin.offsetTop - shift.y;

      if (mainPinY > constants.LOCATION_MAX_Y - constants.MAIN_PIN_HEIGHT) {
        mainPinY = constants.LOCATION_MAX_Y - constants.MAIN_PIN_HEIGHT;
      } else if (mainPinY < constants.LOCATION_MIN_Y) {
        mainPinY = constants.LOCATION_MIN_Y;
      }

      if (mainPinX > userMap.offsetWidth - constants.MAIN_PIN_WIDTH) {
        mainPinX = userMap.offsetWidth - constants.MAIN_PIN_WIDTH;
      } else if (mainPinX < 0) {
        mainPinX = 0;
      }

      mainPin.style.top = mainPinY + 'px';
      mainPin.style.left = mainPinX + 'px';
      window.page.fillAddress();
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      userMap.removeEventListener('mousemove', onMouseMove);
      userMap.removeEventListener('mouseup', onMouseUp);
    };
    userMap.addEventListener('mousemove', onMouseMove);
    userMap.addEventListener('mouseup', onMouseUp);
  });

})();
