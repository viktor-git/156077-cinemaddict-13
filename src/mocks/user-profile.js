import {getRandomNum} from "../utils/utils.js";

const generateWatchFilmsNumber = () => {
  return getRandomNum(0, 30);
};

const generateUserStatus = (watchFilmsNumber) => {

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
    return `movie buff`;
  }

  return false;
};

export const generateUserProfile = () => {
  return {
    status: generateUserStatus(getRandomNum(0, 30)),
    watchFilmsCount: generateWatchFilmsNumber()
  };
};
