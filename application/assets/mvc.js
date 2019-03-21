// model
const model = (function(){
 const data = {},
       components = [],
  //...........................................................................

       obj = utils.obj,

  //...........................................................................

       add = (data) => {
         for (let item in obj(data).properties)
           data[obj(data).properties[item]] = obj(data).values[item];
       },

   //...........................................................................

       component = ( component ) => {
         if( component.selector ) component = component.selector;
         return data[component];
       },

   //...........................................................................

       apiRequest = ( args, callback ) => {
         let xhr = new XMLHttpRequest()
         if( !args ) args = {}
         if( !args.type ) args[ 'type' ] = 'GET'
         if( !args.status ) args[ 'status' ] = 200

         xhr.addEventListener( 'load',  ( event ) => {
           if ( xhr.readyState === 4 && xhr.status === args.status ) {
             data[args.component] = JSON.parse(event.target.responseText)
             if(callback) callback( event, args )
           }
         })
         // xhr.open( args.type, `http://${application.apiBasePath()}${args.component}`, true )
         // console.log(application.apiBasePath())
         xhr.open( args.type, `http://${args.apiBasePath}/${args.component}`, true )
         xhr.open( args.type, `http://localhost:8081/api/${args.component}`, true )
         xhr.send( args.data )
       }

  //...........................................................................
 return {
   data : data,
   components : components,
   component : component,
   apiRequest : apiRequest
 }
})()
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
