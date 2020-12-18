import {sortTitles} from "../utils/consts.js";
import Abstract from "./abstract.js";

const createSortItemTemplate = (sortTitle) => {
  return `<li><a href="#" class="sort__button ">${sortTitle}</a></li>`;
};

const createSortTemplate = (sorts) => {
  const sortTemplate = sorts.map((item) => {
    return createSortItemTemplate(item);
  }).join(``);

  return `<ul class="sort">
    ${sortTemplate}
  </ul>`;
};

export default class Sort extends Abstract {
  getTemplate() {
    return createSortTemplate(sortTitles);
  }
}
