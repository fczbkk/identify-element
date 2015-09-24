describe 'identifyElement', ->


  describe 'meta', ->

    it 'should exist', ->
      expect(identifyElement).toBeDefined()


  describe 'element identification', ->

    it 'should generate new ID for unknown element', ->
      elm = document.createElement 'div'
      result = identifyElement elm
      expect(typeof result).toEqual 'number'

    it 'should use existing ID for known element', ->
      elm = document.createElement 'div'
      expectation = identifyElement elm
      expect(identifyElement elm).toEqual expectation

    it 'should generate unique ID for each element', ->
      elm1 = document.createElement 'div'
      elm2 = document.createElement 'div'
      expect(identifyElement elm1).not.toEqual identifyElement elm2


  describe 'namespace', ->

    it 'should use default namespace', ->
      elm = document.createElement 'div'
      identifyElement elm
      expect(elm.getAttribute 'data-identifyElement').not.toBe null

    it 'should use custom namespace', ->
      elm = document.createElement 'div'
      identifyElement elm, 'aaa'
      expect(elm.getAttribute 'data-identifyElement').toBe null
      expect(elm.getAttribute 'data-identifyElementaaa').not.toBe null

    it 'should allow to use more than one namespace on a single element', ->
      elm = document.createElement 'div'
      identifyElement elm, 'aaa'
      identifyElement elm, 'bbb'
      expect(elm.getAttribute 'data-identifyElementaaa').not.toBe null
      expect(elm.getAttribute 'data-identifyElementbbb').not.toBe null


  describe 'error handling', ->

    it 'should return `null` if element is not provided', ->
      expect(identifyElement()).toEqual null

    it 'should return `null` if non-element object is provided', ->
      expect(identifyElement 'aaa').toEqual null
      expect(identifyElement ['aaa']).toEqual null
      expect(identifyElement {aaa: 'bbb'}).toEqual null
