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

  var onLoadSuccess = function (adverts) {
    window.map.renderPinFragment(adverts);
  };

  // активация страницы
  var onMainPinMouseDown = function () {
    fillAddress();
    initForm();
    userMap.classList.remove('map--faded');
    window.backend.load(onLoadSuccess, window.backend.onLoadError);
    mainPin.removeEventListener('mousedown', onMainPinMouseDown);
    filters.reset();
    window.images.addImageListeners();
  };

  var loadPage = function () {
    mainPin.addEventListener('mousedown', onMainPinMouseDown);
  };

  loadPage();

  mainPin.addEventListener('keydown', function (evt) {
    window.utils.isEnterEvent(evt, onMainPinMouseDown);
  });

  // нажатие на фильтр
  var onFilterChange = function (evt) {
    evt.preventDefault();
    window.card.delete();
    window.map.resetPins();
    window.utils.debounce(window.updatePins(window.advertsData));
  };

  filters.addEventListener('change', window.utils.debounce(onFilterChange));

  window.page = {
    fillAddress: fillAddress,
    load: loadPage
  };

})();
