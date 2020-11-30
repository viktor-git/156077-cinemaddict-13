import {getRandomNum} from "../utils/utils.js";

export const generateUserStatus = () => {
  const watchFilmsNumber = getRandomNum(0, 30);

  if (watchFilmsNumber === 0) {
    return ``;
  }

  if (watchFilmsNumber > 0 && watchFilmsNumber <= 10) {
    return `novice`;
  }

  if (watchFilmsNumber > 10 && watchFilmsNumber <= 20) {
    return `fan`;
  }

  if (watchFilmsNumber >= 21) {
    return ` movie buff`;
  }
};
