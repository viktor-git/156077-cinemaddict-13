import Abstract from "./abstract.js";

const createFilmTemplate = (film) => {
  const BRIEF_DESCRIPTION = 139;
  const {id, name, poster, description, rating, releaseDate, genre, duration, comments} = film;
  const productionYear = releaseDate.split(` `);

  return `<article class="film-card" data-id="${id}">
      <h3 class="film-card__title">${name}</h3>
      <p class="film-card__rating">${rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${productionYear[productionYear.length - 1]}</span>
        <span class="film-card__duration">${duration}</span>
        <span class="film-card__genre">${genre.join(` `)}</span>
      </p>
      <img src="./images/posters/${poster}" alt="" class="film-card__poster">
      <p class="film-card__description">${(description.length > BRIEF_DESCRIPTION) ? description.slice(0, BRIEF_DESCRIPTION) + `...` : description}</p>
      <a class="film-card__comments">${comments.length} comments</a>
      <div class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist" type="button">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched" type="button">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite" type="button">Mark as favorite</button>
      </div>
  </article>`;
};

export default class Film extends Abstract {
  constructor(film) {
    super();
    this._film = film;
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
    this._watchListClickHandler = this._watchListClickHandler.bind(this);
    this._historyClickHandler = this._historyClickHandler.bind(this);
  }

  getTemplate() {
    return createFilmTemplate(this._film);
  }

  _clickHandler(evt) {
    evt.preventDefault();
    this._callback.click(evt, this._film);
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.favoriteClick();
  }

  _watchListClickHandler(evt) {
    evt.preventDefault();
    this._callback.watchListClick();
  }

  _historyClickHandler(evt) {
    evt.preventDefault();
    this._callback.historyClick();
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getContainer(`.film-card__controls-item--favorite`).addEventListener(`click`, this._favoriteClickHandler);
  }

  setWatchListClickHandler(callback) {
    this._callback.watchListClick = callback;
    this.getContainer(`.film-card__controls-item--add-to-watchlist`).addEventListener(`click`, this._watchListClickHandle);
  }

  setHistoryClickHandler(callback) {
    this._callback.historyClick = callback;
    this.getContainer(`.film-card__controls-item--mark-as-watched`).addEventListener(`click`, this._historyClickHandle);
  }
}

