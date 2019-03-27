const bs = (function(){
  /*
  UI.addComponent({ components : [
    { fn : 'bsBtn', name : 'button', element : 'button', class : 'btn btn-' },
    { fn : 'bsAlert', name : 'alert', element : 'div', class : 'alert alert-', callback : (element)  => {
      setTimeout( () => element.parentElement.removeChild( element ), 5000 )
    } },

  ]})
  */
  const create = (element,cls,args) => {
    if(!args.class) args['class'] = ''
    if(!args.id) args['id'] = ''
    if(!args.html) args['html'] = ''
    if(typeof args.class === 'array' ) args.class = args.class.join(' ')
    return tool.make( [element,{id : args.id, class: `${cls}${args.class}`}, args.html] )
  },
  obj = utils.obj,
  element = view.element,
  set = view.set,
  call = application.call,
  hook = application.hook,
  before = application.before,
  data = model.data,
  get = model.get
  //UI.prototype.bs = function() {
  UI['bs'] = function(){
    return {
      // UI.bs.button({class:'primary',html:'Button'})
      button : (args) => {

        const button = create( 'button', 'btn btn-', args )
        if( args.controller ) controller.add( button, 'click', args.controller ) // controller click event
        return button
      },
      // UI.bs.alert({class:'primary',html:'Alert'})
      alert : (args) => {
        const alert = create( 'div', `alert alert-`, args )
        setTimeout( () => alert.parentElement.removeChild( alert ), 5000 ) // remove after 5s
        return alert
      },
      //UI.bs.grid([{'md-6':'column 1'},{'md-6':'column 2'}])
      grid : (args) => {
        const grid = create( 'div', 'container' ),
        rows = args.rows
        for( let gridRow of rows){
          let row = create( 'div', 'row' )
          for( let gridCol of gridRow ){
            row.appendChild(
              create( 'div', 'col-',{
                  class : obj(gridCol).properties[0],
                  html : obj(gridCol).values[0]
              })
            );
          }
          grid.appendChild( row )
        }
        return grid
      },
      cards : () =>{

      },
      // UI.bs.modal()
      modal : (args) =>{
          if( typeof args.class === 'array' ) args.class = args.class.join(' ')
        const modalHeader = (() => {
          if(typeof args.header === 'object'){

          }else{
            tool.make( [ 'div', { class : 'modal-header' }, args.header ] );
          }

        })()

        const modalBody = tool.make( [ 'div', {
          class : 'modal-body' }, args.body ] );

        const modalFooter = tool.make( [ 'div', {
          class : 'modal-footer' }, args.footer ] );

        if( args.primaryBtn ) {
          const primaryBtn = UI.bs.button({
            id : args.primaryBtn.id,
            class : 'primary',
            html : args.primaryBtn.html
          })
        }
        const modal = tool.make( ['div', {
          class : `modal${args.class}`,
          id : args.id,
          role : 'dialog', 'tab-index' : '-1', ''
          }, [ 'div', {
            class : 'modal-dialog', role : 'document' },
              [ 'div', {
                class : 'modal-content' },
                modalHeader, modalBody, modalFooter
              ]
            ]
          ]
        );
        if( args.controller && primaryBtn ){
          const btnController = args.controller.primaryBtn 
          ? args.controller.primaryBtn : args.controller
          controller.add( primaryBtn, 'click', btnController )
        }
        const show = (modal) => {
          if(jQuery){

          }else{
            console.error('UI.bs.modal.show() requires jQuery')
          }
        }
        if(args){
          return modal
        }else{
          return {
            show : show
          }
        }
      }

    }
  }
})()
