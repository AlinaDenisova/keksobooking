'use strict';
(function () {

  var userMap = document.querySelector('.map');
  var cardActive;

  // отрисовка карточки объявления
  var renderCard = function (card) {

    var translateHouseType = {
      flat: 'Квартира',
      bungalo: 'Бунгало',
      house: 'Дом',
      palace: 'Дворец'
    };

    var cardTemplate = document.querySelector('template')
      .content
      .querySelector('.map__card');
    var cardElement = cardTemplate.cloneNode(true);
    var closeButton = cardElement.querySelector('.popup__close');
    cardElement.querySelector('.popup__avatar').src = card.author.avatar;
    cardElement.querySelector('.popup__title').textContent = card.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = card.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = card.offer.price + '₽/ночь';
    cardElement.querySelector('.popup__type').textContent = translateHouseType[card.offer.type];
    cardElement.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
    cardElement.querySelector('.popup__features').textContent = '';
    card.offer.features.forEach(function (item) {
      cardElement.querySelector('.popup__features').insertAdjacentHTML('beforeend', '<li class="popup__feature popup__feature--' + item + '"></li>');
    });
    cardElement.querySelector('.popup__description').textContent = card.offer.description;
    cardElement.querySelector('.popup__photos').textContent = '';
    card.offer.photos.forEach(function (item) {
      cardElement.querySelector('.popup__photos').insertAdjacentHTML('beforeend', '<img src="' + item + '" class="popup__photo" width="40" height="40" alt="Фотография жилья">');
    });

    closeButton.addEventListener('click', function () {
      deleteCard();
    });

    return cardElement;
  };

  var showCard = function (card) {
    deleteCard();
    cardActive = userMap.insertBefore(renderCard(card), document.querySelector('.map__filters-container'));
  };

  // закрытие карточки объявления
  var deleteCard = function () {
    if (cardActive) {
      cardActive.remove();
    }
    window.map.deactivatePin();
  };

  // закрытие карточки объявления при ESC
  document.addEventListener('keydown', function (evt) {
    window.utils.isEscEvent(evt, deleteCard);
  });

  window.card = {
    deleteCard: deleteCard,
    showCard: showCard
  };

})();
