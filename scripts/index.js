const editButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const popupCloseButton = document.querySelector('.popup__close');
const titleElement = document.querySelector('.profile__title');
const nameTitleElement = document.querySelector('.popup__input_type_name');
const textElement = document.querySelector ('.profile__text');
const professiontextElement = document.querySelector ('.popup__input_type_job');
const formElement = document.querySelector('.popup__form');

function openPopup(popupElement) {
    popupElement.classList.add('popup_usopen');
    nameTitleElement.value = titleElement.textContent;
    professiontextElement.value = textElement.textContent;
}

editButton.addEventListener('click', function() {
    openPopup(popup);
})

function closePopup(popupElement) {
    popup.classList.remove('popup_usopen');
}

popupCloseButton.addEventListener('click', function() {
    closePopup(popup);
})


function formSubmitHandler(event) {
    event.preventDefault();
    titleElement.textContent = nameTitleElement.value;
    textElement.textContent = professiontextElement.value;
    closePopup(popup);
}

formElement.addEventListener('submit', formSubmitHandler)

