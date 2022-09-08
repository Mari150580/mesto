

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
/*показывает элемент ошибки*/
const showInputError = (formElement, inputElement, errorMessage, config) => {
  const errorElement = formElement.querySelector(`#error-${inputElement.id}`);
  const conteinerElement = errorElement.closest(config.conteinerInput);
  conteinerElement.classList.add(config.inputConteinerInvalid);
  errorElement.textContent = errorMessage;
  
};
/*скрывает элемент ошибки*/
const hideInputError = (formElement, inputElement, config) => {
  const errorElement = formElement.querySelector(`#error-${inputElement.id}`);
  const conteinerElement = errorElement.closest(config.conteinerInput);
  conteinerElement.classList.remove(config.inputConteinerInvalid);
  errorElement.textContent = ' ';
};
/*функция проверки валидации*/
const isValid =(formElement, inputElement, config) =>{
  if(!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, config);
  } else {
    hideInputError(formElement, inputElement, config);
  }
};
/*обработчики событий*/
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
/*отключает кнопку*/
const toggleButtonState = (inputList, buttonElement, config) => {
  if(hasInvalidInput(inputList, config)) {
    buttonElement.classList.add(config.inactiveButton);
    buttonElement.setAttribute('disabled', 'disabled');
    } else {
      buttonElement.classList.remove(config.inactiveButton);
      buttonElement.removeAttribute('disabled');
    }
};
/*находит и перебирает все формы*/
const enableValidation =(config) => {
  const formList = Array.from(document.querySelectorAll(config.formElement));
  formList.forEach((formElement) =>{
    formElement.addEventListener('submit', (evt) =>{
      evt.preventDefault();
    });

    setEventListeners(formElement, config);
  });
};

enableValidation(config);


/*валидация формы*/
class FormValidator {
  
  constructor(config, formElement, buttonElement, inputElement){
    this._config = config;
    this._formElement= formElement;
    this._buttonElement = buttonElement;
    this._inputElement = inputElement;

  }

  _isValid() {
    if(!inputElement.validity.valid) {
      _showInputError(this._formElement, this._inputElement, this._inputElement.validationMessage, this._config);
    } else {
      _hideInputError(this._formElement, this._inputElement, this._config);
    }
  };
  _showInputError() {
    this._errorElement = this._formElement.querySelector(`#error-${this._inputElement.id}`);
    this._conteinerElement = this._errorElement.closest(this._config.conteinerInput);
    this._conteinerElement.classList.add(this._config.inputConteinerInvalid);
    this._errorElement.textContent = errorMessage;
    
  };

  _hideInputError() {
    this._conteinerElement.classList.remove(this._config.inputConteinerInvalid);
    this._errorElement.textContent = ' ';
  };

  }
  

/*const validator = new FormValidator(config, buttonElement);
console.log(validator);*/







