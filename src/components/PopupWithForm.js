import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, formSelector, submitHandler = null) {
    super(popupSelector);
    this._form = this._popup.querySelector(formSelector);
    this._submitHandler = submitHandler;
  }

  _getInputValues() {
    const formItemObject = {};
    const inputElements = this._form.querySelectorAll(".popup__input");
    inputElements.forEach((input) => {
      formItemObject[input.name] = input.value;
    });
    return formItemObject;
  }

  changeSubmitHandler(newSubmitHandler) {
    this._submitHandler = newSubmitHandler
  }
  
  setEventListeners() {
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submitHandler(this._getInputValues());
      this.close();
      evt.target.reset(); 
    });
    super.setEventListeners();
  }
}
