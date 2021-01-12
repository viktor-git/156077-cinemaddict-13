const getRandomNum = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

const findItemById = (array, ID) => {
  for (let item of array) {
    if (item.id === ID) {
      return item;
    }
  }
  throw new Error(`Фильм с Id:${ID} не найден`);
};

const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1)
  ];
};

const sortByDate = (filmA, filmB) => {
  return filmB.releaseDate.split(` `)[filmA.releaseDate.split(` `).length - 1] - filmA.releaseDate.split(` `)[filmB.releaseDate.split(` `).length - 1];
};

const sortByRating = (filmA, filmB) => {
  return filmB.rating - filmA.rating;
};

export {getRandomNum, createElement, findItemById, updateItem, sortByDate, sortByRating};

