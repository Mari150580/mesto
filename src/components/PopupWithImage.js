import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imageCard = this._popup.querySelector(".popup__image");
    this._popupHeading = this._popup.querySelector(".popup__heading");
  }

  open({ name, link }) {
    this._imageCard.src = link;
    this._imageCard.alt = name;
    this._popupHeading.textContent = name;
    super.open();
  }
}

