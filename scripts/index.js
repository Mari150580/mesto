/*Первый popup*/

const editButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const popupCloseButton = document.querySelector('.popup__close');
const nameTitleElement = document.querySelector('.popup__input_type_name');
const textElement = document.querySelector('.profile__text');
const professiontextElement = document.querySelector('.popup__input_type_job');
const formElement = document.querySelector('.popup__form');
const titleElement = document.querySelector('.profile__title');

function openPopup(popupElement) {
  popupElement.classList.add('popup_usopen');
}

editButton.addEventListener('click', function () {
  openPopup(popup);
  nameTitleElement.value = titleElement.textContent;
  professiontextElement.value = textElement.textContent
})

function formSubmitHandler(event) {
  event.preventDefault();
  titleElement.textContent = nameTitleElement.value;
  textElement.textContent = professiontextElement.value;
  closePopup(popup);
}
formElement.addEventListener('submit', formSubmitHandler)

popupCloseButton.addEventListener('click', function () {
  closePopup(popup);
})
function closePopup(popupElement) {
  popup.classList.remove('popup_usopen');
}

/*Конец 1 popup*/


/*Добавление карточек*/

const initialCards = [

  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const cardTemplateElement = document.querySelector('.elements-template');
const cardElements = document.querySelector('.elements');
const formElementAddButton = document.querySelector('.popup__form_add-button')
const addButton = document.querySelector('.profile__add-button');
const pointElementTitle = formElementAddButton.querySelector('.popup__input_type_point');
const photoImageElement = formElementAddButton.querySelector('.popup__input_type_image');


const getCardByElement = e => e.currentTarget.parentElement.closest('.element');

/*Открытие zoom-popup*/
function openZoomPopup(popupElement) {
  popupElement.classList.add('popup-zoom_open');
};

/*Закрытие zoom-popup*/

const popupZoomClose = document.querySelector('.popup-zoom__close');

function closePopupZoom (popupElement) {
  popupElement.classList.remove('popup-zoom_open');
};

popupZoomClose.addEventListener('click', function() {
  closePopupZoom(popupZoom);
});

const createCard = item => {
  const card = cardTemplateElement.content
    .querySelector('.element')
    .cloneNode(true);
  card.querySelector('.element__title').textContent = item.name;
  card.querySelector('.element__image').src = item.link

/*удаление*/
card.querySelector('.element__baskets').addEventListener('click', e =>  {
  const card = getCardByElement(e);
  card.remove();
});

/*Лайк*/

card.querySelector('.element__group').addEventListener('click', e =>  {
const like = e.currentTarget.classList.toggle('element__group_active');
});

/*zoom-popup работа*/

card.querySelector('.element__image').addEventListener('click', evt =>  {
  const image = evt.target;
  const elementContainer = image.closest('.element');
  const title = elementContainer.querySelector('.element__title');
  console.log(title);

  popupZoomElementImage.src = image.src;
  popupZoomTitle.textContent = title.textContent;

  openZoomPopup(popupZoom);
});

  return card;
};

const addCard = item => {
  const card = createCard(item);
  cardElements.prepend(card);
};

initialCards.forEach(addCard);

const handleCardSubmit = e => {
  e.preventDefault();
   const newCart = {
    name: pointElementTitle.value,
    link: photoImageElement.value,
  }
  addCard(newCart);
  formElementAddButton.reset();
}

formElementAddButton.addEventListener('submit', handleCardSubmit);

/*Создание попапа картинки*/
/*Открытие popup-card*/

const popupZoom = document.querySelector('.popup-zoom');
const popupZoomElementImage = document.querySelector('.popup-zoom__image');
const popupZoomTitle = document.querySelector('.popup-zoom__title');


/*Открытие и закрытие add-button*/


const popupAddButton = document.querySelector('.popup_add-button');
const popupCloseButtonAddButton = document.querySelector('.popup__close_add-button');

addButton.addEventListener('click', function () {
  openPopup(popupAddButton);
});

formElementAddButton.addEventListener('submit', formSubmitHandlerAdd);

function formSubmitHandlerAdd(event) {
  event.preventDefault();
  closePopup(popupAddButton);
};

function closePopup(popupElement) {
  popupElement.classList.remove('popup_usopen');
};

popupCloseButtonAddButton.addEventListener('click', function () {
  closePopup(popupAddButton);
});
