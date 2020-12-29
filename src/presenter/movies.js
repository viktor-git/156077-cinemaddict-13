import Sort from "../view/sort.js";
import FilmSection from "../view/films.js";
import FilmList from "../view/film-list.js";
import Film from "../view/films-item.js";
import ShowMoreBtn from "../view/show-more-button.js";
import FilmDetail from "../view/film-detail.js";
import NoFilms from "../view/no-films.js";
import {sortTitles, filmSectionOptions, topRatedOptions, mostCommentedOptions} from "../utils/consts.js";
import {render, remove, replace} from "../utils/render.js";
import {updateItem} from "../utils/utils.js";

const FILMS_START_COUNT = 5;
const FILMS_COUNT_PER_STEP = 5;
const EXTRA_FILMS_NUMBER = 2;

export default class MoviesList {
  constructor(filmsContainer) {
    this._filmsContainer = filmsContainer;
    this._sort = new Sort(sortTitles);
    this._filmSection = new FilmSection();
    this._filmList = new FilmList(filmSectionOptions);
    this._showMoreBtn = new ShowMoreBtn();
    this._noFilms = new NoFilms();
    this._renderedMoviesCount = FILMS_COUNT_PER_STEP;

    this._handleLoadMoreBtnClick = this._handleLoadMoreBtnClick.bind(this);
    this._handleFilmChange = this._handleFilmChange.bind(this);

    this._filmPresenter = {};
  }

  init(films) {
    this._films = films.slice();
    this._renderFilmList();
  }

  _renderNoFilms() {
    render(this._filmsContainer, this._noFilms, `beforeend`);
  }

  _renderSort() {
    render(this._filmSection, this._sort, `beforebegin`);
  }

  _renderFilm(film, filmListContainer) {
    const filmPresenter = new Movie(filmListContainer, this._handleFilmChange);
    filmPresenter.init(film);
    this._filmPresenter[film.id] = filmPresenter;
  }

  _handleFilmChange(updatedFilm) {
    this._films = updateItem(this._films, updatedFilm);
    this._filmPresenter[updatedFilm.id].init(updatedFilm);
  }

  _clearFilmList() {
    Object
      .values(this._filmPresenter)
      .forEach((presenter) => presenter.destroy());
    this._filmPresenter = {};
    this._renderedMoviesCount = FILMS_COUNT_PER_STEP;
    remove(this._loadMoreBtn);
  }

  _renderFilms(from, to, filmListContainer) {
    this._films.slice(from, to).forEach((film) => {
      this._renderFilm(film, filmListContainer);
    });
  }

  _renderFilmList() {
    if (!this._films.length) {
      this._renderNoFilms();
      return;
    }

    render(this._filmsContainer, this._filmSection, `beforeend`);
    render(this._filmSection, this._filmList, `beforeend`);


    this._renderSort();
    this._renderFilms(0, Math.min(this._films.length, FILMS_START_COUNT), this._filmList);

    if (this._films.length > FILMS_START_COUNT) {
      this._renderShowMoreBtn();
    }

    this._renderExtraFilmList(topRatedOptions);
    this._renderExtraFilmList(mostCommentedOptions);
  }

  _renderExtraFilmList(extraOptions) {
    const extraFilmsSection = new FilmList(extraOptions);

    render(this._filmSection, extraFilmsSection, `beforeend`);
    this._renderFilms(0, EXTRA_FILMS_NUMBER, extraFilmsSection);
  }

  _handleLoadMoreBtnClick() {
    this._films.slice(this._renderedMoviesCount, this._renderedMoviesCount + FILMS_COUNT_PER_STEP).forEach((film) => {
        this._renderFilm(film, this._filmList);
      });

    this._renderedMoviesCount += FILMS_COUNT_PER_STEP;

    if (this._renderedMoviesCount >= this._films.length) {
      remove(this._showMoreBtn);
    }
  }

  _renderShowMoreBtn() {
    render(this._filmList, this._showMoreBtn, `afterend`);
    this._showMoreBtn.setClickHandler(this._handleLoadMoreBtnClick);
  }

}

class Movie {
  constructor(filmListContainer, changeData) {
    this._filmListContainer = filmListContainer;
    this._changeData = changeData;

    this._filmComponent = null;
    this._filmDetailComponent = null;

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

    if (this._filmListContainer.getElement().contains(prevFilmComponent.getElement())) {
      replace(this._filmComponent, prevFilmComponent);
    }

    if (this._filmListContainer.getElement().contains(prevFilmDetailComponent.getElement())) {
      replace(this._filmDetailComponent, prevFilmDetailComponent);
    }

    remove(prevFilmComponent);
    remove(prevFilmDetailComponent);

  }

  destroy() {
    remove(this._taskComponent);
    remove(this._taskEditComponent);
  }

  _handleFilmClick(evt, film) {
    const target = evt.target;
    this._changeData(film);

    if (target.closest(`.film-card__poster`) || target.closest(`.film-card__title`) || target.closest(`.film-card__comments`)) {
      render(this._filmListContainer, this._filmDetailComponent, `afterend`);

      document.body.classList.add(`hide-overflow`);
      this._filmDetailComponent.setClickHandler(this._filmDetailCloseClick);

      document.addEventListener(`keydown`, this._escKeyDownHandler);
    }
  }

  _handleFavoriteClick() {
    console.log(this._film.isFavorite);
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
