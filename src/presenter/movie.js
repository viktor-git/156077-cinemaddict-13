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

    this._prevFilmComponent = this._filmComponent;
    this._prevFilmDetailComponent = this._filmDetailComponent;

    this._filmComponent = new Film(this._film);
    this._filmDetailComponent = new FilmDetail(this._film);

    this._filmComponent.setClickHandler(this._handleFilmClick);

    this._filmComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._filmComponent.setWatchListClickHandler(this._handleWatchListClick);
    this._filmComponent.setHistoryClickHandler(this._handleHistoryClick);

    if (this._prevFilmComponent === null || this._prevFilmDetailComponent === null) {
      render(this._filmListContainer.getContainer(`.films-list__container`), this._filmComponent, `beforeend`);
      return;
    }

    if (this._mode === Mode.DEFAULT) {
      replace(this._filmComponent, this._prevFilmComponent);
    }

    if (this._mode === Mode.EDITING) {
      replace(this._filmDetailComponent, this._prevFilmDetailComponent);
    }

    remove(this._prevFilmComponent);
    remove(this._prevFilmDetailComponent);

  }

  destroy() {
    remove(this._taskComponent);
    remove(this._taskEditComponent);
  }

  _handleFilmClick(evt, film) {
    const target = evt.target;
    this._changeData(film);

    if (this._mode === Mode.EDITING) {
      console.log(this._filmDetailComponent.getContainer(`.film-details__title`));
      console.log(this._prevFilmDetailComponent.getContainer(`.film-details__title`));
    }

    if (target.closest(`.film-card__poster`) || target.closest(`.film-card__title`) || target.closest(`.film-card__comments`)) {
      this._mode = Mode.EDITING;
      render(this._filmListContainer, this._filmDetailComponent, `afterend`);

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

}
