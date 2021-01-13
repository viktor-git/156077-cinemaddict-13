import MoviesListPresenter from "./presenter/movies-list.js";
import UserProfile from "./view/user-profile.js";
import Menu from "./view/menu.js";
import FilmsNumber from "./view/footer-stats.js";
import {generateUserProfile} from "./mocks/user-profile.js";
import {generateFilm} from "./mocks/films.js";
import {generateFilter} from "./mocks/filters.js";
import {render} from "./utils/render.js";

const FILMS_NUMBER = 20;

const films = new Array(FILMS_NUMBER).fill().map(generateFilm);
const filters = generateFilter(films);

const header = document.querySelector(`.header`);
render(header, new UserProfile(generateUserProfile()), `beforeend`);

const mainContent = document.querySelector(`.main`);
render(mainContent, new Menu(filters), `beforeend`);

const filmsPresenter = new MoviesListPresenter(mainContent);

const footer = document.querySelector(`.footer`);
const footerStat = footer.querySelector(`.footer__statistics`);
render(footerStat, new FilmsNumber(FILMS_NUMBER), `beforeend`);

filmsPresenter.init(films, filters);
