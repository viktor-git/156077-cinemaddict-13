import {filterTitle} from "../../../utils/consts.js";
import {createElement} from "../../../utils/utils.js";
const createFilterItemTemplate = (filter) => {

  const {name, count} = filter;

  if (name === `all`) {
    return `<a href="#${name}" class="main-navigation__item">${(filterTitle[name] !== undefined) ? filterTitle[name] : name}`;
  } else {
    return `<a href="#${name}" class="main-navigation__item">${(filterTitle[name] !== undefined) ? filterTitle[name] : name}
    <span class="main-navigation__item-count">${count}</span></a>`;
  }
};

const createFilterTemplate = (filters) => {
  const filterItemsTemplate = filters
  .map((filter) => {
    return createFilterItemTemplate(filter);
  }).join(``);

  return `
     <div class="main-navigation__items">
        ${filterItemsTemplate}
    </div>
  `;
};

const createMenu = (filters) => {
  return `<nav class="main-navigation">
      ${createFilterTemplate(filters)}
    <a href="#stats" class="main-navigation__additional">Stats</a>
  </nav>`;
};

export default class Menu {
  constructor(filters) {
    this._filters = filters;

    this._element = null;
  }

  getTemplate() {
    return createMenu(this._filters);
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
