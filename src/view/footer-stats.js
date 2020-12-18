import Abstract from "./abstract.js";

const createFooterStat = (filmsNumber) => {
  return `<p>${filmsNumber} movies inside</p>`;
};

export default class FilmsNumber extends Abstract {
  constructor(filmsNumber) {
    super();
    this._filmsNumber = filmsNumber;
  }

  getTemplate() {
    return createFooterStat(this._filmsNumber);
  }
}
