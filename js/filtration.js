'use strict';

(function () {

  var constants = window.constants;
  var filterContainer = document.querySelector('.map__filters-container');
  var select = filterContainer.querySelectorAll('select');
  var features = filterContainer.querySelectorAll('input[type = checkbox]:checked');

  var selectedPins = [];

  var successHandler = function (data) {
    selectedPins = data.slice();
    return selectedPins;
  };

  window.backend.load(successHandler, window.backend.errorHandler);

  var selectPin = function (adverts) {
    selectedPins = adverts;
    var FilterRules = {
      'houseType': 'type',
      'quantityRooms': 'rooms',
      'quantityGuests': 'guests'
    };

    var filterValue = function (element, property) {
      return selectedPins.filter(function (card) {
        return card.offer[property].toString() === element.value;
      });
    };

    // фильтрация по цене
    var filterPrice = function () {
      return selectedPins.filter(function (card) {

        var filterPriceValues = {
          'low': card.offer.price <= constants.FILTER_PRICE_MIN,
          'middle': card.offer.price >= constants.FILTER_PRICE_MIN && card.offer.price <= constants.FILTER.PRICE_MAX,
          'high': card.offer.price >= constants.FILTER_PRICE_MAX
        };
        return filterPriceValues[filterPrice.value];
      });
    };

    // фильтрация по удобствам
    var filterFeatures = function (item) {
      return selectedPins.filter(function (card) {
        return card.offer.features.indexOf(item.value) >= 0;
      });
    };

    if (select.length !== null) {
      select.forEach(function (item) {
        if (item.value !== 'any') {
          if (item.id !== 'housing-price') {
            selectedPins = filterValue(item, FilterRules[item.id]);
          } else {
            selectedPins = filterPrice(item);
          }
        }
      });
    }

    if (features !== null) {
      features.forEach(function (item) {
        selectedPins = filterFeatures(item);
      });
    }

    if (selectedPins.length) {
      window.map.renderPinFragment(selectedPins);
    }
  };

  // клик на фильтре
  var onFilterChange = function (adverts) {
    window.card.deleteCard();
    window.map.resetPins();
    window.utils.debounce(selectPin(adverts));
  };

  filterContainer.addEventListener('change', onFilterChange);

})();
