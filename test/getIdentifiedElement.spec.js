import {identifyElement, getIdentifiedElement} from './../src';


describe('getIdentifiedElement', function() {

  it('should return `null` when ID is not provided', function () {
    expect(getIdentifiedElement()).toEqual(null);
  });

  it('should return `null` when non-existing ID', function () {
    expect(getIdentifiedElement('xxx')).toEqual(null);
  });

  it('should return element when correct ID is provided', function () {
    var elm = document.createElement('div');
    var id = identifyElement(elm);
    expect(getIdentifiedElement(id)).toEqual(elm);
  });

});