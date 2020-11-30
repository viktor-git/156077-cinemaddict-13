import {filterTitle} from "../../../utils/consts.js";
const createFilterItemTemplate = (filter) => {

  const {name, count} = filter;

  if (name === `all`) {
    return `<a href="${name}" class="main-navigation__item">${(filterTitle[name] !== undefined) ? filterTitle[name] : name}`;
  } else {
    return `<a href="${name}" class="main-navigation__item">${(filterTitle[name] !== undefined) ? filterTitle[name] : name}
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

export const createMenu = (filters) => {
  return `<nav class="main-navigation">
      ${createFilterTemplate(filters)}
    <a href="#stats" class="main-navigation__additional">Stats</a>
  </nav>`;
};
