'use strict';

(function () {

// валидация формы
  var utils = window.utils;
  var form = document.querySelector('.ad-form');
  var title = form.querySelector('#title');
  var houseType = form.querySelector('#type');
  var price = form.querySelector('#price');
  var arrivalTime = form.querySelector('#timein');
  var departureTime = form.querySelector('#timeout');
  var roomQuantity = form.querySelector('#room_number');
  var guestsQuantity = form.querySelector('#capacity');
  var description = form.querySelector('#description');
  var submitButton = form.querySelector('.ad-form__submit');
  var resetButton = form.querySelector('.ad-form__reset');
  var options = guestsQuantity.querySelectorAll('option');
  var mainPin = document.querySelector('.map__pin--main');
  var inputsData = [price, title];
  var successMessage = document.querySelector('.success');
  var userMap = document.querySelector('.map');
  var fieldsets = form.querySelectorAll('fieldset');

  var houseTypeMap = {
    'bungalo': {
      MIN_VALUE: '0',
      PLACEHOLDER: '0',
    },
    'flat': {
      MIN_VALUE: '1000',
      PLACEHOLDER: '1 000',
    },
    'house': {
      MIN_VALUE: '5000',
      PLACEHOLDER: '5 000',
    },
    'palace': {
      MIN_VALUE: '10000',
      MAX_VALUE: '1000000',
      PLACEHOLDER: '10 000'
    }
  };

  var roomQuantityMap = {
    '1': ['1'],
    '2': ['1', '2'],
    '3': ['1', '2', '3'],
    '100': ['0']
  };

  // соответсвие значения поля цены полю жилья
  var setPrice = function () {
    price.min = houseTypeMap[houseType.value].MIN_VALUE;
    price.max = houseTypeMap[houseType.value].MAX_VALUE;
    price.placeholder = houseTypeMap[houseType.value].PLACEHOLDER;
  };

  // соответсвие значения поля времени приезда полю времени отъезда
  var setTime = function (element, value) {
    element.value = value;
  };

  // соответсвие значения поля количества гостей полю количества комнат
  var setCapacityChange = function () {
    options.forEach(function (element) {
      element.disabled = !roomQuantityMap[roomQuantity.value].includes(element.value);
    });
    guestsQuantity.value = roomQuantityMap[roomQuantity.value].includes(guestsQuantity.value) ? guestsQuantity.value : roomQuantityMap[roomQuantity.value][0];
  };

  // проверка на валидность поля
  var checkValidityInput = function () {
    inputsData.forEach(function (item) {
      var validity = item.validity.valid;
      if (!validity) {
        item.classList.remove('invalid-field');
        inputsData.offsetWidth = item.offsetWidth;
        item.classList.add('invalid-field');
      } else {
        item.classList.remove('invalid-field');
      }
    });
  };

  houseType.addEventListener('input', setPrice);
  arrivalTime.addEventListener('input', function (evt) {
    setTime(departureTime, evt.target.value);
  });
  departureTime.addEventListener('input', function (evt) {
    setTime(arrivalTime, evt.target.value);
  });
  roomQuantity.addEventListener('input', setCapacityChange);

  submitButton.addEventListener('click', function () {
    checkValidityInput();
  });

  submitButton.addEventListener('keydown', function (evt) {
    utils.isEnterEvent(evt, checkValidityInput);
  });

  // показать/скрыть сообщение успешной отправке формы
  var toggleSuccessMessage = function () {
    successMessage.classList.remove('hidden');
    successMessage.addEventListener('click', closeSuccesMessage);
  };

  var closeSuccesMessage = function () {
    successMessage.classList.add('hidden');
  };

  document.addEventListener('keydown', function (evt) {
    utils.isEscEvent(evt, closeSuccesMessage);
  });

  // показать/скрыть сообщение об ошибке загрузки
  var toggleErrorMessage = function (errorMessage) {
    var node = window.backend.onLoadError(errorMessage);
    var onErrorClick = function () {
      node.remove();
      document.removeEventListener('click', onErrorClick);
      document.removeEventListener('keydown', onErrorEscPress);
    };

    var onErrorEscPress = function (evt) {
      utils.isEscEvent(evt, onErrorClick);
    };

    document.addEventListener('click', onErrorClick);
    document.addEventListener('keydown', onErrorEscPress);
  };

  // сброс формы
  var resetForm = function () {
    setTimeout(function () {
      window.page.fillAddress();
    });
    title.value = null;
    description.value = null;
    price.placeholder = 0;
    price.value = null;
    price.min = 0;
    guestsQuantity.value = '1';
    mainPin.style.left = window.constants.MAIN_PIN_LEFT + 'px';
    mainPin.style.top = window.constants.MAIN_PIN_TOP + 'px';
    setCapacityChange();
    inputsData.forEach(function (item) {
      if (item.classList.contains('invalid-field')) {
        item.classList.remove('invalid-field');
      }
    });
  };

  // деактивация страницы
  var deactivatePage = function () {
    form.classList.add('ad-form--disabled');
    userMap.classList.add('map--faded');
    fieldsets.forEach(function (item) {
      item.setAttribute('disabled', 'disabled');
    });
    resetForm();
    window.card.deleteCard();
    window.map.resetPins();
    window.page.loadPage();
    window.images.deleteImageListeners();
    window.images.deleteImages();
  };

  resetButton.addEventListener('click', deactivatePage);

  resetButton.addEventListener('keydown', function (evt) {
    utils.isEnterEvent(evt, deactivatePage);
  });

  form.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(form), function () {
      deactivatePage();
      toggleSuccessMessage();
    }, toggleErrorMessage);
    evt.preventDefault();
  });

  window.form = {
    resetForm: resetForm,
    toggleErrorMessage: toggleErrorMessage
  };
})();
