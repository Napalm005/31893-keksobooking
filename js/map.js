var hotels = [];
var titles = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var typeArray = ['palace', 'flat', 'house', 'bungalo'];
var checkinArray = ['12:00', '13:00', '14:00'];
var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];


for (var i = 0; i < 8; i++) {
  var hotel = {
    'author': {
      'avatar': 'img/avatars/user-0' + (i + 1) + '.png'
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
  var rand = min - 0.5 + Math.random() * (max - min + 1)
  rand = Math.round(rand);
  return rand;
}

function compareRandom(a, b) {
  return Math.random() - 0.5;
}

console.log(hotels);


