// model
const model = (function(){
 const data = {},
       components = [],
       load = (args) => {
         model.components = args.components
         for ( let item of model.components ){
           model.apiRequest({ api : args.api, endpoint : item.endpoint})
         }
       },

  //...........................................................................

       obj = utils.obj,

  //...........................................................................

       add = (data) => {
         for (let item in obj(data).properties)
           data[obj(data).properties[item]] = obj(data).values[item];
       },

   //...........................................................................

      get = (id , coll ) => data[ coll ].find( (item) => parseInt(item.id) === parseInt(id) ),

   //...........................................................................

       apiRequest = ( args, callback ) => {

         let xhr = new XMLHttpRequest()
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
         xhr.open( args.type, `http://${args.api}/${args.endpoint}`, true )
         //xhr.open( args.type, `http://localhost:8081/api/${args.component}`, true )
         xhr.send( args.data )
       }

  //...........................................................................

 return {
   data : data,
   components : components,
   get : get,
   load : load,
   apiRequest : apiRequest
 }
})()
