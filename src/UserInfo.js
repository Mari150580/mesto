

export class UserInfo {
    constructor({profile}){
        this._profile = profile
        this._job = document.querySelector('.profile__title');
        this._name= document.querySelector('.profile__text');
    }
    getUserInfo({name, job}){
        const profileObject = {name, job};
        this._job.textContent = document.querySelector('.popup__input_type_job').value;
        this._name.textContent = document.querySelector('.popup__input_type_name').value;
     return profileObject;
    }
    setUserInfo({name, job}){ 
        document.querySelector('.popup__input_type_job').textContent= this._job.textContent;
        document.querySelector('.popup__input_type_name').value = this._name.textContent;
    }

}