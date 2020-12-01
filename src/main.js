import {createUserProfile} from "./view/header/user-profile.js";
import {createMenu} from "./view/main-content/menu/menu.js";
import {createSort} from "./view/main-content/sort.js";
import {createFilms} from "./view/main-content/films/films.js";
import {createFilmsList} from "./view/main-content/films/film-list.js";
import {createFilm} from "./view/main-content/films/films-item.js";
import {createShowMoreBtn} from "./view/main-content/films/show-more-button.js";
import {createFilmDetails} from "./view/main-content/films/film-detail.js";
import {createFooterStat} from "./view/footer/footer-stats.js";
import {generateUserProfile} from "./mocks/user-profile.js";
import {generateFilm} from "./mocks/films.js";
import {generateFilter} from "./mocks/filters.js";

const FILMS_NUMBER = 20;
const FILMS_START_COUNT = 5;
const FILMS_COUNT_PER_STEP = 5;
const EXTRA_FILMS_NUMBER = 2;

const films = new Array(FILMS_NUMBER).fill().map(generateFilm);
const filters = generateFilter(films);

const render = (inputContainer, inputTemplate, place) => {
  inputContainer.insertAdjacentHTML(place, inputTemplate);
};

const header = document.querySelector(`.header`);
render(header, createUserProfile(generateUserProfile()), `beforeend`);

const mainContent = document.querySelector(`.main`);
render(mainContent, createMenu(filters), `beforeend`);
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
films.slice(0, FILMS_START_COUNT).forEach((item, index) => {
  render(filmsList, createFilm(item), `beforeend`);
});

render(filmsList, createShowMoreBtn(), `afterend`);

const mostCommentedFilmsList = filmSection.querySelector(`.most-commented`);
const topRatedFilmsList = filmSection.querySelector(`.top-rated`);

for (let i = 0; i < EXTRA_FILMS_NUMBER; i++) {
  render(mostCommentedFilmsList, createFilm(films[i]), `beforeend`);
  render(topRatedFilmsList, createFilm(films[i]), `beforeend`);
}

const footer = document.querySelector(`.footer`);
const footerStat = footer.querySelector(`.footer__statistics`);

render(footerStat, createFooterStat(FILMS_NUMBER), `beforeend`);

const findFilmItem = (filmID) => {

   for (let film of films) {
    if (film.id === filmID) {
      return film;
    }
  }

  throw new Error(`Фильм с Id:${filmID} не найден`);
};

const cardClickHandler = (evt) => {
  const target = evt.target;

  if (target.closest(`.film-card__poster`) || target.closest(`.film-card__title`) || target.closest(`.film-card__comments`)) {
    const filmID = target.closest(`.film-card`).dataset.id;
    render(footer, createFilmDetails(findFilmItem(filmID)), `afterend`);

    const filmDetail = document.querySelector(`.film-details`);
    filmDetail.addEventListener(`click`, filmDetailCLoseHandler);
  }
};

const filmDetailCLoseHandler = (evt) => {
  const target = evt.target;
  const filmDetail = document.querySelector(`.film-details`);
  if (target.closest(`.film-details__close-btn`)) {
    filmDetail.removeEventListener(`click`, filmDetailCLoseHandler);
    filmDetail.remove();
  }
};

const showMoreBtn = filmSection.querySelector(`.films-list__show-more`);
let renderedFilmsCount = FILMS_COUNT_PER_STEP;

showMoreBtn.addEventListener(`click`, () => {

  films.slice(renderedFilmsCount, renderedFilmsCount + FILMS_COUNT_PER_STEP).forEach((item, index) => {
    render(filmsList, createFilm(item), `beforeend`);
  });

  renderedFilmsCount += FILMS_COUNT_PER_STEP;

  if (renderedFilmsCount >= films.length) {
    showMoreBtn.remove();
  }
})

filmSection.addEventListener(`click`, cardClickHandler);
