# Identify element

A simple way to uniquely identify an HTML element.

```javascript
// It returns unique number for every element.

var aaa = document.createElement('div');
var bbb = document.createElement('div');

identifyElement(aaa);  // --> 1
identifyElement(bbb);  // --> 2
identifyElement(aaa);  // --> 1

// That number is the same for given element, as long as the element exists.
var elm = document.createElement('div');
identifyElement(elm);  // --> 3
elm = document.createElement('div'); // replace element with new one
identifyElement(elm);  // --> 4

// You can use your own namespace for unique IDs.
// An element can have unique ID for any number of namespaces.
var elm = document.createElement('div');
identifyElement(elm, 'aaa');  // --> 5
identifyElement(elm, 'bbb');  // --> 6

// Returns `null` for non-elements.
identifyElement();  // --> null
identifyElement('aaa');  // --> null
```

The function uses `data-*` attributes to store IDs associated with the element. These attributes have no impact on element's appearance or functionality.

The function should work fine in any browser that supports `Element.getAttribute` and `Element.setAttribute`. Which means it works in any modern browser and in IE8+. I didn't bother testing it in older versions of IE.

The generated IDs should be sequential. But don't rely on it, especially if you are using namespaces.

## Bug reports, feature requests and contact

If you found any bugs, if you have feature requests or any questions, please, either [file an issue at GitHub](https://github.com/fczbkk/identify-element/issues) or send me an e-mail at [riki@fczbkk.com](mailto:riki@fczbkk.com).


## License

Identify element is published under the [MIT license](https://github.com/fczbkk/identify-element/blob/master/LICENSE).
