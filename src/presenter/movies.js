import Menu from "../view/menu.js";
import Sort from "../view/sort.js";
import FilmSection from "../view/films.js";
import FilmList from "../view/film-list.js";
import Film from "../view/films-item.js";
import ShowMoreBtn from "../view/show-more-button.js";
import FilmDetail from "../view/film-detail.js";
import NoFilms from "../view/no-films.js";
import {sortTitles, filmSectionOptions, topRatedOptions, mostCommentedOptions} from "../utils/consts.js";
import {render, remove} from "../utils/render.js";
import {findItemById} from "../utils/utils.js";

export default class MoviesList {
  constructor(filmsContainer) {
    this._filmsContainer = filmsContainer;
    this._menu = new Menu();
    this._sort = new Sort();
    this._filmSection = new FilmSection();
    this._showMoreBtn = new ShowMoreBtn();
    this._noFilmsView = new noFilms();
  }

  init() {

  }

  _renderNoFilms() {

  }

  _renderFilmSection() {

  }

  _renderFilmList() {

  }

  _renderShowMoreBtn() {

  }

  _renderSort() {

  }

  _renderMenu() {

  }

}

export default class Movie {
  constructor(filmContainer) {
    this._filmContainer = filmContainer;
    this._film = new Film();
    this._filmDetail = new FilmDetail();
  }

  _renderFilm() {

  }

  _renderDetailFilm() {

  }

}
