import {createUserProfile} from "./view/header/user-profile.js";
import {createMenu} from "./view/main-content/menu/menu.js";
import {createSort} from "./view/main-content/sort.js";
import {createFilms} from "./view/main-content/films/films.js";
import {createFilmsList} from "./view/main-content/films/film-list.js";
import {createFilm} from "./view/main-content/films/films-item.js";
import {createShowMoreBtn} from "./view/main-content/films/show-more-button.js";
import {createFilmDetails} from "./view/main-content/films/film-detail.js";
import {createFooterStat} from "./view/footer/footer-stats.js";
import {generateFilm} from "./mocks/films.js";

const FILMS_NUMBER = 5;
const EXTRA_FILMS_NUMBER = 2;

const render = (inputContainer, inputTemplate, place) => {
  inputContainer.insertAdjacentHTML(place, inputTemplate);
};

const header = document.querySelector(`.header`);
render(header, createUserProfile(), `beforeend`);

const mainContent = document.querySelector(`.main`);
render(mainContent, createMenu(), `beforeend`);
render(mainContent, createSort(), `beforeend`);
render(mainContent, createFilms(), `beforeend`);

const filmSection = mainContent.querySelector(`.films`);

const filmSectionOptions = {
  sectionTitle: `All movies. Upcoming`,
  hidden: `visually-hidden`
};

const topRatedOptions = {
  sectionTitle: `Top rated`,
  sectionClass: `films-list--extra`,
  specialClassName: `top-rated`
};

const mostCommentedOptions = {
  sectionTitle: `Most commented`,
  sectionClass: `films-list--extra`,
  specialClassName: `most-commented`
};

render(filmSection, createFilmsList(filmSectionOptions), `beforeend`);
render(filmSection, createFilmsList(topRatedOptions), `beforeend`);
render(filmSection, createFilmsList(mostCommentedOptions), `beforeend`);

const filmsList = filmSection.querySelector(`.films-list__container`);
for (let i = 0; i < FILMS_NUMBER; i++) {
  render(filmsList, createFilm(generateFilm()), `beforeend`);
}
render(filmsList, createShowMoreBtn(), `afterend`);

const mostCommentedFilmsList = filmSection.querySelector(`.most-commented`);
const topRatedFilmsList = filmSection.querySelector(`.top-rated`);

for (let i = 0; i < EXTRA_FILMS_NUMBER; i++) {
  render(mostCommentedFilmsList, createFilm(generateFilm()), `beforeend`);
  render(topRatedFilmsList, createFilm(generateFilm()), `beforeend`);
}

const footer = document.querySelector(`.footer`);
render(footer, createFilmDetails(), `afterend`);

const footerStat = footer.querySelector(`.footer__statistics`);
render(footerStat, createFooterStat(), `beforeend`);

const filmDetail = document.querySelector(`.film-details`);

const cardClickHandler = (evt) => {
  const target = evt.target;

  if (target.closest(`.film-card__poster`) || target.closest(`.film-card__title`) || target.closest(`.film-card__comments`)) {
    filmDetail.classList.remove(`visually-hidden`);
  }
  document.addEventListener(`click`, filmDetailCLoseHandler);
};

const filmDetailCLoseHandler = (evt) => {
  const target = evt.target;

  if (target.closest(`.film-details__close-btn`)) {
    filmDetail.classList.add(`visually-hidden`);
  }
  document.removeEventListener(`click`, filmDetailCLoseHandler);
};

document.addEventListener(`click`, cardClickHandler);

