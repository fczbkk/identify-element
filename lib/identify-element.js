/*
Identify element, v1.0.0
by Riki Fridrich
https://github.com/fczbkk/identify-element
*/

(function() {
  var counter, identifyElement, isElement, root;

  counter = 0;

  isElement = function(element) {
    return (element != null) && typeof element === 'object' && element.nodeType === 1 && typeof element.setAttribute === 'function' && typeof element.getAttribute === 'function';
  };

  identifyElement = function(element, namespace) {
    var attr;
    if (namespace == null) {
      namespace = '';
    }
    if (isElement(element)) {
      attr = "data-identifyElement" + namespace;
      if (!element.getAttribute(attr)) {
        element.setAttribute(attr, counter++);
      }
      return parseInt(element.getAttribute(attr));
    }
    return null;
  };

  if (typeof expose !== "undefined" && expose !== null) {
    expose(identifyElement, 'identifyElement');
  } else {
    root = typeof exports === 'object' ? exports : this;
    root.identifyElement = identifyElement;
  }

}).call(this);
