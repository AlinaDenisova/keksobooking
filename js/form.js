'use strict';

(function () {

// валидация формы
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
  var inputsValid = [price, title];
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
  var onMinPrice = function () {
    price.min = houseTypeMap[houseType.value].MIN_VALUE;
    price.placeholder = houseTypeMap[houseType.value].PLACEHOLDER;
  };

  // соответсвие значения поля времени приезда полю времени отъезда
  var setTime = function (element, value) {
    element.value = value;
  };

  // соответсвие значения поля количества гостей полю количества комнат
  var onCapacityChange = function () {
    options.forEach(function (element) {
      element.disabled = !roomQuantityMap[roomQuantity.value].includes(element.value);
    });
    guestsQuantity.value = roomQuantityMap[roomQuantity.value].includes(guestsQuantity.value) ? guestsQuantity.value : roomQuantityMap[roomQuantity.value][0];
  };

  // проверка на валидность поля
  var validityInput = function () {
    for (var i = 0; i < inputsValid.length; i++) {
      var validity = inputsValid[i].validity.valid;
      if (!validity) {
        inputsValid[i].classList.remove('invalid-field');
        inputsValid.offsetWidth = inputsValid[i].offsetWidth;
        inputsValid[i].classList.add('invalid-field');
      } else {
        inputsValid[i].classList.remove('invalid-field');
      }
    }
  };

  houseType.addEventListener('input', onMinPrice);
  arrivalTime.addEventListener('input', function (evt) {
    setTime(departureTime, evt.target.value);
  });
  departureTime.addEventListener('input', function (evt) {
    setTime(arrivalTime, evt.target.value);
  });
  roomQuantity.addEventListener('input', onCapacityChange);

  submitButton.addEventListener('click', function () {
    validityInput();
  });

  submitButton.addEventListener('keydown', function (evt) {
    window.utils.isEnterEvent(evt, validityInput);
  });

  // показать/скрыть сообщение успешной отправки формы
  var showSuccessMessage = function () {
    successMessage.classList.remove('hidden');
    successMessage.addEventListener('click', closeSuccesMessage);
  };

  var closeSuccesMessage = function () {
    successMessage.classList.add('hidden');
  };

  document.addEventListener('keydown', function (evt) {
    window.utils.isEscEvent(evt, closeSuccesMessage);
  });

  // показать/скрыть сообщение об ошибке загрузки
  var showErrorMessage = function (errorMessage) {
    var node = window.backend.errorHandler(errorMessage);
    var onErrorClick = function () {
      node.remove();
      document.removeEventListener('click', onErrorClick);
      document.removeEventListener('keydown', onErrorEscPress);
    };

    var onErrorEscPress = function (evt) {
      window.utils.isEscEvent(evt, onErrorClick);
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
    mainPin.style = 'left: 570px; top: 375px';
    onCapacityChange();
    for (var i = 0; i < inputsValid.length; i++) {
      if (inputsValid[i].classList.contains('invalid-field')) {
        inputsValid[i].classList.remove('invalid-field');
      }
    }
  };

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
  };

  resetButton.addEventListener('click', deactivatePage);

  resetButton.addEventListener('keydown', function (evt) {
    window.utils.isEnterEvent(evt, deactivatePage);
  });

  form.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(form), function () {
      deactivatePage();
      showSuccessMessage();
    }, showErrorMessage);
    evt.preventDefault();
  });

  window.form = {
    resetForm: resetForm,
    showErrorMessage: showErrorMessage
  };
})();
