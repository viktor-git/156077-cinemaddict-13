import {createElement} from "../../utils/utils.js";

const createUserProfile = ({status}) => {

  return `<section class="header__profile profile">
    <p class="profile__rating">${status}</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`;
};

export default class UserProfile {
  constructor(user) {
    this._user = user;

    this._element = null;
  }

  getTemplate() {
    return createUserProfile(this._user);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
