
function apiRequest0( args){
  const xhr = new XMLHttpRequest()
  if( !args.type ) args[ 'type' ] = 'GET'
  if( !args.status ) args[ 'status' ] = 200

  xhr.addEventListener( 'load',  ( event ) => {
    if ( xhr.readyState === 4 && xhr.status === args.status ) {
      if(args.type === 'GET') data[args.endpoint] = JSON.parse(event.target.responseText)
      if(args.callback) args.callback( event, args )
    }
  })
  // xhr.open( args.type, `http://${application.apiBasePath()}${args.component}`, true )
  // console.log(application.apiBasePath())
  //xhr.open( args.type, `http://${args.api}/${args.endpoint}`, true )
  xhr.open( args.type, `http://localhost:8081/api/${args.endpoint}`, true )
  if(args.data){
    args.data = JSON.stringify(args.data)
    console.log( args.data)
    xhr.send( args.data )
  }
}


function apiRequest1( args ){
  const xhr = new XMLHttpRequest()
  if( !args.method ) args[ 'type' ] = 'GET'
  if( !args.status ) args[ 'status' ] = 200
  xhr.open(args.type, `http://localhost:8081/api/${args.endpoint}`);
  if( args.method === 'POST' ) xhr.setRequestHeader("Content-Type", "application/json");
  /*xhr.onreadystatechange = function( event ){
    if(xhr.readyState === 4 && xhr.status === args.status) {
      if(args.method === 'GET') data[args.endpoint] = JSON.parse(xhr.responseText)
    }
    if(args.callback) args.callback( event )
  }*/
  xhr.send( args.data )
}


args = {}

let data = {
  id : 0,
  name : 'test'
}


function xhr( args ){
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
  }
  xmlhttp.send(args.data);

}
xhr({
  data : data,
  url : 'http://localhost:8081/api/players',
  method: 'POST',
  status : 201
})


//model.apiRequest( {endpoint : 'players', callback : ( event, args) => console.log( event.target.responseText ) })
