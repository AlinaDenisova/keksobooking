'use strict';

(function () {

  var constants = window.constants;
  var form = document.querySelector('.ad-form');
  var avatarDropZone = form.querySelector('.ad-form-header__drop-zone');
  var avatarChooser = form.querySelector('.ad-form-header__input');
  var avatarPreview = form.querySelector('.ad-form-header__preview img');
  var housePhotoContainer = form.querySelector('.ad-form__photo-container');
  var housePhotoDropZone = housePhotoContainer.querySelector('.ad-form__drop-zone');
  var housePhotoChooser = housePhotoContainer.querySelector('.ad-form__upload input[type=file]');
  var housePhotoPreview = housePhotoContainer.querySelector('.ad-form__photo');

  // соответствие файла загрузки
  var matchFileType = function (files, action) {
    Array.from(files).forEach(function (item) {
      var reader = new FileReader();
      var fileName = item.name.toLowerCase();
      var matches = constants.FILE_TYPES.some(function (it) {
        return fileName.endsWith(it);
      });
      if (matches) {
        reader.readAsDataURL(item);
        reader.addEventListener('load', function () {
          action(reader.result);
        });
      }
    });
  };

  // выбор файла перетаскиванием
  var onZoneDragOver = function (evt) {
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'copy';
  };

  // загрузка аватарки
  var loadAvatar = function (value) {
    avatarPreview.src = value;
  };

  // загрузка фото жилья
  var loadHousePhoto = function (value) {
    housePhotoPreview.classList.remove('ad-form__photo--main');
    var housePhotoPreviewNode = housePhotoPreview.cloneNode(true);
    housePhotoPreviewNode.insertAdjacentHTML('beforeend', '<img src="' + value + '" width="70" height="70" alt="Фотография жилья">');
    housePhotoContainer.appendChild(housePhotoPreviewNode);
  };

  var onAvatarChange = function (evt) {
    matchFileType(evt.target.files, loadAvatar);
  };

  var onAvatarZoneDrop = function (evt) {
    evt.preventDefault();
    matchFileType(evt.dataTransfer.files, loadAvatar);
  };

  var onHousePhotoChange = function (evt) {
    matchFileType(evt.target.files, loadHousePhoto);
  };

  var onHousePhotoZoneDrop = function (evt) {
    evt.preventDefault();
    matchFileType(evt.dataTransfer.files, loadHousePhoto);
  };

  // добавить обработчики событий на поля загрузки
  var addImageListeners = function () {
    avatarChooser.addEventListener('change', onAvatarChange);
    avatarDropZone.addEventListener('dragover', onZoneDragOver);
    avatarDropZone.addEventListener('drop', onAvatarZoneDrop);

    housePhotoChooser.addEventListener('change', onHousePhotoChange);
    housePhotoDropZone.addEventListener('dragover', onZoneDragOver);
    housePhotoDropZone.addEventListener('drop', onHousePhotoZoneDrop);
  };

  // удалить обработчики событий с полей загрузки
  var deleteImageListeners = function () {
    avatarChooser.removeEventListener('change', onAvatarChange);
    avatarDropZone.removeEventListener('dragover', onZoneDragOver);
    avatarDropZone.removeEventListener('drop', onAvatarZoneDrop);

    housePhotoChooser.removeEventListener('change', onHousePhotoChange);
    housePhotoDropZone.removeEventListener('dragover', onZoneDragOver);
    housePhotoDropZone.removeEventListener('drop', onHousePhotoZoneDrop);
  };

  // удаление файлов
  var deleteImages = function () {
    housePhotoPreview.classList.add('ad-form__photo--main');
    avatarPreview.src = constants.AVATAR_SRC;
    var housePhotos = housePhotoContainer.querySelectorAll('.ad-form__photo:not(.ad-form__photo--main)');
    housePhotos.forEach(function (item) {
      item.remove();
    });
  };

  window.images = {
    addImageListeners: addImageListeners,
    deleteImageListeners: deleteImageListeners,
    deleteImages: deleteImages
  };

})();
