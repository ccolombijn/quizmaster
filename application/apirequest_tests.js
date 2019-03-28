
function xhr( args ){
  if(typeof args === 'string') args = { url : args }
  const xmlhttp = new XMLHttpRequest();
  if( !args.method ) args[ 'method' ] = 'GET'
  if( !args.status ) args[ 'status' ] = 200
  xmlhttp.open( args.method, args.url, true );
  xmlhttp.setRequestHeader("Content-Type", "application/json");
  if(args.data) args.data = JSON.stringify(args.data)
  xmlhttp.addEventListener( 'load',  ( event ) => {
    if(xmlhttp.readyState === 4 && xmlhttp.status === args.status) {
      if(args.callback) args.callback(event)
    }
  });
  xmlhttp.send(args.data);

}

const request = {}
const config = {
  server : 'localhost:8081',
  api : 'api',
  routes : [
    {
      endpoint : 'players',
      key : 'id',
      methods : [ 'post','get','put','delete' ],
      fields : [ 'name','score' ]
    }
  ]
}

const apiRoutes = ( config ) => {
  const url = `http://${config.server}/${config.api}/`
  for( let item of config.routes) {
    request[item.endpoint] = {}
    let args
    for(let method of item.methods){
      switch(method){
        case 'post' :
          // request.players.post(args)
          request[item.endpoint][method] = (args)=> {
            args = { url : `${url}${item.endpoint}`, data : args.data,method: 'POST',status : 201, callback : args.callback}

            xhr(args)
          }
          break;
        case 'get' :
          request[item.endpoint][method] = (args)=> {
            args = { url : `${url}${item.endpoint}/${args.id}`, callback : args.callback}

            xhr(args)
          }
          break;

      }
    }
  }
}

apiRoutes( config )
request.players.get({id : 1,callback : (event) => {
  console.log(event.target.responseText)
}})

//model.apiRequest( {endpoint : 'players', callback : ( event, args) => console.log( event.target.responseText ) })
