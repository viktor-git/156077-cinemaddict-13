import AbstractView from "../view/abstract.js";

const render = (container, element, place) => {

  if (container instanceof AbstractView) {
    container = container.getElement();
  }

  if (element instanceof AbstractView) {
    element = element.getElement();
  }

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
  if (inputContainer instanceof AbstractView) {
    inputContainer = inputContainer.getElement();
  }

  inputContainer.insertAdjacentHTML(place, inputTemplate);
};

const remove = (component) => {
  if (!(component instanceof AbstractView)) {
    throw new Error(`Can remove only components`);
  }

  component.getElement().remove();
  component.removeElement();
};

export {render, remove, renderElement};
