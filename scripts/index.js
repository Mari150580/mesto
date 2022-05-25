const editButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const popupCloseButton = document.querySelector('.popup__close');
const titleElement = document.querySelector('.profile__title');
const nameTitleElement = document.querySelector('.popup__input_name');
const textElement = document.querySelector ('.profile__text');
const professiontextElement = document.querySelector ('.popup__input_profession');
const formElement = document.querySelector('.popup__form');

function openPopup(popupElement) {
    popupElement.classList.add('popup_usOpen');
}

editButton.addEventListener('click', function() {
    openPopup(popup);
})

function closePopup(popupElement) {
    popup.classList.remove('popup_usOpen');
}

popupCloseButton.addEventListener('click', function() {
    closePopup(popup);
})

formElement.addEventListener('submit', function(event){
    event.preventDefault();
    titleElement.textContent = nameTitleElement.value;
    textElement.textContent = professiontextElement.value;
    closePopup(popup);
})


