import {getRandomNum} from "../utils/utils.js";
import * as dayjs from "dayjs";
import {generateComment} from "../mocks/comments.js";

console.log(getRandomNum());
const generateName = () => {
  const names = [
    `Шальная миля`,
    `Веселый дед`,
    `Ну это добрый вечер`,
    `Оу бой`,
    `Вот это поворот...не туда`
  ];

  return names[getRandomNum(0, names.length)];
};

const generatePoster = () => {
  const posters = [
    `made-for-each-other.png`,
    `popeye-meets-sinbad.png`,
    `sagebrush-trail.jpg`,
    `santa-claus-conquers-the-martians.jpg`,
    `the-dance-of-life.jpg`,
    `the-great-flamarion.jpg`,
    `the-man-with-the-golden-arm.jpg`
  ];

  return posters[getRandomNum(0, posters.length)];
};

const generateDescription = () => {
  const text = `Lorem ipsum dolor sit amet,consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Ed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;

  const texts = text.split(`. `);
  const description = [];

  for (let i = 0; i < getRandomNum(1, 5); i++) {
    description.push(texts[getRandomNum(0, texts.length)].trim());
  }

  return description.join(`. `);
};

const generateRating = () => {
  const MIN_RAITING = 1;
  const MAX_RAITING = 10;
  return getRandomNum(MIN_RAITING, MAX_RAITING);
};

const generateProductionYear = () => {
  const MIN_YEAR = 1980;
  const MAX_YEAR = 2020;
  return getRandomNum(MIN_YEAR, MAX_YEAR);
};

const generateGenre = () => {
  const genres = [
    `Musical`,
    `Horror`,
    `Comedy`,
    `Lyric`,
    `Erunda`
  ];
  const filmGenres =  [];
  for (let i = 0; i < getRandomNum(1, genres.length); i++) {
    filmGenres.push(genres[getRandomNum(0, genres.length)]);
  }
  return filmGenres;
};

const generateDuration = () => {
  const MIN_HOUR = 1;
  const MAX_HOUR = 3;
  const MIN_MINUTES = 20;
  const MAX_MINUTES = 59;

  const hours = getRandomNum(MIN_HOUR, MAX_HOUR);
  const minutes = getRandomNum(MIN_MINUTES, MAX_MINUTES);

  return `${hours}h ${minutes}m`;
};

const generateComments = () => {
  const comments = [];
  for (let i = 0; i < getRandomNum(0 , 5); i++) {
    comments.push(generateComment());
  }

  return comments;
}

const generateProducer = () => {
  const producers = [
  `Anthony Mann`,
  `Anthonya Womann`,
  `Anatole Mannsteiner`,
  `Yacik Man`
  ];

  return producers[getRandomNum(0 , producers.length)];
};

const generateWriters = () => {
  const writers = [
  `Anne Wigton`,
  `Heinz Herald`,
  `Richard Wei`,
  `Herald Anne`
  ];

  const filmWriters = [];
  for (let i = 0; i < getRandomNum(1 , writers.length); i++) {
    filmWriters.push(writers[getRandomNum(0, writers.length)]);
  }

  return filmWriters;

};

const generateActors = () => {
  const actors = [
  `Erich von Stroheim`,
  `Mary Beth Hughes`,
  `Dan Duryea`,
  `Herald Anne`,
  `Anne Wigton`,
  `Heinz Herald`,
  `Richard Wei`
  ];

  const filmActors = [];
  for (let i = 0; i < getRandomNum(1 , actors.length); i++) {
    filmActors.push(actors[getRandomNum(0, actors.length)]);
  }

  return filmActors;

};

const generateReleaseDate = () => {
  const year = getRandomNum(1980, 2020);
  const month = getRandomNum(1, 12);
  const day = getRandomNum(1, 28);
  const date = dayjs(`${year} ${month} ${day}`).format('DD MMMM YYYY');

  return date;
};

const generateCountry = () => {
  const countries = [
  `USA`,
  `Poland`,
  `Russia`,
  `Italy`
  ];

  return countries[getRandomNum(0 , countries.length)];
};

const generateAgeRating = () => {
  const ageRatings = [
  `18+`,
  `16+`,
  `12+`,
  `6+`
  ];

  return ageRatings[getRandomNum(0 , ageRatings.length)];
};

export const generateFilm = () => {
  return {
    name: generateName(),
    poster: generatePoster(),
    description: generateDescription(),
    comments: generateComments(),
    rating: generateRating(),
    productionYear: generateProductionYear(),
    duration: generateDuration(),
    genre: generateGenre(),
    producer: generateProducer(),
    writers: generateWriters(),
    actors: generateActors(),
    releaseDate: generateReleaseDate(),
    country: generateCountry(),
    ageRating: generateAgeRating(),
    isWatchList: Boolean(getRandomNum(0, 2)),
    isHistory: Boolean(getRandomNum(0, 2)),
    isFavorite: Boolean(getRandomNum(0, 2))
  };
};
