import Abstract from "./abstract.js";

const createFilmsList = ({sectionTitle = ``, sectionClass = ``, specialClassName = ``, hidden = ``}) => {
  return `<section class="films-list ${sectionClass}">
            <h2 class="films-list__title ${hidden}">${sectionTitle}</h2>
            <div class="films-list__container ${specialClassName}">
            </div>
  </section>`;
};

export default class FilmList extends Abstract {
  constructor(options) {
    super();
    this._filmOptions = options;
  }

  getTemplate() {
    return createFilmsList(this._filmOptions);
  }
}
