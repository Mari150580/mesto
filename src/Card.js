
  export class Card {
    constructor({data, handleImageOpenPopup}, cardSelector) {
      this._data = data;
      this._cardSelector = cardSelector;
      this._handleImageOpenPopup = handleImageOpenPopup;
    }

    _getTemplate() {
      const cardElement = document
        .querySelector(this._cardSelector)
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

    this._element.querySelector('.element__title').textContent = this._data.name;
    this._cardImage.src = this._data.link;
    this._cardImage.alt = this._data.link;
    this._cardImage.addEventListener('click', () => this._handleImageOpenPopup(this._data));
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
    }
  }
