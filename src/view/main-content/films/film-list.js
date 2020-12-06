import {createElement} from "../../../utils/utils.js";

const createFilmsList = ({sectionTitle = ``, sectionClass = ``, specialClassName = ``, hidden = ``}) => {
  return `<section class="films-list ${sectionClass}">
            <h2 class="films-list__title ${hidden}">${sectionTitle}</h2>
            <div class="films-list__container ${specialClassName}">
            </div>
  </section>`;
};

export default class FilmList {
  constructor(options) {
    this._filmOptions = options;

    this._element = null;
  }

  getTemplate() {
    return createFilmsList(this._filmOptions);
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
