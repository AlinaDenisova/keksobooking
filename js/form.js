'use strict';

(function () {

// валидация формы
  var title = document.querySelector('#title');
  var houseType = document.querySelector('#type');
  var price = document.querySelector('#price');
  var arrivalTime = document.querySelector('#timein');
  var departureTime = document.querySelector('#timeout');
  var roomQuantity = document.querySelector('#room_number');
  var guestsQuantity = document.querySelector('#capacity');
  var description = document.querySelector('#description');
  var submitButton = document.querySelector('.ad-form__submit');
  var resetButton = document.querySelector('.ad-form__reset');
  var options = guestsQuantity.querySelectorAll('option');
  var mainPin = document.querySelector('.map__pin--main');
  var inputsValid = [price, title];
  var form = document.querySelector('.ad-form');

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

  // сброс формы
  var resetForm = function () {
    setTimeout(function () {
      title.value = null;
      description.value = null;
      price.placeholder = 0;
      price.min = 0;
      guestsQuantity.value = '1';
      window.page.fillAddress();
      mainPin.style = 'left: 570px; top: 375px';
      onCapacityChange();
      for (var i = 0; i < inputsValid.length; i++) {
        if (inputsValid[i].classList.contains('invalid-field')) {
          inputsValid[i].classList.remove('invalid-field');
        }
      }
    }, 0);
  };

  resetButton.addEventListener('click', function () {
    resetForm();
  });

  resetButton.addEventListener('keydown', function (evt) {
    window.utils.isEnterEvent(evt, resetForm);
  });

  form.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(form), resetForm, window.backend.errorHandler);
    evt.preventDefault();
  });
})();
