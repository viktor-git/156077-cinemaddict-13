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

  constructor(sortTitle) {
    super();
    this._sortTitles = sortTitle;
  }

  getTemplate() {
    return createSortTemplate(this._sortTitles);
  }
}
