import UserProfile from "./view/header/user-profile.js";
import Menu from "./view/main-content/menu/menu.js";
import Sort from "./view/main-content/sort.js";
import FilmSection from "./view/main-content/films/films.js";
import FilmList from "./view/main-content/films/film-list.js";
import Film from "./view/main-content/films/films-item.js";
import ShowMoreBtn from "./view/main-content/films/show-more-button.js";
import FilmDetail from "./view/main-content/films/film-detail.js";
import FilmsNumber from "./view/footer/footer-stats.js";
import {generateUserProfile} from "./mocks/user-profile.js";
import {generateFilm} from "./mocks/films.js";
import {generateFilter} from "./mocks/filters.js";
import {render} from "./utils/utils.js";

const FILMS_NUMBER = 20;
const FILMS_START_COUNT = 5;
const FILMS_COUNT_PER_STEP = 5;
const EXTRA_FILMS_NUMBER = 2;

const films = new Array(FILMS_NUMBER).fill().map(generateFilm);
const filters = generateFilter(films);

const header = document.querySelector(`.header`);
render(header, new UserProfile(generateUserProfile()).getElement(), `beforeend`);

const mainContent = document.querySelector(`.main`);
render(mainContent, new Menu(filters).getElement(), `beforeend`);
render(mainContent, new Sort().getElement(), `beforeend`);
render(mainContent, new FilmSection().getElement(), `beforeend`);

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

render(filmSection, new FilmList(filmSectionOptions).getElement(), `beforeend`);
render(filmSection, new FilmList(topRatedOptions).getElement(), `beforeend`);
render(filmSection, new FilmList(mostCommentedOptions).getElement(), `beforeend`);

const filmsList = filmSection.querySelector(`.films-list__container`);

films.slice(0, FILMS_START_COUNT).forEach((film) => {
  render(filmsList, new Film(film).getElement(), `beforeend`);
});

render(filmsList, new ShowMoreBtn().getElement(), `afterend`);

const mostCommentedFilmsList = filmSection.querySelector(`.most-commented`);
const topRatedFilmsList = filmSection.querySelector(`.top-rated`);

for (let i = 0; i < EXTRA_FILMS_NUMBER; i++) {
  render(mostCommentedFilmsList, new Film(films[i]).getElement(), `beforeend`);
  render(topRatedFilmsList, new Film(films[i]).getElement(), `beforeend`);
}

const footer = document.querySelector(`.footer`);
const footerStat = footer.querySelector(`.footer__statistics`);
render(footerStat, new FilmsNumber(FILMS_NUMBER).getElement(), `beforeend`);

const findFilmItem = (filmID) => {
  for (let film of films) {
    if (film.id === filmID) {
      return film;
    }
  }
  throw new Error(`Фильм с Id:${filmID} не найден`);
};

let filmDetail = null;
const escCLoseHandler = (evt) => {
  if (evt.key === `Escape` || evt.key === `Esc`) {
    evt.preventDefault();
    filmDetail.remove();
    document.removeEventListener(`keydown`, escCLoseHandler);
  }
};

const cardClickHandler = (evt) => {
  const target = evt.target;
  if (filmDetail) {
    filmDetail.remove();
  }

  if (target.closest(`.film-card__poster`) || target.closest(`.film-card__title`) || target.closest(`.film-card__comments`)) {
    const filmID = target.closest(`.film-card`).dataset.id;

    const FilmDetailTemplate = new FilmDetail(findFilmItem(filmID));

    render(footer, FilmDetailTemplate.getElement(), `afterend`);

    document.body.classList.add(`hide-overflow`);
    filmDetail = FilmDetailTemplate.getElement();

    filmDetail.addEventListener(`click`, filmDetailCLoseHandler);
    document.addEventListener(`keydown`, escCLoseHandler);
  }
};

const filmDetailCLoseHandler = (evt) => {
  const target = evt.target;

  if (target.closest(`.film-details__close-btn`) || target.closest(`.film-details`) === null) {
    filmDetail.remove();
    filmDetail.removeEventListener(`click`, escCLoseHandler);
    document.body.classList.remove(`hide-overflow`);
  }
};

const showMoreBtn = filmSection.querySelector(`.films-list__show-more`);
let renderedFilmsCount = FILMS_COUNT_PER_STEP;

showMoreBtn.addEventListener(`click`, () => {

  films.slice(renderedFilmsCount, renderedFilmsCount + FILMS_COUNT_PER_STEP).forEach((film) => {
    render(filmsList, new Film(film).getElement(), `beforeend`);
  });

  renderedFilmsCount += FILMS_COUNT_PER_STEP;

  if (renderedFilmsCount >= films.length) {
    showMoreBtn.remove();
  }
});

filmSection.addEventListener(`click`, cardClickHandler);
