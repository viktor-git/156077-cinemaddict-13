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

const FILMS_START_COUNT = 5;
const FILMS_COUNT_PER_STEP = 5;
const EXTRA_FILMS_NUMBER = 2;

export default class MoviesList {
  constructor(filmsContainer) {
    this._filmsContainer = filmsContainer;
    this._menu = new Menu();
    this._sort = new Sort(sortTitles);
    this._filmSection = new FilmSection();
    this._filmList = new FilmList(filmSectionOptions);
    this._film = new Film();
    this._showMoreBtn = new ShowMoreBtn();
    this._noFilms = new noFilms();
  }

  init(films) {
    this._films = films.slice();

    this._renderMenu();
    render(this._filmsContainer, this._filmSection, `beforeend`);

    this._renderFilmList();
  }

  _renderNoFilms() {
    render(this._filmsContainer, this._noFilms, `beforeend`);
  }

  _renderMenu() {
    render(this._filmsContainer, this._menu, `beforeend`);
  }

  _renderSort() {
    render(this._filmsContainer, this._sort, `beforeend`);
  }

  _renderFilm(film) {
    this._filmsListContainer = this._filmList.getElement().querySelector(`.films-list__container `);

    let filmDetailComponent = null;
    const escCLoseHandler = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        evt.preventDefault();
        remove(filmDetailComponent);
        document.removeEventListener(`keydown`, escCLoseHandler);
        document.body.classList.remove(`hide-overflow`);
      }
    };

    const cardClickHandler = (evt) => {
      const target = evt.target;
      if (filmDetailComponent) {
        remove(filmDetailComponent);
      }

      if (target.closest(`.film-card__poster`) || target.closest(`.film-card__title`) || target.closest(`.film-card__comments`)) {
        const filmID = target.closest(`.film-card`).dataset.id;

        filmDetailComponent = new FilmDetail(findItemById(this._films, filmID));

        render(footer, filmDetailComponent, `afterend`);

        document.body.classList.add(`hide-overflow`);

        filmDetailComponent.setClickHandler(filmDetailCLoseHandler);
        document.addEventListener(`keydown`, escCLoseHandler);
      }

      this._filmListContainer.setClickHandler(cardClickHandler);
    };

    const filmDetailCLoseHandler = (evt) => {
      const target = evt.target;

      if (target.closest(`.film-details__close-btn`) || target.closest(`.film-details`) === null) {
        remove(filmDetailComponent);
        document.removeEventListener(`click`, escCLoseHandler);
        document.body.classList.remove(`hide-overflow`);
      }
    };

    render(this._filmsListContainer, this._film(film), `beforeend`);
  }

  _renderFilms(from, to) {
    this._films.slice(from, to).forEach((film) => {
      this._renderFilm(film);
    });
  }

  _renderShowMoreBtn() {
    render(this._filmList, this._showMoreBtn, `afterend`);

    let renderedFilmsCount = FILMS_COUNT_PER_STEP;
    this._showMoreBtn.setClickHandler(() => {

      this._films.slice(renderedFilmsCount, renderedFilmsCount + FILMS_COUNT_PER_STEP).forEach((film) => {
        render(this._filmsListContainer, this._film(film), `beforeend`);
      });

      renderedFilmsCount += FILMS_COUNT_PER_STEP;

      if (renderedFilmsCount >= this._films.length) {
        remove(this._showMoreBtn);
      }
    });
  }

  _renderFilmList() {
    if (!this._films.length) {
      this._renderNoFilms();
      return;
    }

    this._renderSort();
    this._renderFilms(0, Math.min(this._films.length, FILMS_START_COUNT));

    if (this._films.length > FILMS_START_COUNT) {
      this._renderShowMoreBtn();
    }

  }

}

export class Movie {
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
