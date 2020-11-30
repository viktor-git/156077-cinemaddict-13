import {getRandomNum} from "../utils/utils.js";
import * as dayjs from "dayjs";
import { v4 as uuidv4 } from 'uuid';

const generateEmotion = () => {
  const emotions = [
    `angry.png`,
    `puke.png`,
    `sleeping.png`,
    `smile.png`
  ];

   return emotions[getRandomNum(0, emotions.length - 1)];
};

const generateDate = () => {
  const year = getRandomNum(1980, 2020);
  const month = getRandomNum(1, 12);
  const day = getRandomNum(1, 28);
  const hour = getRandomNum(0, 23);
  const minute = getRandomNum(0, 60);
  const date = dayjs(`${year}-${month}-${day}-${hour}-${minute}`).format('DD MMMM YYYY HH:MM');

  return date;
};

const generateAuthor = () => {
  const authors = [
    `Евлампий`,
    `Амбимиб`,
    `Василиса`,
    `Доздраперма`
  ];

   return authors[getRandomNum(0, authors.length - 1)];
};

const generateMessage = () => {
  const messages = [
    `Interesting setting and a good cast`,
    `Booooooooooring`,
    `Very very old. Meh`,
    `Almost two hours? Seriously?`
  ];

   return messages[getRandomNum(0, messages.length - 1)];
};


export const generateComment = () => {
  return {
    id: uuidv4(),
    emotion: generateEmotion(),
    date: generateDate(),
    author: generateAuthor(),
    message: generateMessage()
  };
};
