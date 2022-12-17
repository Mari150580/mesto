import imageGlass from "../images/Стекло.jpg";

export class Card {
  constructor({ data, handleImageOpenPopup , handleRemoveClick , userId, putLikeCard}, cardSelector) {
    this._data = data;
    this._cardSelector = cardSelector;
    this._handleImageOpenPopup = handleImageOpenPopup;
    this._handleRemoveClick = handleRemoveClick;
    this._userId = userId;
    this._putLikeCard = putLikeCard;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector(".element__image");
    
    /*Работа с лайком*/
    this._likeButton = this._element.querySelector(".element__like");
    this._countersLikes= this._element.querySelector(".element__counters-likes");
    this._countingLike();

    /*удаление*/
    this._deleteСard = this._element.querySelector(".element__baskets");
    this._removeBacked();
    
    this._setEventListenersAll();

    /*Защита,если придет не корректная информация используем ?*/
    this._element.querySelector(".element__title").textContent =
    this._data?.name;
    this._cardImage.src = this._data?.link;
    this._cardImage.alt = this._data?.link;

    return this._element;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".element")
      .cloneNode(true);

    return cardElement;
  }

  /*функция для подсчета лайков*/

  isLiked(){
    return this._data.likes.some((item) =>{

      return item._id === this._userId;
      
  })
}
  _countingLike(){
    this._countersLikes.textContent = this._data.likes.length;
     if(this.isLiked()) {
      this._likeButton.classList.add("element__like_active");
     } else {
      this._likeButton.classList.remove("element__like_active");
     }
  }

  resetLikeData(data){
    this._data.likes = data.likes;
    this._countingLike();
  
  }
  

  /*Удаление*/

  _removeBacked(){
    if(this._data.owner._id === this._userId) {

      this._deleteСard.classList.add("element__baskets_active");
     } else {
      this._deleteСard.classList.remove(".element__baskets_active");
     }
  }

  remove() {
    this._element.remove(".element");
    this._element = null;
    
  }

  /*Слушатели*/

  _setEventListenersAll() {
    this._likeButton.addEventListener("click", () => {
      this._countingLike();
    });

    this._likeButton.addEventListener("click", () => {
      this._putLikeCard(this);
    });
    this._deleteСard.addEventListener("click", () => this._handleRemoveClick(this) );

    this._cardImage.addEventListener("click", () => {
      this._handleImageOpenPopup(this._data)
    });
    /*Если картинка приходит битая*/

    this._cardImage.addEventListener("error", () => {
    this._data.link = imageGlass;
    this._cardImage.src = imageGlass;
    this._element.querySelector(".element__title").textContent  = "Картинка впути";
    });
  }

  getId(){
    return this._data._id;
  }
  
}
