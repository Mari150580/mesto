/*Подключение*/
import { Card } from "./components/Card.js";
import { FormValidator } from "./components/FormValidator.js";
import { Section } from "./components/Section.js";
import { PopupWithForm } from "./components/PopupWithForm.js";
import { PopupWithImage } from "./components/PopupWithImage.js";
import { UserInfo } from "./components/UserInfo.js";
import { config, profileTitle, profileText } from "./utils/constants.js";
import "./styles/index.css";



/*Первый popup*/
const buttonEditProfile = document.querySelector(".profile__edit-button");
const formEditProfile = document.querySelector(".popup__form_edit-button");

/*Форма Профиля*/
const userNew = new UserInfo({profileTitle, profileText});

function submitEditProfileForm(data) {
  userNew.setUserInfo(data);
}



function handleEditFormSubmit(formItemObject) {
  submitEditProfileForm(formItemObject);
}

const popupEditCard = new PopupWithForm(
  ".popup_edit-button",
  ".popup__form_edit-button",
  handleEditFormSubmit
);
popupEditCard.setEventListeners();

buttonEditProfile.addEventListener("click", function () {
  popupEditCard.open();
  document.querySelector('.popup__input_type_job').value= document.querySelector('.profile__text').textContent;
  document.querySelector('.popup__input_type_name').value = document.querySelector('.profile__title').textContent;

});

/*Валидация формы*/

const formValidEditProfile = new FormValidator(config, formEditProfile);
formValidEditProfile.enableValidation();

/*Конец 1 popup*/

/*Добавление карточек*/

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

const formAddCard = document.querySelector(".popup__form_add-button");
const buttonAddCard = document.querySelector(".profile__add-button");

/*zoom*/

function handleImageOpenPopup(data) {
  popupZoomImage.open(data);
}

const popupZoomImage = new PopupWithImage(".popup_zoom");
popupZoomImage.setEventListeners();

/*добавление карточек*/

function createCard(data) {
  const card = new Card({ data, handleImageOpenPopup }, ".elements-template");
  return card.generateCard();
}

const section = new Section(".elements", (dataElements) => {
  section.addItem(createCard(dataElements));
});

section.rendererItem(initialCards);

/*Форма Новое место*/

function handleAddFormSubmit(formItemObject) {
  section.addItem(createCard(formItemObject));
}

const popupAddCard = new PopupWithForm(
  ".popup_add-button",
  ".popup__form_add-button",
  handleAddFormSubmit
);
popupAddCard.setEventListeners();

buttonAddCard.addEventListener("click", function () {
  popupAddCard.open();
});

/*Валидация формы Новое место*/
const formValidAddCard = new FormValidator(config, formAddCard);
formValidAddCard.enableValidation();
