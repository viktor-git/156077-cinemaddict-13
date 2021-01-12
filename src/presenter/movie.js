import Film from "../view/films-item.js";
import FilmDetail from "../view/film-detail.js";
import {render, remove, replace} from "../utils/render.js";
import {updateItem} from "../utils/utils.js";

const Mode = {
  DEFAULT: `DEFAULT`,
  EDITING: `EDITING`
};

export default class Movie {
  constructor(filmListContainer, changeData, changeMode) {
    this._filmListContainer = filmListContainer;
    this._changeData = changeData;
    this._changeMode = changeMode;

    this._filmComponent = null;
    this._filmDetailComponent = null;
    this._mode = Mode.DEFAULT;

    this._handleFilmClick = this._handleFilmClick.bind(this);

    this._handleWatchListClick = this._handleWatchListClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleHistoryClick = this._handleHistoryClick.bind(this);

    this._filmDetailCloseClick = this._filmDetailCloseClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init(film) {
    this._film = film;

    const prevFilmComponent = this._filmComponent;
    const prevFilmDetailComponent = this._filmDetailComponent;

    this._filmComponent = new Film(this._film);
    this._filmDetailComponent = new FilmDetail(this._film);

    this._filmComponent.setClickHandler(this._handleFilmClick);

    this._filmComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._filmComponent.setWatchListClickHandler(this._handleWatchListClick);
    this._filmComponent.setHistoryClickHandler(this._handleHistoryClick);

    if (prevFilmComponent === null || prevFilmDetailComponent === null) {
      render(this._filmListContainer.getContainer(`.films-list__container`), this._filmComponent, `beforeend`);
      return;
    }

    if (this._mode === Mode.DEFAULT) {
      replace(this._filmComponent, prevFilmComponent);
    }

    if (this._mode === Mode.EDITING) {
      replace(this._filmDetailComponent, prevFilmDetailComponent);
    }

    remove(prevFilmComponent);
    remove(prevFilmDetailComponent);

  }

  destroy() {
    remove(this._filmComponent);
    remove(this._filmDetailComponent);
  }

  _handleFilmClick(evt, film) {
    const target = evt.target;
    this._changeData(film);
    this._changeMode();

    if (target.closest(`.film-card__poster`) || target.closest(`.film-card__title`) || target.closest(`.film-card__comments`)) {

      this._mode = Mode.EDITING;
      render(this._filmListContainer.getContainer(`.films-list__container`), this._filmDetailComponent, `beforeend`);

      document.body.classList.add(`hide-overflow`);
      this._filmDetailComponent.setClickHandler(this._filmDetailCloseClick);

      document.addEventListener(`keydown`, this._escKeyDownHandler);
    }
    console.log(this._mode);

  }

  _handleFavoriteClick() {

    this._changeData(
        Object.assign(
            {},
            this._film,
            {
              isFavorite: !this._film.isFavorite
            }
        )
    );

  }

  _handleWatchListClick() {

    this._changeData(
        Object.assign(
            {},
            this._film,
            {
              isWatchList: !this._film.isWatchList
            }
        )
    );
  }

  _handleHistoryClick() {
    this._changeData(
        Object.assign(
            {},
            this._film,
            {
              isHistory: !this._film.isHistory
            }
        )
    );
  }

  _filmDetailCloseClick(evt) {
    const target = evt.target;

    if (target.closest(`.film-details__close-btn`) || target.closest(`.film-details`) === null) {
      remove(this._filmDetailComponent);
      document.removeEventListener(`click`, this._escKeyDownHandler);
      document.body.classList.remove(`hide-overflow`);
      this._mode = Mode.DEFAULT;
    }

  }

  _escKeyDownHandler(evt) {
   if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      remove(this._filmDetailComponent);
      document.removeEventListener(`keydown`, this._escKeyDownHandler);
      document.body.classList.remove(`hide-overflow`);
    }
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceFormToCard();
    }
  }

  _replaceCardToForm() {
    replace(this._filmDetailComponent, this._filmComponent);
    document.addEventListener(`keydown`, this._escKeyDownHandler);
    this._mode = Mode.EDITING;
  }

  _replaceFormToCard() {
    replace(this._filmComponent, this._filmDetailComponent);
    document.removeEventListener(`keydown`, this._escKeyDownHandler);
    remove(this._filmDetailComponent);
    this._mode = Mode.DEFAULT;
  }

}
