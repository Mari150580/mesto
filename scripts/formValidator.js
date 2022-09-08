
export class FormValidator {
  
  constructor(config, formElement){
    this._config = config;
    this._formElement= formElement;
    console.log(123);
  }
  

/*обработчики событий*/
_setEventListeners() {
  const inputList = Array.from(this._formElement.querySelectorAll(this._config.inputPopup));
console.log(inputList);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      this._inputElement = inputElement;
      this._isValid();
      this._toggleButtonState();
    });
    
  });
};

/*функция проверки валидации*/
  _isValid() {
    if(!this._inputElement.validity.valid) {
      this._showInputError();
    } else {
      this._hideInputError();
    }
  };

/*скрывает элемент ошибки*/
_hideInputError() {
  const errorElement = this._formElement.querySelector(`#error-${this._inputElement.id}`);
  const conteinerElement = errorElement.closest(this._config.conteinerInput);
  conteinerElement.classList.remove(this._config.inputConteinerInvalid);
  errorElement.textContent = ' ';
};


  _showInputError() {
  const errorElement = this._formElement.querySelector(`#error-${this._inputElement.id}`);
  const conteinerElement = errorElement.closest(this._config.conteinerInput);
  conteinerElement.classList.add(this._config.inputConteinerInvalid);
  errorElement.textContent = errorMessage;
  };

  /*отключает кнопку*/
_toggleButtonState () {
  if(this._hasInvalidInput()) {
    this._buttonElement.classList.add(this._config.inactiveButton);
    this._buttonElement.setAttribute('disabled', 'disabled');
    } else {
      this._buttonElement.classList.remove(this._config.inactiveButton);
      this._buttonElement.removeAttribute('disabled');
    }
};


_hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}; 

/*отключает кнопку*/
_toggleButtonState () {
  if(_hasInvalidInput()) {
    this._buttonElement.classList.add(this._config.inactiveButton);
    this._buttonElement.setAttribute('disabled', 'disabled');
    } else {
      this._buttonElement.classList.remove(this._config.inactiveButton);
      this._buttonElement.removeAttribute('disabled');
    }
};

/*находит и перебирает все формы*/
enableValidation() {
  this._formElement.addEventListener('submit', (evt) =>{
      evt.preventDefault();
    });

    this._setEventListeners();
  };
};

