'use strict';
(function () {

  var userMap = document.querySelector('.map');

  // отрисовка карточки объявления
  var renderCard = function (card) {

    var translateHouseType = {
      flat: 'Квартира',
      bungalo: 'Бунгало',
      house: 'Дом',
      palace: 'Дворец'
    };

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
        photosElement.querySelector('img').width = 40;
        photosElement.querySelector('img').height = 40;
        photosFragment.appendChild(photosElement);
      }
      return photosFragment;
    };

    var cardTemplate = document.querySelector('template')
      .content
      .querySelector('.map__card');
    var cardElement = cardTemplate.cloneNode(true);
    cardElement.querySelector('.popup__avatar').src = card.author.avatar;
    cardElement.querySelector('.popup__title').textContent = card.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = card.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = card.offer.price + '₽/ночь';
    cardElement.querySelector('.popup__type').textContent = translateHouseType[card.offer.type];
    cardElement.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
    cardElement.querySelector('.popup__features').textContent = '';
    cardElement.querySelector('.popup__features').appendChild(renderFeatures(card.offer.features));
    cardElement.querySelector('.popup__description').textContent = card.offer.description;
    cardElement.querySelector('.popup__photos').textContent = '';
    cardElement.querySelector('.popup__photos').appendChild(renderPhotos(card.offer.photos));

    userMap.insertBefore(cardElement, document.querySelector('.map__filters-container'));
  };

  // закрытие карточки объявления
  var deleteCard = function () {
    var mapCard = document.querySelector('.map__card');
    if (mapCard) {
      mapCard.remove();
    }
    window.map.deactivatePin();
  };

  // закрытие карточки объявления при ESC
  document.addEventListener('keydown', function (evt) {
    window.utils.isEscEvent(evt, deleteCard);
  });

  window.card = {
    renderCard: renderCard,
    deleteCard: deleteCard
  };

})();
