'use strict';

(function () {

  var userMap = document.querySelector('.map');
  var mainPin = document.querySelector('.map__pin--main');
  var form = document.querySelector('.ad-form');
  var fieldsets = document.querySelectorAll('fieldset');
  var address = document.querySelector('input[name="address"]');
  var filters = document.querySelector('.map__filters');

  // заполнение поля адреса
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

  var successHandler = function (adverts) {
    window.map.renderPinFragment(adverts);
  };

  // активация страницы
  var activatePage = function () {
    fillAddress();
    initForm();
    userMap.classList.remove('map--faded');
    window.backend.load(successHandler, window.backend.errorHandler);
  };

  mainPin.addEventListener('mouseup', function () {
    activatePage();
  });

  mainPin.addEventListener('keydown', function (evt) {
    window.utils.isEnterEvent(evt, activatePage);
  });

  // клик на фильтре
  var onFilterChange = function (evt) {
    evt.preventDefault();
    window.card.deleteCard();
    window.map.resetPins();
    window.utils.debounce(window.filter.updatePins(window.advertsData));
  };

  filters.addEventListener('change', onFilterChange);

  window.page = {
    fillAddress: fillAddress
  };

})();
