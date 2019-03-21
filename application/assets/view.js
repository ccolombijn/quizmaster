// -----------------------------------------------------------------------------
// view
const view = (function(){
  const elements = [],
  get = function( id ){
    for( let element of elements ){
      if( element.id === id ){
        return element.element
      }
    }
  },

  //...........................................................................

    element = function( element ){
      if( get( element ) ) return get( element )
      if( typeof element === 'string' ) {
        if( element.includes( '.' ) ){
          element = (() => document.querySelectorAll( element ))()
        } else {
           if ( ! element.includes( '#' ) ) element = `#${element}`
           element = (() => document.querySelector( element ))()
        }
      }

      if(element){
        if( ! element.id ) element.id = `view_element_${elements.length+1}`
        elements.push( { id : element.id, element : element } )
      }

      return element

    },

  //...........................................................................

  set = function( _element, content ){
    if( typeof _element === 'string' ) _element = element( _element )

    if( typeof content === 'object' ) {
      if(utils.isElement(content))_element.appendChild( content )
    }else if(typeof content === 'string'){
      _element.innerHTML = content
    }
    return _element
  },

  //...........................................................................

  txt = function( _element, txt ){
    txt = document.createTextNode( txt )
    element( _element ).appendChild( txt )
    return _element
  },

  //...........................................................................

  attr = function( _element, attributes ){
    const properties = Object.getOwnPropertyNames(attributes)
    for( let attribute in properties ){
        _element.setAttribute(
          properties[ attribute ],
          Object.values( attributes )[ attribute ]
        )

    }
    return _element
  },

  //...........................................................................

  add = function( parent, _element, attributes, content ){

    if( typeof parent === 'string' ) parent = element( parent );
    if( typeof _element === 'string' ) _element = document.createElement( _element )
    if( typeof attributes === 'object' ) _element = attr( _element , attributes )
    if( typeof attributes === 'string' ) content = attributes
    if( typeof content === 'string' ) txt( _element, content )
    parent.appendChild( _element )
    return _element
  }


  //...........................................................................
  // element prototypes
  //view.element.txt()
  element.prototype.txt = function( txt) {
    return txt( elements[elements.length].element, txt )
  }
  //view.element.add()
  element.prototype.add = function( _element, attributes, content ) {
    return add( elements[elements.length].element, _element, attributes, content )
  }
  //view.element.attr()
  element.prototype.attr = function( attributes ) {
    return attr( elements[elements.length].element, attributes )
  }
  return {
    elements : elements,
    element : element,
    get : get,
    add : add,
    set : set,
    txt : txt,
    attr : attr
  }
})()
