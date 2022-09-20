/*Подключение*/
import {Card} from './Card.js'
import {FormValidator} from './formValidator.js'
import {Section} from './Section.js'
import {PopupWithForm} from './PopupWithForm.js';
import {PopupWithImage} from './PopupWithImage.js';
import {UserInfo} from './UserInfo.js';
import "./styles/index.css";

/*Первый popup*/
const editButton = document.querySelector('.profile__edit-button');
const formEditProfile = document.querySelector('.popup__form_edit-button');

const profile = {
  profileTitle: '.profile__title',
  profileText: '.profile__text',
}

/*Данные формы*/
const config = {
  formElement: '.popup__form',
  inputPopup: '.popup__input',
  buttonElement: '.popup__button',
  inactiveButton: 'button_inactive',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__error_visible',
  inputConteinerInvalid: 'input-conteiner__invalid',
  conteinerInput: '.input-conteiner'
}; 

/*Форма Профиля*/
function submitEditProfileForm(data) {
  UserInfoNew.getUserInfo(data);
};

const UserInfoNew = new UserInfo(profile);

function handleEditFormSubmit(formItemObject){
  submitEditProfileForm(formItemObject);
};

 const PopupEditCard = new PopupWithForm('.popup_edit-button', '.popup__form_edit-button', handleEditFormSubmit);
 PopupEditCard.setEventListeners();

 editButton.addEventListener('click', function () {
   PopupEditCard.open();
 });

/*Валидация формы*/

const formValidEditProfile = new FormValidator(config, formEditProfile);
  formValidEditProfile.enableValidation();
 
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

const formAddCard = document.querySelector('.popup__form_add-button');
const addButton = document.querySelector('.profile__add-button');

/*zoom*/

function handleImageOpenPopup(data){
  PopupZoomImage.open(data);
};

const PopupZoomImage = new PopupWithImage('.popup_zoom');
PopupZoomImage.setEventListeners();

/*добавление карточек*/

function createCard(data) {
  const card = new Card({data, handleImageOpenPopup}, '.elements-template');
  return card.generateCard();
}

const section = new Section('.elements', (dataElements) =>{
  section.addItem(createCard(dataElements))
});

section.rendererItem(initialCards);

/*Форма Новое место*/

function handleAddFormSubmit(formItemObject){
  section.addItem(createCard(formItemObject));
};

const PopupAddCard = new PopupWithForm('.popup_add-button', '.popup__form_add-button', handleAddFormSubmit);
 PopupAddCard.setEventListeners();

 addButton.addEventListener('click', function () {
  PopupAddCard.open();
});

/*Валидация формы Новое место*/
const formValidAddCard = new FormValidator(config, formAddCard);
formValidAddCard.enableValidation();