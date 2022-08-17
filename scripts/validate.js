/*валидация формы*/

const validationConfig = {
  formElement: '.popup__form',
  inputElement: '.popup__input',
  buttonElement: '.popup__button',
  inactiveButton: 'button_inactive',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__error_visible',
  inputConteinerInvalid: 'input-conteiner__invalid',
  conteinerInput: 'input-conteiner'
}; 

const showInputError = (formElement, inputElement, errorMessage, config) => {
  const errorElement = formElement.querySelector(`#error-${inputElement.id}`);
  const conteinerElement = errorElement.closest(config.conteinerInput);
  conteinerElement.classList.add(config.inputConteinerInvalid);
  errorElement.textContent = errorMessage;
};

const hideInputError = (formElement, inputElement, config) => {
  const errorElement = formElement.querySelector(`#error-${inputElement.id}`);
  const conteinerElement = errorElement.closest(config.conteinerInput);
  conteinerElement.classList.remove(config.inputConteinerInvalid);
  errorElement.textContent = ' ';
};

const isValid =(formElement, inputElement, config) =>{
  if(!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, config);
  } else {
    hideInputError(formElement, inputElement, config);
  }
};

const setEventListeners = (formElement, config) => {
  const inputList = Array.from(formElement.querySelectorAll(config.inputElement));
  const buttonElement = formElement.querySelector(config.buttonElement);

  toggleButtonState(inputList, buttonElement, config);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement, config);
      toggleButtonState(inputList, buttonElement, config);
    });
  });
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}; 

const toggleButtonState = (inputList, buttonElement, config) => {
  if(hasInvalidInput(inputList, config)) {
    buttonElement.classList.add(config.inactiveButton);
    buttonElement.setAttribute('disabled', 'disabled');
    } else {
      buttonElement.classList.remove(config.inactiveButton);
      buttonElement.removeAttribute('disabled');
    }
};

const enableValidation =(config) => {
  const formList = Array.from(document.querySelectorAll(config.formElement));
  formList.forEach((formElement) =>{
    formElement.addEventListener('submit', (evt) =>{
      evt.preventDefault();
    });

    setEventListeners(formElement, config);
  });
};

enableValidation(validationConfig);
