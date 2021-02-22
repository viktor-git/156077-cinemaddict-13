import Observer from "../utils/observer.js";

export default class Movies extends Observer  {
  constructor() {
    super();
    this._films = [];
  }

  getFilms() {
    return this._films;
  }

  setFilms(films) {
    this._films = films.slice();
  }
}
