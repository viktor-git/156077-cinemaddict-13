import {getRandomNum} from "../utils/utils.js";


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

  const texts = text.split(`.`);
  const description = [];

  for (let i = 0; i < getRandomNum(1, 5); i++) {
    description.push(texts[getRandomNum(0, texts.length)].trim());
  }

  return description.join(`. `);
};

const generateBriefDescription = () => {

  return `${generateDescription().slice(0, 139)}...`;
};

export const generateFilm = () => {
  return {
    name: generateName(),
    poster: generatePoster(),
    description: generateDescription(),
    comments: ``,
    rating: ``,
    productionYear: ``,
    duration: ``,
    genre: ``,
    commentsNumber: ``
  };
};
