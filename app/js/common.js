var api = new XMLHttpRequest();
api.open('GET', 'https://randomuser.me/api/', false);
api.send();
// var result = api.response;
// console.log(result);
// console.log(result.results['gender']);

function createCard() {
  var cardWrapper = document.createElement('div');
  cardWrapper.className = 'card__wrapper';

  var cardDetails = document.createElement('div');
  cardDetails.className = 'details';

  var userPhotoContent = document.createElement('div');
  userPhotoContent.className = 'user__photo';
  
  var userPhoto = document.createElement('img');
  userPhoto.setAttribute('src', 'https://randomuser.me/api/portraits/women/5.jpg');
  userPhoto.setAttribute('alt', 'Avatar');
  
  var pUserTitle = document.createElement('p');
  pUserTitle.className = 'user__title';
  pUserTitle.innerText = 'Hi, My name is';

  var pUserValue = document.createElement('p');
  pUserValue.className = 'user__value';
  pUserValue.innerText = 'loretta patterson';

  var ulCard = document.createElement('ul');
  ulCard.className = 'card__list';

  var liArr = [];
  for (var i = 0; i < 6; i++) {
    var liCard = document.createElement('li');
    liCard.className = 'card__item';
    liArr.push(liCard);

    for (var j = 0; j < liArr.length; j++) {
      ulCard.appendChild(liArr[i]);
    }
  }
  liArr[0].innerHTML = '<i class="fa fa-user" aria-hidden="true"></i>';
  liArr[0].classList.add('active');
  liArr[1].innerHTML = '<i class="fa fa-envelope" aria-hidden="true"></i>';
  liArr[2].innerHTML = '<i class="fa fa-calendar" aria-hidden="true"></i>';
  liArr[3].innerHTML = '<i class="fa fa-map-marker" aria-hidden="true"></i>';
  liArr[4].innerHTML = '<i class="fa fa-phone" aria-hidden="true"></i>';
  liArr[5].innerHTML = '<i class="fa fa-unlock" aria-hidden="true"></i>';
  

  cardWrapper.appendChild(cardDetails);
  cardDetails.appendChild(userPhotoContent);
  userPhotoContent.appendChild(userPhoto);
  cardDetails.appendChild(pUserTitle);
  cardDetails.appendChild(pUserValue);
  cardWrapper.appendChild(ulCard);

  bindEvents(cardWrapper, liArr);

  return cardWrapper;
}

function addItems() {
  const wrapper = document.querySelector('.card__wrapper');
  console.log(wrapper);
  
  if (wrapper) {
    wrapper.remove();
  }
  const itemCard = createCard();
  document.body.appendChild(itemCard);
}

function bindEvents(cardItem, liItems) {
  for (let i = 0; i < liItems.length; i++) {
    liItems[i].addEventListener('click', clickLi);
  }
}

function clickLi() {
  var liCurrent = this;
  var liCard = document.querySelectorAll('.card__item');

  for (var i = 0; i < liCard.length; i++) {
    liCard[i].classList.remove('active');
  }

  if (!liCurrent.classList.contains('active')) {
    liCurrent.classList.add('active');
  }
}

var newUserButton = document.querySelector('.new__user');


newUserButton.addEventListener('click', addItems);


