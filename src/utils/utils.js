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

export {getRandomNum, createElement, findItemById};

