'use strict';

var TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var PRICE_MIN = 1000;
var PRICE_MAX = 1000000;
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var ROOMS_MIN = 1;
var ROOMS_MAX = 5;
var GUESTS_MIN = 1;
var GUESTS_MAX = 5;
var CHECKIN_TIME = ['12:00', '13:00', '14:00'];
var CHECKOUT_TIME = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var LOCATION_MIN_X = 300;
var LOCATION_MAX_X = 900;
var LOCATION_MIN_Y = 130;
var LOCATION_MAX_Y = 630;
var ADVERTS_COUNT = 8;
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;

// рандомный элемент массива
var getRandomElement = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

// рандомное число массива
var getRandomNumber = function (min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
};

// перемешать массив
var getRandomMixArray = function (arr) {
  return arr.sort(function () {
    return Math.random() - 0.5;
  });
};

// рандомная длина массива
var getRandomLength = function (arr) {
  return arr.slice(getRandomNumber(0, arr.length - 1));
};

// массив объектов объявлений
var randomAdverts = function (advertCount) {
  var adverts = [];
  var getUserAvatar = function (i) {
    var indexAvatar = i + 1;
    return 'img/avatars/user0' + indexAvatar + '.png';
  };

  for (var i = 0; i < advertCount; i++) {
    var locationX = getRandomNumber(LOCATION_MIN_X, LOCATION_MAX_X);
    var locationY = getRandomNumber(LOCATION_MIN_Y, LOCATION_MAX_Y);

    var advert = {
      author: {
        avatar: getUserAvatar(i)
      },
      offer: {
        title: TITLES[i],
        address: locationX + ', ' + locationY,
        price: getRandomNumber(PRICE_MIN, PRICE_MAX),
        type: getRandomElement(TYPES),
        rooms: getRandomNumber(ROOMS_MIN, ROOMS_MAX),
        guests: getRandomNumber(GUESTS_MIN, GUESTS_MAX),
        checkin: getRandomElement(CHECKIN_TIME),
        checkout: getRandomElement(CHECKOUT_TIME),
        features: getRandomLength(FEATURES),
        description: '',
        photos: getRandomMixArray(PHOTOS)
      },
      data: i,
      location: {
        x: locationX,
        y: locationY
      }
    };
    adverts.push(advert);
  }
  return adverts;
};

var adverts = randomAdverts(ADVERTS_COUNT);

// отрисовка меток на карте
var pinTemplate = document.querySelector('template')
  .content
  .querySelector('.map__pin');
var pinElements = document.querySelector('.map__pins');

var renderPin = function (mapPin) {
  var pinElement = pinTemplate.cloneNode(true);
  pinElement.style = 'left: ' + (mapPin.location.x - 0.5 * PIN_WIDTH) + 'px; top: ' + (mapPin.location.y - PIN_HEIGHT) + 'px;';
  pinElement.querySelector('img').src = mapPin.author.avatar;
  pinElement.querySelector('img').alt = mapPin.offer.title;
  pinElement.setAttribute('data-ad-number', mapPin.data);
  return pinElement;
};

var renderPinFragment = function () {
  var pinFragment = document.createDocumentFragment();
  for (var i = 0; i < adverts.length; i++) {
    pinFragment.appendChild(renderPin(adverts[i]));
  }
  pinElements.appendChild(pinFragment);
};

// отрисовка карточки объявления
var renderFeatures = function (features) {
  var featuresFragment = document.createDocumentFragment();
  for (var i = 0; i < features.length; i++) {
    var featuresElement = document.createElement('li');
    featuresElement.className = 'popup__feature popup__feature--' + features[i];
    featuresFragment.appendChild(featuresElement);
  }
  return featuresFragment;
};

var renderPhotos = function (photos) {
  var photosFragment = document.createDocumentFragment();
  for (var i = 0; i < photos.length; i++) {
    var photosTemplate = document.querySelector('template')
      .content
      .querySelector('.popup__photos');
    var photosElement = photosTemplate.cloneNode(true);
    photosElement.querySelector('img').src = photos[i];
    photosElement.querySelector('img').width = 60;
    photosElement.querySelector('img').height = 60;
    photosFragment.appendChild(photosElement);
  }
  return photosFragment;
};

var renderCard = function (mapCard) {
  var cardTemplate = document.querySelector('template')
    .content
    .querySelector('.map__card');
  var cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.popup__avatar').src = mapCard.author.avatar;
  cardElement.querySelector('.popup__title').textContent = mapCard.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = mapCard.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = mapCard.offer.price + '₽/ночь';
  cardElement.querySelector('.popup__type').textContent = mapCard.offer.type;
  cardElement.querySelector('.popup__text--capacity').textContent = mapCard.offer.rooms + ' комнаты для ' + mapCard.offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + mapCard.offer.checkin + ', выезд до ' + mapCard.offer.checkout;
  cardElement.querySelector('.popup__features').textContent = '';
  cardElement.querySelector('.popup__features').appendChild(renderFeatures(mapCard.offer.features));
  cardElement.querySelector('.popup__description').textContent = mapCard.offer.description;
  cardElement.querySelector('.popup__photos').textContent = '';
  cardElement.querySelector('.popup__photos').appendChild(renderPhotos(mapCard.offer.photos));

  return cardElement;
};

var renderCardFragment = function (advert) {
  if (advert) {
    var cardFragment = document.createDocumentFragment();
    cardFragment.appendChild(renderCard(advert));
    userMap.insertBefore(cardFragment, document.querySelector('.map__filter-container'));
  }
};

var getMapPinsElements = function () {
  var target = evt.target;
  var parentElement = target.parentNode;
  var index = parentElement.dataset.adNumber;

  renderCardFragment(adverts[index]);
};

// закрытие карточки объявления
var popupClose = document.querySelector('.popup__close');

var deletePopup = function () {
  if (userMap.querySelector('.popup')) {
    userMap.querySelector('.popup').remove();
  }
};

if (popupClose) {
  popupClose.addEventListener('click', function () {
    deletePopup();
  });
}

// активация страницы
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
var MAIN_PIN_WIDTH = 65;
var MAIN_PIN_HEIGHT = 65;

var userMap = document.querySelector('.map');
var mainPin = document.querySelector('.map__pin--main');
var form = document.querySelector('.ad-form');
var fieldsets = document.querySelectorAll('fieldset');
var address = form.querySelector('input[name="address"]');

var activatePage = function () {
  fillAddress();
  getMapPinsElements();
  initForm();
  userMap.classList.remove('map--faded');
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

// заполнение поля адреса
var getMainPinCords = function () {
  var mainPinX = parseInt(mainPin.style.left, 10) + (MAIN_PIN_WIDTH / 2);
  var mainPinY = parseInt(mainPin.style.top, 10) + (MAIN_PIN_HEIGHT / 2);

  if (!userMap.classList.contains('map--faded')) {
    mainPinY += (MAIN_PIN_HEIGHT / 2);
  }

  return Math.floor(mainPinX) + ', ' + Math.floor(mainPinY);
};

var fillAddress = function () {
  address.value = getMainPinCords();
};

var emptyAddress = function () {
  address.value = null;
};


mainPin.addEventListener('mouseup', function (evt) {
  activatePage();
});

mainPin.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    activatePage();
  }
});

// деактивация страницы
userMap.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    userMap.classList.add('map--faded');
    deletePopup();
    disableForm();
    emptyAddress();
  }
});
