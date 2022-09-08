import {popupZoomElementImage, popupZoomHeading, openPopup, popupZoom} from './index.js'

export class Card {
    constructor(name, link) {
  this._link = link;
  this._name = name;
    }
    _getTemplate() {
      const cardElement = document
        .querySelector('.elements-template')
        .content
        .querySelector('.element')
        .cloneNode(true);
  
      return cardElement;
    }
    generateCard (){
      this._element = this._getTemplate();
      this._setEventListenersRemove();
      this._setEventListenersLike();
      this._setEventListenersZoom();
  
    this._element.querySelector('.element__title').textContent = this._name;
    this._element.querySelector('.element__image').src = this._link;
    this._element.querySelector('.element__image').alt = this._link;
    return this._element;
      }
  
       /*Лайк*/
      _handleLikeClick() {
        
        this._element.querySelector('.element__group').classList.toggle('element__group_active');
      }
  
      _setEventListenersLike() {
        this._element.querySelector('.element__group').addEventListener('click', () => {
          this._handleLikeClick();
        });
      }
  
      /*Удаление*/
      _handleRemoveClick() {
        this._element.remove('.element');
      }
  
      _setEventListenersRemove() {
        this._element.querySelector('.element__baskets').addEventListener('click', () => {
          this._handleRemoveClick();
        });
      }
  
      /*ZOOM*/
  
      _setEventListenersZoom(){
        this._element.querySelector('.element__image').addEventListener('click', () => {
          this._handleZoomClick();
        });
      };
  
      _handleZoomClick() {
        popupZoomElementImage.src =  this._link;
        popupZoomElementImage.alt = this._name;
        popupZoomHeading.textContent = this._name;
        openPopup(popupZoom);
      }
    }


    