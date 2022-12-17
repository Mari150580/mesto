/*Подключение*/
import { Card } from "./components/Card.js";
import { FormValidator } from "./components/FormValidator.js";
import { Section } from "./components/Section.js";
import { PopupWithForm } from "./components/PopupWithForm.js";
import { PopupWithImage } from "./components/PopupWithImage.js";
import { UserInfo } from "./components/UserInfo.js";
import { config, profileTitle, profileText,  pofileAvatar} from "./utils/constants.js";
import "./styles/index.css";
import { Api } from "./components/api.js";

/*Api*/

const configs = {
  url:'https://mesto.nomoreparties.co/v1/cohort-54',
  headers: {
      "content-type":"application/json",
      authorization:' b84c7223-66c7-4859-b33f-9b1c192b5f07'
  }
}
const api = new Api(configs);

/*Первый popup*/
const buttonEditProfile = document.querySelector(".profile__edit-button");
const formEditProfile = document.querySelector(".popup__form_edit-button");


/*Форма Профиля*/
const userNew = new UserInfo({profileText, 
  profileTitle, 
  pofileAvatar});

/*1.загрузка данных с сервера*/
api.getAllProfile()
  .then(function(data){
    userNew.setUserInfo(data);
  })
  .catch(function(err){
    console.log('Ошибка', err);
  });

/*2.редактирование профиля*/

/*a. валидация формы*/
const formValidEditProfile = new FormValidator(config, formEditProfile);
formValidEditProfile.enableValidation();

/*Отправка запроса на сервер и смена данных пользователя*/
function handleEditFormSubmit(formItemObject) {
  api.addNewProfile(formItemObject)
  .then((res) => { 
    userNew.setUserInfo(res);
  })
  .catch(function(err){
    console.log('Ошибка', err);
  });
};

const popupEditCard = new PopupWithForm(
  ".popup_edit-button",
  ".popup__form_edit-button",
    handleEditFormSubmit
);
popupEditCard.setEventListeners();

buttonEditProfile.addEventListener("click", function () {
  popupEditCard.open();
  formValidEditProfile.disabledButton();
  userNew.getUserInfo();
});


/*Изменение аватарки*/

const buttonAvatar = document.querySelector(".profile__avatar");
const formAvatar = document.querySelector(".popup__form_changing-avatar");


const formValidAvatar = new FormValidator(config, formAvatar);
formValidAvatar.enableValidation();

const popupAvatar = new PopupWithForm(
".popup_changing-avatar", 
".popup__form_changing-avatar",
 handleAvatarClick);
popupAvatar.setEventListeners();


function handleAvatarClick(data) {
  api.addNewAvatar(data.avatar)
  .then((res) => { 
    userNew.setUserInfo(res);
  })
  .catch(function(err){
    console.log('Ошибка', err);
  });
  
}

buttonAvatar.addEventListener("click", function () {
  popupAvatar.open();
  formValidAvatar.disabledButton();
  userNew.getUserInfo();
});

/*zoom*/

function handleImageOpenPopup(data) {
  popupZoomImage.open(data);
}

/*удаление*/

const popupRemove = new PopupWithForm(".popup_remove", ".popup__form_remove");
popupRemove.setEventListeners();

function handleRemoveClick(cardInstance) {
  popupRemove.open();
  popupRemove.changeSubmitHandler(() => {
  api.removeCard(cardInstance.getId())
  .then(() => {
    cardInstance.remove();
  })
})
};

/*постановка лайка*/

function putLikeCard(instance) {
  api.changeLike(instance.getId(), instance.isLiked())
  .then(dataCardServer => {
    instance.resetLikeData(dataCardServer)
  })
}

const popupZoomImage = new PopupWithImage(".popup_zoom");
popupZoomImage.setEventListeners();

/*b действия с карточками*/
function createCard(data) {
  const card = new Card ({ data, handleImageOpenPopup, handleRemoveClick, userId, putLikeCard,
}, ".elements-template");

  return card.generateCard();  
}

/*Добавление карточек*/
const formAddCard = document.querySelector(".popup__form_add-button");
const buttonAddCard = document.querySelector(".profile__add-button");

/*а.Api загрузка карточек с сервера*/

let userId = null;


const section = new Section(".elements", (dataElements) => {
  section.addItem(createCard(dataElements));
});

/*получение id и загрузка данных*/

api.getAllInfo()
.then(([profileData, postAll]) => {
  userId = profileData._id;
  section.rendererItem(postAll);
})
.catch(function(err){
  console.log('Ошибка', err);
});



/*Форма Новое место добавление новой карточки*/

/*1.Валидация формы Новое место*/
const formValidAddCard = new FormValidator(config, formAddCard);
formValidAddCard.enableValidation();

/*2.добавление новой карточки*/
function handleAddFormSubmit( formItemObject) {
  api.addNewTasks(formItemObject)
  .then((data) => { 
    section.addItem(createCard(data));
  })
  .catch(function(err){
    console.log('Ошибка', err);
  });
};

const popupAddCard = new PopupWithForm(".popup_add-button", ".popup__form_add-button", handleAddFormSubmit);
popupAddCard.setEventListeners();

buttonAddCard.addEventListener("click", function () {
  popupAddCard.open();
  formValidAddCard.disabledButton();
});



