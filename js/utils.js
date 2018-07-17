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
    debounce: debounce
  };

})();
