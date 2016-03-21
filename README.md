# Identify element

A simple way to uniquely identify an HTML element.

## Documentation

### getIdentifiedElement

Gets element that was previously identified using [`identifyElement()`](#identifyelement).

**Parameters**

-   `id` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** 

**Examples**

```javascript
var elm = document.createElement('div');
var id = identifyElement(elm);
getidentifiedElement(id);  // returns elm
```

Returns **?[HTMLElement](https://developer.mozilla.org/en-US/docs/Web/HTML/Element)** Identified element if found, otherwise `null`.

### identifyElement

Returns unique identifier for the provided element.

**Parameters**

-   `element` **[HTMLElement](https://developer.mozilla.org/en-US/docs/Web/HTML/Element)** 
-   `namespace` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Additional identification of namespace, if you need to identify the same element within several contexts.

**Examples**

_Simple identification of element._

```javascript
var elm = document.createElement('div');
identifyElement(elm);  // returns e.g. 1
identifyElement(elm);  // every consecutive call returns the same ID, e.g. 1
```

_Identifying element using different namespaces._

```javascript
var elm = document.createElement('div');
identifyElement(elm, 'aaa');  // returns e.g. 1
identifyElement(elm, 'bbb');  // returns e.g. 2
```

Returns **(?[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number))** Number if identifiable element is provided, otherwise `null`.

### isElementIdentified

Checks whether provided element is already identified.

**Parameters**

-   `element` **[HTMLElement](https://developer.mozilla.org/en-US/docs/Web/HTML/Element)** 
-   `namespace` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** 

**Examples**

```javascript
var elm = document.createElement('div');
isElementIdentified(elm); // returns false
identifyElement(elm);
isElementIdentified(elm); // returns true
```

Returns **[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** 

## How it works

The function uses `data-*` attributes to store IDs associated with the element. These attributes have no impact on element's appearance or functionality.

The function should work fine in any browser that supports `Element.getAttribute` and `Element.setAttribute`. Which means it works in any modern browser and in IE8+. I didn't bother testing it in older versions of IE.

The generated IDs should be sequential. But don't rely on it, especially if you are using namespaces.

## Bug reports, feature requests and contact

If you found any bugs, if you have feature requests or any questions, please, either [file an issue at GitHub](https://github.com/fczbkk/identify-element/issues) or send me an e-mail at <a href="mailto:riki@fczbkk.com">riki@fczbkk.com</a>.

## License

Identify element is published under the [MIT license](https://github.com/fczbkk/identify-element/blob/master/LICENSE).
