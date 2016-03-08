import {identifyElement} from './../src';


describe('identifyElement', function() {
  
  describe('meta', function() {
    
    it('should exist', function() {
      expect(identifyElement).toBeDefined();
    });
    
  });
  
  describe('element identification', function() {
    
    it('should generate new ID for unknown element', function() {
      var elm = document.createElement('div');
      var result = identifyElement(elm);
      expect(typeof result).toEqual('number');
    });

    it('should use existing ID for known element', function() {
      var elm = document.createElement('div');
      var expectation = identifyElement(elm);
      expect(identifyElement(elm)).toEqual(expectation);
    });

    it('should generate unique ID for each element', function() {
      var elm1 = document.createElement('div');
      var elm2 = document.createElement('div');
      expect(identifyElement(elm1)).not.toEqual(identifyElement(elm2));
    });

  });

  describe('namespace', function() {

    it('should use default namespace', function() {
      var elm = document.createElement('div');
      identifyElement(elm);
      expect(elm.getAttribute('data-identifyElement')).not.toBe(null);
    });

    it('should use custom namespace', function() {
      var elm = document.createElement('div');
      identifyElement(elm, 'aaa');
      expect(elm.getAttribute('data-identifyElement')).toBe(null);
      expect(elm.getAttribute('data-identifyElement-aaa')).not.toBe(null);
    });

    it('should allow to use more than one namespace on a single element', function() {
      var elm = document.createElement('div');
      identifyElement(elm, 'aaa');
      identifyElement(elm, 'bbb');
      expect(elm.getAttribute('data-identifyElement-aaa')).not.toBe(null);
      expect(elm.getAttribute('data-identifyElement-bbb')).not.toBe(null);
    });

  });

  describe('error handling', function() {

    it('should return `null` if element is not provided', function() {
      expect(identifyElement()).toEqual(null);
    });

    it('should return `null` if non-element object is provided', function() {
      expect(identifyElement('aaa')).toEqual(null);
      expect(identifyElement(['aaa'])).toEqual(null);
      expect(identifyElement({
        aaa: 'bbb'
      })).toEqual(null);
    });

  });

});