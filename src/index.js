import isElement from 'iselement';

// stores latest used unique ID of an element
let counter = 0;

// stores references to elements by their ID
const cache = {};


function constructAttribute (namespace) {
  let result = 'data-identifyElement';

  if (namespace) {
    result += '-' + namespace;
  }

  return result;
}


export function isElementIdentified (element, namespace) {
  if (isElement(element)) {
    const attribute = constructAttribute(namespace);
    return !!element.getAttribute(attribute);
  }
  return false;
}


export function identifyElement (element, namespace) {
  if (!isElement(element)) {
    return null;
  }

  const attribute = constructAttribute(namespace);

  if (!isElementIdentified(element, namespace)) {
    counter++;
    element.setAttribute(attribute, counter.toString());
  }

  const id = parseInt(element.getAttribute(attribute));
  cache[id] = element;

  return id;
}


export function getIdentifiedElement (id) {
  return cache[id] || null;
}