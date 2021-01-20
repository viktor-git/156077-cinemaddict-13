import Film from "../view/films-item.js";
import FilmDetail from "../view/film-detail.js";
import {render, remove, replace} from "../utils/render.js";

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
    this._handleDetailFilmClick = this._handleDetailFilmClick.bind(this);

    this._handleWatchListClick = this._handleWatchListClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleHistoryClick = this._handleHistoryClick.bind(this);

    this._handleDetailCloseClick = this._handleDetailCloseClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init(film) {
    this._film = film;

    const prevFilmComponent = this._filmComponent;
    const prevFilmDetailComponent = this._filmDetailComponent;

    this._filmComponent = new Film(this._film);
    this._filmDetailComponent = new FilmDetail(this._film);

    this._filmComponent.setClickHandler(this._handleFilmClick);
    this._filmDetailComponent.setClickHandler(this._handleDetailFilmClick);

    this._filmComponent.setWatchListClickHandler(this._handleWatchListClick);
    this._filmComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._filmComponent.setHistoryClickHandler(this._handleHistoryClick);

    this._filmDetailComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._filmDetailComponent.setWatchListClickHandler(this._handleWatchListClick);
    this._filmDetailComponent.setHistoryClickHandler(this._handleHistoryClick);
    this._filmDetailComponent.setCloseClickHandler(this._handleDetailCloseClick);

    if (prevFilmComponent === null || prevFilmDetailComponent === null) {
      render(this._filmListContainer.getContainer(`.films-list__container`), this._filmComponent, `beforeend`);
      return;
    }

    if (this._mode === Mode.DEFAULT) {
      replace(this._filmComponent, prevFilmComponent);
    }

    if (this._mode === Mode.EDITING) {
      replace(this._filmComponent, prevFilmComponent);
      replace(this._filmDetailComponent, prevFilmDetailComponent);
    }

    remove(prevFilmComponent);
    remove(prevFilmDetailComponent);

  }

  destroy() {
    remove(this._filmComponent);
    remove(this._filmDetailComponent);
  }

  _handleFilmClick(evt) {
    const target = evt.target;
    // this._changeData(film);
    this._changeMode();

    if (target.closest(`.film-card__poster`) || target.closest(`.film-card__title`) || target.closest(`.film-card__comments`)) {

      this._mode = Mode.EDITING;
      render(this._filmListContainer.getContainer(`.films-list__container`), this._filmDetailComponent, `beforeend`);
      document.body.classList.add(`hide-overflow`);

      this._filmDetailComponent.restoreHandlers();
      document.addEventListener(`keydown`, this._escKeyDownHandler);
    }

  }

  _handleDetailFilmClick() {
    // this._changeData(film);
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

  _handleDetailCloseClick() {
    remove(this._filmDetailComponent);
    document.removeEventListener(`click`, this._escKeyDownHandler);
    document.body.classList.remove(`hide-overflow`);
    this._mode = Mode.DEFAULT;
  }

  _escKeyDownHandler(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      remove(this._filmDetailComponent);
      document.removeEventListener(`keydown`, this._escKeyDownHandler);
      document.body.classList.remove(`hide-overflow`);
      this._mode = Mode.DEFAULT;
    }
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceDetailToPreview();
    }
  }

  _replacePreviewToDetail() {
    replace(this._filmDetailComponent, this._filmComponent);
    document.addEventListener(`keydown`, this._escKeyDownHandler);
    this._mode = Mode.EDITING;
  }

  _replaceDetailToPreview() {
    replace(this._filmComponent, this._filmDetailComponent);
    document.removeEventListener(`keydown`, this._escKeyDownHandler);
    remove(this._filmDetailComponent);
    this._mode = Mode.DEFAULT;
  }

}
