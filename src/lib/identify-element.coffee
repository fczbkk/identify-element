# stores latest unique ID of an element
counter = 0


# utility function, returns `true` if provided object is HTML element
isElement = (element) ->
  element? and
  typeof element is 'object' and
  element.nodeType is 1 and
  typeof element.setAttribute is 'function' and
  typeof element.getAttribute is 'function'


identifyElement = (element, namespace = '') ->
  if isElement element
    attr = "data-identifyElement#{namespace}"
    unless element.getAttribute attr
      element.setAttribute attr, counter++
    return parseInt element.getAttribute attr
  return null


# Expose object to the global namespace.
if expose?
  expose identifyElement, 'identifyElement'
else
  root = if typeof exports is 'object' then exports else this
  root.identifyElement = identifyElement
