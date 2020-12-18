import UserProfile from "./view/user-profile.js";
import Menu from "./view/menu.js";
import Sort from "./view/sort.js";
import FilmSection from "./view/films.js";
import FilmList from "./view/film-list.js";
import Film from "./view/films-item.js";
import ShowMoreBtn from "./view/show-more-button.js";
import FilmDetail from "./view/film-detail.js";
import FilmsNumber from "./view/footer-stats.js";
import NoFilms from "./view/no-films.js";
import {generateUserProfile} from "./mocks/user-profile.js";
import {generateFilm} from "./mocks/films.js";
import {generateFilter} from "./mocks/filters.js";
import {render, remove, renderElement} from "./utils/render.js";
import {findItemById} from "./utils/utils.js";
import {filmSectionOptions, topRatedOptions, mostCommentedOptions} from "./utils/consts.js";

const FILMS_NUMBER = 20;
const FILMS_START_COUNT = 5;
const FILMS_COUNT_PER_STEP = 5;
const EXTRA_FILMS_NUMBER = 2;

const footer = document.querySelector(`.footer`);

const films = new Array(FILMS_NUMBER).fill().map(generateFilm);
const filters = generateFilter(films);

const header = document.querySelector(`.header`);
render(header, new UserProfile(generateUserProfile()), `beforeend`);

const mainContent = document.querySelector(`.main`);
render(mainContent, new Menu(filters), `beforeend`);
render(mainContent, new Sort(), `beforeend`);

const filmSectionComponent = new FilmSection();
render(mainContent, filmSectionComponent, `beforeend`);

const filmListComponent = new FilmList(filmSectionOptions);
const topRatedListComponent = new FilmList(topRatedOptions);
const mostCommentedListComponent = new FilmList(mostCommentedOptions);

if (!films.length) {
  render(filmSectionComponent, new NoFilms(), `beforeend`);
} else {
  render(filmSectionComponent, filmListComponent, `beforeend`);

  const filmsList = filmListComponent.getElement().querySelector(`.films-list__container `);
  films.slice(0, FILMS_START_COUNT).forEach((film) => {
    render(filmsList, new Film(film), `beforeend`);
  });

  const showMoreBtnCompoment = new ShowMoreBtn();
  render(filmsList, showMoreBtnCompoment, `afterend`);

  render(filmSectionComponent, topRatedListComponent, `beforeend`);
  const topRatedFilmsList = topRatedListComponent.getElement().querySelector(`.top-rated`);

  render(filmSectionComponent, mostCommentedListComponent, `beforeend`);
  const mostCommentedFilmsList = mostCommentedListComponent.getElement().querySelector(`.most-commented`);

  for (let i = 0; i < EXTRA_FILMS_NUMBER; i++) {
    render(mostCommentedFilmsList, new Film(films[i]), `beforeend`);
    render(topRatedFilmsList, new Film(films[i]), `beforeend`);
  }

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

      filmDetailComponent = new FilmDetail(findItemById(films, filmID));

      render(footer, filmDetailComponent, `afterend`);

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

  let renderedFilmsCount = FILMS_COUNT_PER_STEP;
  showMoreBtnCompoment.setClickHandler(() => {

    films.slice(renderedFilmsCount, renderedFilmsCount + FILMS_COUNT_PER_STEP).forEach((film) => {
      render(filmsList, new Film(film), `beforeend`);
    });

    renderedFilmsCount += FILMS_COUNT_PER_STEP;

    if (renderedFilmsCount >= films.length) {
      remove(showMoreBtnCompoment);
    }
  });

  filmListComponent.setClickHandler(cardClickHandler);
  topRatedListComponent.setClickHandler(cardClickHandler);
  mostCommentedListComponent.setClickHandler(cardClickHandler);
}

const footerStat = footer.querySelector(`.footer__statistics`);
render(footerStat, new FilmsNumber(FILMS_NUMBER), `beforeend`);
