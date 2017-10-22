var api = new XMLHttpRequest();
api.open('GET', 'https://randomuser.me/api/', false);
api.send();
var user = api.response;
user = JSON.parse(user);

var nameUser = user.results[0].name.first + ' ' + user.results[0].name.last;
var mail = user.results[0].email;
var dob = user.results[0].dob;
var locationStreet = user.results[0].location.street;
var phone = user.results[0].phone;
var password = user.results[0].login.password;
var img = user.results[0].picture.large;

function createCard() {
  
  var name = user.results[0].name.first + " " + user.results[0].name.last;
  var mail = user.results[0].email;

  var cardWrapper = document.createElement('div');
  cardWrapper.className = 'card__wrapper';

  var cardDetails = document.createElement('div');
  cardDetails.className = 'details';

  var userPhotoContent = document.createElement('div');
  userPhotoContent.className = 'user__photo';
  
  var userPhoto = document.createElement('img');
  userPhoto.setAttribute('src', img);
  userPhoto.setAttribute('alt', 'Avatar');
  
  var pUserTitle = document.createElement('p');
  pUserTitle.className = 'user__title';
  pUserTitle.innerText = 'Hi, My name is';

  var pUserValue = document.createElement('p');
  pUserValue.className = 'user__value';
  

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
  liArr[0].setAttribute('data-value', nameUser);
  liArr[0].setAttribute('data-title', 'Hi, My name is');
  pUserValue.innerText = nameUser;
  liArr[1].innerHTML = '<i class="fa fa-envelope" aria-hidden="true"></i>';
  liArr[1].setAttribute('data-value', mail);
  liArr[1].setAttribute('data-title', 'Mail is');
  liArr[2].innerHTML = '<i class="fa fa-calendar" aria-hidden="true"></i>';
  liArr[2].setAttribute('data-value', dob);
  liArr[2].setAttribute('data-title', 'Date is Birthday');
  liArr[3].innerHTML = '<i class="fa fa-map-marker" aria-hidden="true"></i>';
  liArr[3].setAttribute('data-value', locationStreet);
  liArr[3].setAttribute('data-title', 'My Street is');
  liArr[4].innerHTML = '<i class="fa fa-phone" aria-hidden="true"></i>';
  liArr[4].setAttribute('data-value', phone);
  liArr[4].setAttribute('data-title', 'My Phone is');
  liArr[5].innerHTML = '<i class="fa fa-unlock" aria-hidden="true"></i>';
  liArr[5].setAttribute('data-value', password);
  liArr[5].setAttribute('data-title', 'My Password is');

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
  
  
  // console.log(wrapper);
  
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
  const pValue = document.querySelector('.user__value');
  const pTitle = document.querySelector('.user__title');

  for (var i = 0; i < liCard.length; i++) {
    liCard[i].classList.remove('active');
  }

  if (!liCurrent.classList.contains('active')) {
    liCurrent.classList.add('active');
  }
  
  pValue.innerText = liCurrent.getAttribute('data-value');
  pTitle.innerText = liCurrent.getAttribute('data-title');
}

var newUserButton = document.querySelector('.new__user');


newUserButton.addEventListener('click', addItems);


