'use strict';

(function () {

  var constants = window.constants;
  var filters = document.querySelector('.map__filters');

  var updateData = function (adverts) {

    var selectedPins = adverts.slice();

    var select = filters.querySelectorAll('select');
    var features = filters.querySelectorAll('input[type = checkbox]:checked');

    var FilterRules = {
      'houseType': 'type',
      'quantityRooms': 'rooms',
      'quantityGuests': 'guests'
    };

    var filterValue = function (element, property) {
      return selectedPins.filter(function (newData) {
        return newData.offer[property].toString() === element.value;
      });
    };

    // фильтрация по цене
    var filterPrice = function () {
      return selectedPins.filter(function (newData) {

        var filterPriceValues = {
          'low': newData.offer.price <= constants.FILTER_PRICE_MIN,
          'middle': newData.offer.price >= constants.FILTER_PRICE_MIN && newData.offer.price <= constants.FILTER.PRICE_MAX,
          'high': newData.offer.price >= constants.FILTER_PRICE_MAX
        };
        return filterPriceValues[filterPrice.value];
      });
    };

    // фильтрация по удобствам
    var filterFeatures = function (item) {
      return selectedPins.filter(function (newData) {
        return newData.offer.features.indexOf(item.value) >= 0;
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
      selectedPins.forEach(function (item) {
        window.map.renderPin(item);
      });
    }
  };

  var successHandler = function (data) {
    var adverts = data;
    data.forEach(function (item) {
      window.map.renderPin(item);
    });
  };

  // клик на фильтре
  var onFilterChange = function (adverts) {
    window.card.deleteCard();
    window.map.resetPins();
    window.utils.debounce(updateData(adverts));
  };

  filters.addEventListener('change', onFilterChange);

  window.filter = {
    successHandler: successHandler
  };

})();
