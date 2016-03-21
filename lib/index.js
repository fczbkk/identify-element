'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.identifyElement = identifyElement;
exports.isElementIdentified = isElementIdentified;
exports.getIdentifiedElement = getIdentifiedElement;

var _iselement = require('iselement');

var _iselement2 = _interopRequireDefault(_iselement);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// stores latest used unique ID of an element
var counter = 0;

// stores references to elements by their ID
var cache = {};

function constructAttribute(namespace) {
  var result = 'data-identifyElement';

  if (namespace) {
    result += '-' + namespace;
  }

  return result;
}

/**
 * Returns unique identifier for the provided element.
 * @param {HTMLElement} element
 * @param {string} namespace Additional identification of namespace, if you need to identify the same element within several contexts.
 * @returns {?number} Number if identifiable element is provided, otherwise `null`.
 *
 * @example <caption>Simple identification of element.</caption>
 * var elm = document.createElement('div');
 * identifyElement(elm);  // returns e.g. 1
 * identifyElement(elm);  // every consecutive call returns the same ID, e.g. 1
 *
 * @example <caption>Identifying element using different namespaces.</caption>
 * var elm = document.createElement('div');
 * identifyElement(elm, 'aaa');  // returns e.g. 1
 * identifyElement(elm, 'bbb');  // returns e.g. 2
 */
function identifyElement(element, namespace) {
  if (!(0, _iselement2.default)(element)) {
    return null;
  }

  var attribute = constructAttribute(namespace);

  if (!isElementIdentified(element, namespace)) {
    counter++;
    element.setAttribute(attribute, counter.toString());
  }

  var id = parseInt(element.getAttribute(attribute));
  cache[id] = element;

  return id;
}

/**
 * Checks whether provided element is already identified.
 * @param {HTMLElement} element
 * @param {string} namespace
 * @returns {boolean}
 *
 * @example
 * var elm = document.createElement('div');
 * isElementIdentified(elm); // returns false
 * identifyElement(elm);
 * isElementIdentified(elm); // returns true
 */
function isElementIdentified(element, namespace) {
  if ((0, _iselement2.default)(element)) {
    var attribute = constructAttribute(namespace);
    return !!element.getAttribute(attribute);
  }
  return false;
}

/**
 * Gets element that was previously identified using [`identifyElement()`](#identifyelement).
 * @param {number} id
 * @returns {?HTMLElement} Identified element if found, otherwise `null`.
 *
 * @example
 * var elm = document.createElement('div');
 * var id = identifyElement(elm);
 * getidentifiedElement(id);  // returns elm
 */
function getIdentifiedElement(id) {
  return cache[id] || null;
}