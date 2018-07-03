'use strict';

var hotels = [];
var titles = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var typeArray = ['palace', 'flat', 'house', 'bungalo'];
var checkinArray = ['12:00', '13:00', '14:00'];
var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var typeAppartaments = {
  palace: 'Дворец',
  bungalo: 'Бунгало',
  flat: 'Квартира',
  house: 'Дом'
};

for (var i = 0; i <= 7; i++) {
  var hotel = {
    'author': {
      'avatar': 'img/avatars/user0' + (i + 1) + '.png'
    },
    'offer': {
      'title': titles[i],
      'address': randomInteger(350, 600) + ', ' + randomInteger(350, 600),
      'price': randomInteger(1000, 1000000),
      'type': typeArray[randomInteger(0, 3)],
      'rooms': randomInteger(1, 5),
      'guests': randomInteger(1, 8),
      'checkin': checkinArray[randomInteger(0, 2)],
      'checkout': checkinArray[randomInteger(0, 2)],
      'features': features.slice(randomInteger(0, 3), randomInteger(3, 6)),
      'description': '',
      'photos': photos.sort(compareRandom)
    },
    'location': {
      'x': randomInteger(130, 630),
      'y': randomInteger(130, 630)
    }
  };

  hotels.push(hotel);
}

function randomInteger(min, max) {
  var rand = min - 0.5 + Math.random() * (max - min + 1);
  rand = Math.round(rand);
  return rand;
}

function compareRandom() {
  return Math.random() - 0.5;
}

var mapPins = document.querySelector('.map__pins');
var map = document.querySelector('.map');

var template = document.querySelector('template');
var similarPinTemplate = template.content.querySelector('.map__pin');
var similarCardTemplate = template.content.querySelector('.map__card');

var renderFeatures = function (featuresList) {
  var featuresStr = '';
  for (var k = 0; k < featuresList.length; k++) {
    featuresStr += '<li class="popup__feature popup__feature--' + featuresList[k] + '"></li>';
  }
  return featuresStr;
};

var renderImages = function (imagesList) {
  var imagesStr = '';
  for (var k = 0; k < imagesList.length; k++) {
    imagesStr += '<img src="' + imagesList[k] + '" class="popup__photo" width="45" height="40" alt="Фотография жилья">';
  }
  return imagesStr;
};

var renderPin = function (pin) {
  var pinElement = similarPinTemplate.cloneNode(true);

  pinElement.style.left = pin.location.x + 'px';
  pinElement.style.top = pin.location.y + 'px';
  pinElement.style.transform = 'translate(-50%,-50%)';

  var pinElementImg = pinElement.querySelector('img');
  pinElementImg.src = pin.author.avatar;
  pinElementImg.alt = pin.offer.title;

  return pinElement;
};

var renderCard = function (card) {
  var cardElement = similarCardTemplate.cloneNode(true);

  cardElement.querySelector('.popup__title').innerHTML = card.offer.title;
  cardElement.querySelector('.popup__text--address').innerHTML = card.offer.address;
  cardElement.querySelector('.popup__text--price').innerHTML = card.offer.price + '₽/ночь';
  cardElement.querySelector('.popup__type').innerHTML = typeAppartaments[card.offer.type];
  cardElement.querySelector('.popup__text--capacity').innerHTML = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').innerHTML = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
  cardElement.querySelector('.popup__features').innerHTML = renderFeatures(card.offer.features);
  cardElement.querySelector('.popup__description').innerHTML = card.offer.description;
  cardElement.querySelector('.popup__photos').innerHTML = renderImages(card.offer.photos);
  cardElement.querySelector('.popup__avatar').src = card.author.avatar;

  return cardElement;
};


var fragment = document.createDocumentFragment();
for (var index = 0; index < hotels.length; index++) {
  fragment.appendChild(renderPin(hotels[index]));
}
mapPins.appendChild(fragment);

map.appendChild(renderCard(hotels[0]));

map.classList.remove('map--faded');
