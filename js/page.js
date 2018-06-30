'use strict';

(function () {

  var userMap = document.querySelector('.map');
  var mainPin = document.querySelector('.map__pin--main');
  var form = document.querySelector('.ad-form');
  var fieldsets = document.querySelectorAll('fieldset');
  var address = document.querySelector('input[name="address"]');

  var fillAddress = function () {
    address.value = window.map.getMainPinCoords();
  };

  // блокировка/доступность полей формы
  var disableForm = function () {
    form.classList.add('ad-form--disabled');
    fieldsets.forEach(function (item) {
      item.setAttribute('disabled', 'disabled');
    });
  };

  disableForm();

  var initForm = function () {
    form.classList.remove('ad-form--disabled');
    fieldsets.forEach(function (item) {
      item.removeAttribute('disabled');
    });
  };

  // активация страницы
  var activatePage = function () {
    fillAddress();
    window.map.renderPinFragment();
    initForm();
    userMap.classList.remove('map--faded');
  };

  mainPin.addEventListener('mouseup', function () {
    activatePage();
  });

  mainPin.addEventListener('keydown', function (evt) {
    window.utils.isEnterEvent(evt, activatePage);
  });

  window.page = {
    fillAddress: fillAddress
  };
})();
