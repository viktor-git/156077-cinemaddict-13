import Abstract from "./abstract.js";
import {SortType} from "../utils/consts.js";

const createSortItemTemplate = (sortType, sortTitle) => {
  return `<li><a href="#" data-sort-type="${sortType}" class="sort__button ">${sortTitle}</a></li>`;
};

const createSortTemplate = (sortType) => {

  const sortTemplate = [];

  for (const [key, value] of Object.entries(sortType)) {
    sortTemplate.push(createSortItemTemplate(key, value));
  }

  return `<ul class="sort">
    ${sortTemplate.join(``)}
  </ul>`;
};

export default class Sort extends Abstract {

  constructor() {
    super();
    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createSortTemplate(SortType);
  }

  _sortTypeChangeHandler(evt) {

    if (evt.target.tagName !== `A`) {
      return;
    }

    evt.preventDefault();
    this._callback.sortTypeChange(evt.target.dataset.sortType);
  }

  setSortTypeChangeHandler(callback) {
    this._callback.sortTypeChange = callback;
    this.getElement().addEventListener(`click`, this._sortTypeChangeHandler);
  }
}
