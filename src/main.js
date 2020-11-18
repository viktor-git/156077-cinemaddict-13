import {createUserProfile} from "./view/header/user-profile.js";
import {createMenu} from "./view/main-content/menu/menu.js";
import {createSort} from "./view/main-content/sort.js";
import {createFilms} from "./view/main-content/films/films.js";
import {createFilm} from "./view/main-content/films/films-item.js";
import {createShowMoreBtn} from "./view/main-content/films/show-more-button.js";
import {createFilmDetails} from "./view/main-content/films/film-detail.js";
import {createFooterStat} from "./view/footer/footer-stats.js";

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

const filmSection = document.querySelector(`.films`);
const filmsList = filmSection.querySelector(`.films-list__container`);
for (let i = 0; i < FILMS_NUMBER; i++) {
  render(filmsList, createFilm(), `beforeend`);
}
render(filmsList, createShowMoreBtn(), `afterend`);

const mostCommentedFilmsList = filmSection.querySelector(`.most-commented`);
const topRatedFilmsList = filmSection.querySelector(`.top-rated`);

for (let i = 0; i < EXTRA_FILMS_NUMBER; i++) {
  render(mostCommentedFilmsList, createFilm(), `beforeend`);
  render(topRatedFilmsList, createFilm(), `beforeend`);
}

const footer = document.querySelector(`.footer`);
render(footer, createFilmDetails(), `afterend`);

const footerStat = footer.querySelector(`.footer__statistics`);
render(footerStat, createFooterStat(), `beforeend`);
