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

      var minDistanceTopPin = constants.LOCATION_MIN_Y - constants.MAIN_PIN_HEIGHT;
      var maxDistanceTopPin = constants.LOCATION_MAX_Y - constants.MAIN_PIN_HEIGHT;
      var top = mainPin.offsetTop - shift.y;
      var left = mainPin.offsetLeft - shift.x;

      if (top <= (minDistanceTopPin)) {
        mainPin.style.top = minDistanceTopPin + 'px';
        mainPin.style.left = left + 'px';
        startCoords.y = minDistanceTopPin;
      } else if (top >= maxDistanceTopPin) {
        mainPin.style.top = maxDistanceTopPin + 'px';
        mainPin.style.left = left + 'px';
        startCoords.y = maxDistanceTopPin;
      } else {
        mainPin.style.top = top + 'px';
        mainPin.style.left = left + 'px';
      }
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
