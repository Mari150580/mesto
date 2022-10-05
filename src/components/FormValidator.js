export class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
    this._buttonElement = this._formElement.querySelector(this._config.buttonElement);
  }

  /*обработчики событий*/
  _setEventListeners() {
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._config.inputPopup)
    );
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._inputElement = inputElement;
        this._isValid();
        this._toggleButtonState();
      });
    });
  }

  /*функция проверки валидации*/
  _isValid() {
    if (!this._inputElement.validity.valid) {
      this._showInputError();
    } else {
      this._hideInputError();
    }
  }

  /*показывает элемент ошибки*/
  _showInputError() {
    const errorMessage = this._inputElement.validationMessage;
    this._errorElement = this._formElement.querySelector(
      `#error-${this._inputElement.id}`
    );
    this._conteinerElement = this._errorElement.closest(
      this._config.conteinerInput
    );
    this._conteinerElement.classList.add(this._config.inputConteinerInvalid);
    this._errorElement.textContent = errorMessage;
  }

  /*скрывает элемент ошибки*/
  _hideInputError() {
    this._errorElement = this._formElement.querySelector(
      `#error-${this._inputElement.id}`
    );
    this._conteinerElement = this._errorElement.closest(
      this._config.conteinerInput
    );
    this._conteinerElement.classList.remove(this._config.inputConteinerInvalid);
    this._errorElement.textContent = " ";
  }

  /*отключает кнопку*/
  disabledButton() {
    this._buttonElement.classList.add(this._config.inactiveButton);
    this._buttonElement.setAttribute("disabled", "disabled");
  }

  disabledButtonActiv() {
    this._buttonElement.classList.remove(this._config.inactiveButton);
    this._buttonElement.removeAttribute("disabled");
  }

  _toggleButtonState() {
    if (!this._hasInvalidInput()) {
      this.disabledButtonActiv();
    } else {
      this.disabledButton();
    }
  }

  _hasInvalidInput() {
    return Array.from(this._inputList).some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  /*находит и перебирает все формы*/
  enableValidation() {
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }
}
