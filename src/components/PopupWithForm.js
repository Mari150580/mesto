import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, formSelector, submitHandler = null) {
    super(popupSelector);
    this._form = this._popup.querySelector(formSelector);
    this._submitHandler = submitHandler;
    this._inputElements = this._form.querySelectorAll(".popup__input");
  }

  
  _getInputValues() {
    const formItemObject = {};
    this._inputElements.forEach((input) => {
      formItemObject[input.name] = input.value;
    });
    return formItemObject;
  }

  changeSubmitHandler(newSubmitHandler) {
    this._submitHandler = newSubmitHandler;
  }
  
  setEventListeners() {
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submitHandler(this._getInputValues());
    });
    super.setEventListeners();
  }

  close() {
    super.close();
    this._form.reset(); 
  }
}
