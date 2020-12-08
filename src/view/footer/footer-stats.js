import {createElement} from "../../utils/utils.js";

const createFooterStat = (filmsNumber) => {
  return `<p>${filmsNumber} movies inside</p>`;
};

export default class FilmsNumber {
  constructor(filmsNumber) {
    this._filmsNumber = filmsNumber;

    this._element = null;
  }

  getTemplate() {
    return createFooterStat(this._filmsNumber);
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
