// -----------------------------------------------------------------------------
// controller
const controller = (function(){

  const actions = [],
  events = [],

  action = (args)=>actions.push(args),
  //...........................................................................

  add = function( element, action, callback ){
    if( typeof element === 'string' ) element = view.element( element )
    events.push( { event : event, element : element, action : action } )
    element.addEventListener( action, ( event ) => {

      event.preventDefault()
      //event.stopPropagation();
      callback( event )
      receptor( event )
    })
  },
  //...........................................................................

  receptor = function(event) {
    const component = event.target.id; // id of element added to controller acts as trigger to component to receptor
    for (let action of actions) {
      if (action.component === component) action.do();
    }
  },

  //...........................................................................

  component = function(element, event, action) {
    actions.push({ component: element.id, event : event, do: action });
  }

  //...........................................................................
  get = function(event){
    for( item of events ){
      if( item === event ) return item
    }
  }
  return {
    actions : actions,
    events : events,
    add : add,
    component : component
  }
})()
