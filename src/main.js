import MoviesListPresenter from "./presenter/movies-list.js";
import UserProfile from "./view/user-profile.js";
import Menu from "./view/menu.js";
import FilmsNumber from "./view/footer-stats.js";
import MoviesModel from "./model/movies.js";
import {generateUserProfile} from "./mocks/user-profile.js";
import {generateFilm} from "./mocks/films.js";
import {generateFilter} from "./mocks/filters.js";
import {render} from "./utils/render.js";
import Api from "./api.js";

const FILMS_NUMBER = 20;

const AUTHORIZATION = `Basic eo0w590ik29889a`;
const END_POINT = `https://13.ecmascript.pages.academy/cinemaddict`;

const films = new Array(FILMS_NUMBER).fill().map(generateFilm);
const filters = generateFilter(films);

const filmsModel = new MoviesModel();
filmsModel.setFilms(films);

const header = document.querySelector(`.header`);
render(header, new UserProfile(generateUserProfile()), `beforeend`);

const mainContent = document.querySelector(`.main`);
render(mainContent, new Menu(filters), `beforeend`);

const filmsPresenter = new MoviesListPresenter(mainContent, filmsModel);

const footer = document.querySelector(`.footer`);
const footerStat = footer.querySelector(`.footer__statistics`);
render(footerStat, new FilmsNumber(FILMS_NUMBER), `beforeend`);

filmsPresenter.init();

const api = new Api(END_POINT, AUTHORIZATION);

api.getFilms().then((films) => {
  console.log(films);
});
