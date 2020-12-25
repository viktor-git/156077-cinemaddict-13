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
    this._sort = new Sort(sortTitles);
    this._filmSection = new FilmSection();
    this._filmList = new FilmList(filmSectionOptions);
    this._showMoreBtn = new ShowMoreBtn();
    this._noFilms = new NoFilms();
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

    const filmComponent = new Film(film);

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

        render(filmListContainer, filmDetailComponent, `afterend`);

        document.body.classList.add(`hide-overflow`);

        filmDetailComponent.setClickHandler(filmDetailCLoseHandler);
        document.addEventListener(`keydown`, escCLoseHandler);
      }
    };

    const filmDetailCLoseHandler = (evt) => {
      const target = evt.target;

      if (target.closest(`.film-details__close-btn`) || target.closest(`.film-details`) === null) {
        remove(filmDetailComponent);
        document.removeEventListener(`click`, escCLoseHandler);
        document.body.classList.remove(`hide-overflow`);
      }
    };
    filmListContainer.setClickHandler(cardClickHandler);

    render(filmListContainer.getContainer(`.films-list__container`), filmComponent, `beforeend`);
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

  _renderShowMoreBtn() {
    render(this._filmList, this._showMoreBtn, `afterend`);

    let renderedFilmsCount = FILMS_COUNT_PER_STEP;
    this._showMoreBtn.setClickHandler(() => {

      this._films.slice(renderedFilmsCount, renderedFilmsCount + FILMS_COUNT_PER_STEP).forEach((film) => {
        this._renderFilm(film, this._filmList);
      });

      renderedFilmsCount += FILMS_COUNT_PER_STEP;

      if (renderedFilmsCount >= this._films.length) {
        remove(this._showMoreBtn);
      }
    });
  }

}

