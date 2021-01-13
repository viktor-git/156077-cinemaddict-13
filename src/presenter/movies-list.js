import Movie from "./movie.js";
import Sort from "../view/sort.js";
import FilmSection from "../view/films.js";
import FilmList from "../view/film-list.js";
import ShowMoreBtn from "../view/show-more-button.js";
import NoFilms from "../view/no-films.js";
import {filmSectionOptions} from "../utils/consts.js";
import {render, remove} from "../utils/render.js";
import {updateItem, sortByRating, sortByDate} from "../utils/utils.js";

const FILMS_START_COUNT = 5;
const FILMS_COUNT_PER_STEP = 5;
const EXTRA_FILMS_NUMBER = 2;

export default class MoviesList {
  constructor(filmsContainer) {
    this._filmsContainer = filmsContainer;

    this._filmPresenter = {};

    this._sort = new Sort();
    this._filmSection = new FilmSection();
    this._filmList = new FilmList(filmSectionOptions);
    this._showMoreBtn = new ShowMoreBtn();
    this._noFilms = new NoFilms();
    this._renderedMoviesCount = FILMS_COUNT_PER_STEP;

    this._handleLoadMoreBtnClick = this._handleLoadMoreBtnClick.bind(this);
    this._handleFilmChange = this._handleFilmChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);

  }

  init(films) {
    this._films = films.slice();
    this._sourcedFilms = films.slice();

    this._renderFilmList();
    //  this._renderExtraFilmList(topRatedOptions);
    //  this._renderExtraFilmList(mostCommentedOptions);

  }

  _renderNoFilms() {
    render(this._filmsContainer, this._noFilms, `beforeend`);
  }

  _renderSort() {
    render(this._filmSection, this._sort, `beforebegin`);
    this._sort.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderFilm(film, filmListContainer) {
    const filmPresenter = new Movie(filmListContainer, this._handleFilmChange, this._handleModeChange);
    filmPresenter.init(film);
    this._filmPresenter[film.id] = filmPresenter;
  }

  _handleFilmChange(updatedFilm) {

    this._films = updateItem(this._films, updatedFilm);
    this._filmPresenter[updatedFilm.id].init(updatedFilm);
  }

  _sortFilms(sortType) {
    switch (sortType) {
      case `DATE`:
        this._films.sort(sortByDate);
        break;
      case `RATING`:
        this._films.sort(sortByRating);
        break;
      default:
        this._films = this._sourcedFilms.slice();
    }

    this._currentSortType = sortType;
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._sortFilms(sortType);
    this._clearFilmList();
    this._renderFilmList();
  }

  _handleModeChange() {
    Object
      .values(this._filmPresenter)
      .forEach((presenter) => {
        presenter.resetView();
      });

  }

  _clearFilmList() {
    Object
      .values(this._filmPresenter)
      .forEach((presenter) => {
        presenter.destroy();
      });

    this._filmPresenter = {};
    this._renderedMoviesCount = FILMS_COUNT_PER_STEP;
    remove(this._showMoreBtn);
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
    this._renderFilms(0, Math.min(this._films.length, this._renderedMoviesCount), this._filmList);

    if (this._films.length > FILMS_START_COUNT) {
      this._renderShowMoreBtn();
    }

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

