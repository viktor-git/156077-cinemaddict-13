//Генерация случайного числа
const getRandomNum = (min = 0, max = 1) => {
  return Math.floor(Math.random() * (max - min) + min);
};

export {getRandomNum};

