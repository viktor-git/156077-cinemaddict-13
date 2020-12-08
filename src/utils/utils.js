const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

const getRandomNum = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const render = (container, element, place) => {
  switch (place) {
    case `afterbegin`:
      container.prepend(element);
      break;
    case `beforeend`:
      container.append(element);
      break;
    case `afterend`:
      container.after(element);
      break;
    case `beforebegin`:
      container.before(element);
      break;
  }
};

const renderElement = (inputContainer, inputTemplate, place) => {
  inputContainer.insertAdjacentHTML(place, inputTemplate);
};

export {getRandomNum, createElement, renderElement, render};

