export class UserInfo {
  constructor({data, profileText, profileTitle, pofileAvatar}) {
    this._data = data;
    this._name = profileText;
    this._about = profileTitle;
    this._avatar = pofileAvatar; 
  }
  getUserInfo() {
    return {
    name: this._name.textContent,
    about: this._about.textContent,
    avatar: this._avatar.src
  }
}
  setUserInfo(data) {
    this._name.textContent = data.name;
    this._about.textContent = data.about;
    this._avatar.src = data.avatar;
  }

}
