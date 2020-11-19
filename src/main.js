import {CreateUserProfile} from "./view/header/user-profile.js";
import {CreateMenu} from "./view/main-content/menu/menu.js";
import {CreateSort} from "./view/main-content/sort.js";
import {CreateFilms} from "./view/main-content/films/films.js";
import {CreateFilmsList} from "./view/main-content/films/film-list.js";
import {CreateFilm} from "./view/main-content/films/films-item.js";
import {CreateShowMoreBtn} from "./view/main-content/films/show-more-button.js";
import {CreateFilmDetails} from "./view/main-content/films/film-detail.js";
import {CreateFooterStat} from "./view/footer/footer-stats.js";

const FILMS_NUMBER = 5;
const EXTRA_FILMS_NUMBER = 2;

const render = (inputContainer, inputTemplate, place) => {
  inputContainer.insertAdjacentHTML(place, inputTemplate);
};

const header = document.querySelector(`.header`);
render(header, CreateUserProfile(), `beforeend`);

const mainContent = document.querySelector(`.main`);
render(mainContent, CreateMenu(), `beforeend`);
render(mainContent, CreateSort(), `beforeend`);
render(mainContent, CreateFilms(), `beforeend`);

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

render(filmSection, CreateFilmsList(filmSectionOptions), `beforeend`);
render(filmSection, CreateFilmsList(topRatedOptions), `beforeend`);
render(filmSection, CreateFilmsList(mostCommentedOptions), `beforeend`);

const filmsList = filmSection.querySelector(`.films-list__container`);

for (let i = 0; i < FILMS_NUMBER; i++) {
 render(filmsList, CreateFilm(), `beforeend`);
}
render(filmsList, CreateShowMoreBtn(), `afterend`);

const mostCommentedFilmsList = filmSection.querySelector(`.most-commented`);
const topRatedFilmsList = filmSection.querySelector(`.top-rated`);

for (let i = 0; i < EXTRA_FILMS_NUMBER; i++) {
  render(mostCommentedFilmsList, CreateFilm(), `beforeend`);
  render(topRatedFilmsList, CreateFilm(), `beforeend`);
}

const footer = document.querySelector(`.footer`);
render(footer, CreateFilmDetails(), `afterend`);

const footerStat = footer.querySelector(`.footer__statistics`);
render(footerStat, CreateFooterStat(), `beforeend`);
