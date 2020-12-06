import {createElement} from "../../utils/utils.js";

const sortTitles = [
  `Sort by default`,
  `Sort by date`,
  `Sort by rating`
];

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

export default class Sort {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createSortTemplate(sortTitles);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
