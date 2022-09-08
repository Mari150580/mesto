/*Подключение*/
import {Card} from './card.js'
import {FormValidator} from './formValidator.js'


/*Первый popup*/

const editButton = document.querySelector('.profile__edit-button');
const popupEditProfile = document.querySelector('.popup_edit-button');
/*const popupEditProfileCloseButton = document.querySelector('.popup__close');*/
const nameTitleElement = document.querySelector('.popup__input_type_name');
const textElement = document.querySelector('.profile__text');
const professiontextElement = document.querySelector('.popup__input_type_job');
const formEditProfile = document.querySelector('.popup__form_edit-button');
const titleElement = document.querySelector('.profile__title');

function openPopup(popupElement) {
  popupElement.classList.add('popup_opened'); 
  document.addEventListener('keydown', closeByEscape);
  document.addEventListener('click', closeByMous);
}

editButton.addEventListener('click', function () {
  /*const inputList = Array.from(formEditProfile.querySelectorAll('.popup__input'));
  const buttonElement = formEditProfile.querySelector('.popup__button');
  toggleButtonState(inputList, buttonElement, config);*/
  openPopup(popupEditProfile);
  nameTitleElement.value = titleElement.textContent;
  professiontextElement.value = textElement.textContent;

  const eventInput = new Event("input");
  nameTitleElement.dispatchEvent(eventInput);
  professiontextElement.dispatchEvent(eventInput);
});

function submitEditProfileForm(event) {
  event.preventDefault();
  titleElement.textContent = nameTitleElement.value;
  textElement.textContent = professiontextElement.value;
  closePopup(popupEditProfile);
};

formEditProfile.addEventListener('submit', submitEditProfileForm);

/*Закрытие popup popupEditProfile*/

function closePopup(popupElement) {
  popupElement.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscape); 
  document.removeEventListener('click', closeByMous);
};

function closeByMous(evt) {

  if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
     const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}; 

 function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
};

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

/*const cardTemplateElement = document.querySelector('.elements-template');
const cardElements = document.querySelector('.elements');*/
const addButton = document.querySelector('.profile__add-button');
const popupZoom = document.querySelector('.popup_zoom');
const popupZoomElementImage = document.querySelector('.popup__image');
const popupZoomHeading = document.querySelector('.popup__heading');
/*const popupZoomClose = document.querySelector('.popup__close_zoom');

const getCardByElement = e => e.currentTarget.closest('.element');*/

  const cardImage = item => {
    const card = new Card(item.name, item.link);
    const cardElement = card.generateCard();
    document.querySelector('.elements').prepend(cardElement);
  }; 
  
  initialCards.forEach(cardImage);

  /*Данные формы*/
const config = {
  formElement: '.popup__form',
  inputElement: '.popup__input',
  buttonElement: '.popup__button',
  inactiveButton: 'button_inactive',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__error_visible',
  inputConteinerInvalid: 'input-conteiner__invalid',
  conteinerInput: '.input-conteiner'
}; 
const formAddCard = document.querySelector('.popup__form_add-button');
const pointElementTitle = formAddCard.querySelector('.popup__input_type_point');
const photoImageElement = formAddCard.querySelector('.popup__input_type_image');
/*const formValidAddCard = new FormValidator(config, formAddCard);
formValidAddCard.enableValidation();*/







/*Открытие и закрытие add-button*/

const popupAddButton = document.querySelector('.popup_add-button');
/*const popupCloseButtonAddButton = document.querySelector('.popup__close_add-button');*/

addButton.addEventListener('click', function () {
  const formValidAddCard = new FormValidator(config, formAddCard);
formValidAddCard.enableValidation();
  /*formAddCard.reset();
  const inputList = Array.from(formAddCard.querySelectorAll('.popup__input'));
  const buttonElement = formAddCard.querySelector('.popup__button');
  toggleButtonState(inputList, buttonElement, config);*/
  openPopup(popupAddButton);

});




formAddCard.addEventListener('submit', submitAddCardForm);


function submitAddCardForm(e) {
  e.preventDefault();
  const newCart = {
    name: pointElementTitle.value,
    link: photoImageElement.value,
  }
  cardImage(newCart);
  formAddCard.reset();
  closePopup(popupAddButton);
};

export {popupZoomElementImage, popupZoomHeading, openPopup, popupZoom};