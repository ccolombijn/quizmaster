'use strict'
const UI = ( function() {

  const make = tool.make
  const set = view.set
  const add = view.add

  return {

  //...........................................................................
    addComponent : (args) => {
      const create = (args) => make( [
        args.element,
        { id : args.id, class : args.class },
        args.html
      ])
      for( let component of args.components )  {
         this[args.fn] = () => {
           const element = create( args )
           if(args.callback) args.callback(element)
           return element
         }
      }
    },
    //...........................................................................
    overviewTable : (args) => {
      if( ! args.data ) console.error('UI.overview : args.data is undefined');
      const overviewTable = make( [
        'table', { id : `overview_${args.component}`, class : 'table' }
      ] ),
      overviewHeader = make( [ 'thead' ] ),
      overviewHeaderRow = make( [ 'tr' ] ),
      overviewBody = make( [ 'tbody' ] ),
      overviewTitle = make( [ 'h2', `${args.data.length} ${args.title}` ] );

      args.fields = utils.obj(args.fields);
      for( let header of args.fields.properties) set( overviewHeaderRow, make( [ 'th', header ]) );
      set( overviewTable,
        set( overviewHeader, overviewHeaderRow )
      );

      for( let entry of args.data ){
        let overviewRow = make( [ 'tr', { id : entry.id } ] );
        if( args.controller ) controller.add(overviewRow,'click',args.controller)
        for( let item of args.fields.values){
          let overviewRowField = make( [ 'td'] )
          add( overviewRow,
            set( overviewRowField, item(entry) )
          );
        }
        add( overviewBody, overviewRow )
      }

      set( args.target, '')
      set( args.target, overviewTitle )
      set( args.target,
        set( overviewTable, overviewBody )
      )
      if(args.callback) args.callback()
    },

  //...........................................................................

    createForm : (args) => {
      const createForm = make( [
        'form', { id : `create_form_ ${args.component}`}
      ] ),
      createTitle = make( [ 'h2', `Add item` ] );
      args.fields = utils.obj(args.fields);
      if( args.controller ) controller.add(createForm,'submit',args.controller)
    },
  //...........................................................................

    update : (args) =>{

    },
  //...........................................................................

    delete : (args) =>{

    }

  }
})()
window['UI'] = UI
