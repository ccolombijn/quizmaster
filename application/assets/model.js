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

         if( !args.type ) args[ 'type' ] = 'GET'
         if( !args.status ) args[ 'status' ] = 200
         if( !args.server ) args[ 'server' ] = 'http://localhost:8081'
         if( !args.api ) args[ 'api'] = 'api'
         if( args.data ) args.data = JSON.stringify( args.data );
         /*
         const xmlhttp = new XMLHttpRequest();
         xmlhttp.open( args.method, `${args.server}/${args.api}/${args.endpoint}`, true);
         xmlhttp.setRequestHeader( 'Content-Type', 'application/json' );
         xmlhttp.onreadystatechange = function(event){
           if(xmlhttp.readyState === 4 && xmlhttp.status === args.status) {
            switch (args.method) {
              case 'GET':
                data[args.endpoint] = JSON.parse(event.target)
                break;
              default:

              }
            }

           if( args.callback ) args.callback( event, args )
         }
         xmlhttp.send( args.data );
         */
         if(typeof args === 'string') args = { url : args }
         const xmlhttp = new XMLHttpRequest();
         if( !args.method ) args[ 'method' ] = 'GET'
         if( !args.status ) args[ 'status' ] = 200
         xmlhttp.open( args.method, args.url, true );
         xmlhttp.setRequestHeader("Content-Type", "application/json");
         if(args.data) args.data = JSON.stringify(args.data)
         xmlhttp.addEventListener( 'load',  ( event ) => {
         //xmlhttp.onreadystatechange = function(event){
           if(xmlhttp.readyState === 4 && xmlhttp.status === args.status) {
             console.log(event.target.responseText);
           }
         });
         xmlhttp.send(args.data);
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
