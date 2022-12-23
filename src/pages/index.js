/*Подключение*/
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { UserInfo } from "../components/UserInfo.js";
import { config, profileTitle, profileText,  pofileAvatar} from "../utils/constants.js";
import "./index.css";
import { Api } from "../components/Api.js";


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
const buttonPopup = document.querySelector(".popup__button");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_job");


/*Форма Профиля*/
const userNew = new UserInfo({profileText, 
  profileTitle, 
  pofileAvatar});

/*1.получение id и загрузка данных*/

api.getAllInfo()
.then(([profileData, postAllCards]) => {
  userId = profileData._id;
  section.rendererItem(postAllCards);
  userNew.setUserInfo(profileData);
  
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
  const initialText = buttonPopup.textContent;
  buttonPopup.textContent = 'Сохранение...';

  api.addNewProfile(formItemObject)
  .then((res) => { 
    userNew.setUserInfo(res);
    popupEditCard.close();
  })
  .finally(() => {
    buttonPopup.textContent = initialText
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
  const {name, about} = userNew.getUserInfo();
  nameInput.value = name;
  jobInput.value =about;
});


/*Изменение аватарки*/

const buttonAvatar = document.querySelector(".profile__avatar");
const formAvatar = document.querySelector(".popup__form_changing-avatar");
const avatarRemove = document.querySelector(".popup__button-avatar")


const formValidAvatar = new FormValidator(config, formAvatar);
formValidAvatar.enableValidation();

const popupAvatar = new PopupWithForm(
".popup_changing-avatar", 
".popup__form_changing-avatar",
 handleAvatarClick);
popupAvatar.setEventListeners();


function handleAvatarClick(data) {
  const initialText = avatarRemove.textContent;
  avatarRemove.textContent = 'Сохранение...';
  api.addNewAvatar(data.avatar)
  .then((res) => { 
    userNew.setUserInfo(res);
    popupAvatar.close();
  })
  .finally(() => {
    avatarRemove.textContent = initialText;
  })
  .catch(function(err){
    console.log('Ошибка', err);
  });
  
}



buttonAvatar.addEventListener("click", function () {
  popupAvatar.open();
  formValidAvatar.disabledButton();
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
    popupRemove.close();
  })
  .catch(function(err){
    console.log('Ошибка', err);
  });
})
};

/*постановка лайка*/

function putLikeCard(instance) {
  api.changeLike(instance.getId(), instance.isLiked())
  .then(dataCardServer => {
    instance.resetLikeData(dataCardServer)
  })
  .catch(function(err){
    console.log('Ошибка', err);
  });
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

/*Форма Новое место добавление новой карточки*/

/*1.Валидация формы Новое место*/
const formValidAddCard = new FormValidator(config, formAddCard);
formValidAddCard.enableValidation();

const buttonCardRemove = document.querySelector(".popup__button-add")

/*2.добавление новой карточки*/
function handleAddFormSubmit( formItemObject) {
  const initialText = buttonCardRemove.textContent;
  buttonCardRemove.textContent = 'Создание...';
  api.addNewTasks(formItemObject)
  .then((data) => { 
    section.addItem(createCard(data));
    popupAddCard.close();
  })
  .finally(() => {
    buttonCardRemove.textContent = initialText
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