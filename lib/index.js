'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isElementIdentified = isElementIdentified;
exports.identifyElement = identifyElement;

var _iselement = require('iselement');

var _iselement2 = _interopRequireDefault(_iselement);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// stores latest used unique ID of an element
var counter = 0;

function constructAttribute(namespace) {
  var result = 'data-identifyElement';

  if (namespace) {
    result += '-' + namespace;
  }

  return result;
}

function isElementIdentified(element, namespace) {
  if ((0, _iselement2.default)(element)) {
    var attribute = constructAttribute(namespace);
    return !!element.getAttribute(attribute);
  }
  return false;
}

function identifyElement(element, namespace) {
  if (!(0, _iselement2.default)(element)) {
    return null;
  }

  var attribute = constructAttribute(namespace);

  if (!isElementIdentified(element, namespace)) {
    counter++;
    element.setAttribute(attribute, counter.toString());
  }

  return parseInt(element.getAttribute(attribute));
}