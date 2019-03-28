
let t_response = { response : undefined }
const baseUrl =  'http://localhost:8081/api/',
data = {
  id : 0,
  name : 'test'
},
r_get = {url : `${baseUrl}players`, callback : t_res },
t_get = xhr(r_get),
r_post = {data : data,url : `${baseUrl}players`,method: 'POST',status : 201},
t_post = xhr(r_post);

//console.log(t_response)
//r_delete = {url : `${baseUrl}players`,method: 'DELETE',status : 201},
//t_delete = xhr(r_delete),
//r_update = {data : data,url : `${baseUrl}players`,method: 'PUT',status : 201},
//t_update = xhr(r_update)

function t_res( event ){
  t_response.response = event.target.responseText
  console.log(event)
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
    if(xmlhttp.readyState === 4 && xmlhttp.status === args.status) {
      if(args.callback) args.callback(event)
    }
  });
  xmlhttp.send(args.data);

}

const request = {}
const config = {
  server : 'localhost:8081',
  api : 'api'
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

//model.apiRequest( {endpoint : 'players', callback : ( event, args) => console.log( event.target.responseText ) })
