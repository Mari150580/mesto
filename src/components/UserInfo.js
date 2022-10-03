export class UserInfo {
  constructor({profileTitle, profileText}) {
    this._name = profileText;
    this._job = profileTitle;
  }
  getUserInfo() {
    return {
    name: this._name.textContent,
    job: this._job.textContent
  }
}
  setUserInfo(data) {
    this._name.textContent = data.name;
    this._job.textContent = data.job;
  }
}
