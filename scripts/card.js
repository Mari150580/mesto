import {handleCardClick} from './index.js'

export class Card {
    constructor(name, link) {
  this._link = link;
  this._name = name;
  this._handleCardClick = handleCardClick;
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
      this._likeButton = this._element.querySelector('.element__group');
      this._cardImage = this._element.querySelector('.element__image');
      this._deleteСard = this._element.querySelector('.element__baskets');
      this._setEventListenersAll();

    this._element.querySelector('.element__title').textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._link;
    return this._element;
      }
  
       /*Лайк*/
      _handleLikeClick() {
        
        this._likeButton.classList.toggle('element__group_active');
      }
  
      /*Удаление*/
      _handleRemoveClick() {
        this._element.remove('.element');
      }
  
      /*Слушатели*/
  
      _setEventListenersAll() {
        this._likeButton.addEventListener('click', () => {
          this._handleLikeClick();
        });
        this._deleteСard.addEventListener('click', () => {
          this._handleRemoveClick();
        });
        this._cardImage.addEventListener('click', () => {
          this._handleCardClick(this._name, this._link);
        });
    }
  }