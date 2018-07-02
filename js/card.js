'use strict';

(function () {

  var pinElements = document.querySelector('.map__pins');
  var userMap = document.querySelector('.map');
  var utils = window.utils;

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

  var renderCard = function (card) {
    var cardTemplate = document.querySelector('template')
      .content
      .querySelector('.map__card');
    var cardElement = cardTemplate.cloneNode(true);
    cardElement.querySelector('.popup__avatar').src = card.author.avatar;
    cardElement.querySelector('.popup__title').textContent = card.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = card.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = card.offer.price + '₽/ночь';
    cardElement.querySelector('.popup__type').textContent = card.offer.type;
    cardElement.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
    cardElement.querySelector('.popup__features').textContent = '';
    cardElement.querySelector('.popup__features').appendChild(renderFeatures(card.offer.features));
    cardElement.querySelector('.popup__description').textContent = card.offer.description;
    cardElement.querySelector('.popup__photos').textContent = '';
    cardElement.querySelector('.popup__photos').appendChild(renderPhotos(card.offer.photos));
    return cardElement;
  };

  var renderPopupFragment = function (card) {
    var cardFragment = document.createDocumentFragment();
    cardFragment.appendChild(renderCard(card));
    userMap.insertBefore(cardFragment, document.querySelector('.map__filters-container'));
  };

  // удалить карточку объявления
  var deleteCard = function () {
    var card = userMap.querySelector('.map__card');
    if (!(card === null)) {
      userMap.removeChild(card);
    }
  };

  // отрисовка карточки при клике на пин
  var onPinClick = function (adverts) {
    var existingPinElements = pinElements.querySelectorAll('.map__pin:not(.map__pin--main)');
    for (var i = 0; i < existingPinElements.length; i++) {
      existingPinElements[i].addEventListener('click', function (evt) {
        deleteCard();
        var currentCard = evt.currentTarget.dataset.adQuantity;
        renderPopupFragment(adverts[currentCard]);

        var popupCloseButton = userMap.querySelector('.popup__close');
        popupCloseButton.addEventListener('click', function () {
          deleteCard();
        });
      });
    }
  };

  pinElements.addEventListener('click', onPinClick);

  document.addEventListener('keydown', function (evt) {
    utils.isEnterEvent(evt, onPinClick);
  });

  document.addEventListener('keydown', function (evt) {
    utils.isEscEvent(evt, deleteCard);
  });
})();
