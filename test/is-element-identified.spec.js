import {isElementIdentified, identifyElement} from './../src';


describe('isElementIdentified', function() {

  it('should return `false` when element does not exist', function () {
    expect(isElementIdentified()).toEqual(false);
  });

  it('should return `false` when element is not identified yet', function () {
    var elm = document.createElement('div');
    expect(isElementIdentified(elm)).toEqual(false);
  });

  it('should return `true` when element is identified', function () {
    var elm = document.createElement('div');
    identifyElement(elm);
    expect(isElementIdentified(elm)).toEqual(true);
  });

  it('should return `false` if element is identified in other NS', function () {
    var elm = document.createElement('div');
    identifyElement(elm, 'aaa');
    expect(isElementIdentified(elm, 'bbb')).toEqual(false);
  });

  it('should return `true` if element is identified in NS', function () {
    var elm = document.createElement('div');
    identifyElement(elm, 'aaa');
    expect(isElementIdentified(elm, 'aaa')).toEqual(true);
  });

});