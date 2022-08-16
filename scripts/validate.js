/*валидация формы*/

const formElement = document.querySelector('.popup__form');
const inputElement = formElement.querySelectorAll('.popup__input');

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`#error-${inputElement.id}`);
  const conteinerElement = errorElement.closest('.input-conteiner');
  conteinerElement.classList.add('input-conteiner__invalid');
  errorElement.textContent = errorMessage;
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`#error-${inputElement.id}`);
  const conteinerElement = errorElement.closest('.input-conteiner');
  conteinerElement.classList.remove('input-conteiner__invalid');
  errorElement.textContent = ' ';
};

const isValid =(formElement, inputElement) =>{
  if(!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  const buttonElement = formElement.querySelector('.popup__button');

  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}; 

const toggleButtonState = (inputList, buttonElement) => {
  if(hasInvalidInput(inputList)) {
    buttonElement.classList.add('button_inactive');
    buttonElement.setAttribute('disabled', 'disabled');
    } else {
      buttonElement.classList.remove('button_inactive');
      buttonElement.removeAttribute('disabled');
    }
};

const enableValidation =() => {
  const formList = Array.from(document.querySelectorAll('.popup__form'));
  formList.forEach((formElement) =>{
    formElement.addEventListener('submit', (evt) =>{
      evt.preventDefault();
    });

    setEventListeners(formElement);
  });
};

enableValidation({
    formElement: '.popup__form',
    inputElement: '.popup__input',
    buttonElement: '.popup__button',
    inactiveButtonClass: 'button_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  }); 
