
"use strict";

const api = (function(){

  const mysql = require( 'mysql' )
  const express = require( 'express' )
  const app = express()
  const bodyParser = require( 'body-parser' )
  const _ = require( 'lodash' )

  app.use( bodyParser.json() )
  app.use( function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Methods", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
  })
  // config
  const config = {
    db : {
      host: 'localhost',
      user: 'root',
      password: 'root',
      database: 'quiz'
    },routes : [

      { route : 'players' }, //setApi.getAll
      { route : 'players/:id' }, // setApi.getOne
      { route : 'players/:id', method : 'delete' }, // setApi.delete
      { route : 'players', method : 'post' }, // setApi.post
      { route : 'players', method : 'put' }


      //'players', 'players/:id', 'game','game/:id','questions','questions/:id','anwsers','anwsers/:id'
    ]
  }
  const connection = mysql.createConnection( config.db )
  connection.connect((err) => {
    if (err) {
      throw err;
    } else {
      console.log('Connected!');
    }
  });


  const setApi= ( args ) => {
// .............................................................................
    const getOne = ( route ) => {
      app.get( `/api/${route}`, function( req, res ) {

        let id = +req.params[ 'id' ]

        connection.query(`SELECT * FROM ${route.split('/')[0]} where id=?`, id, ( err, rows ) => {
          if (!err) {
            let record = rows[0];
            res.setHeader('Content-Type', 'application/json')
            record ? res.end(JSON.stringify( record ) ) : res.status(404).end()
          } else {
            throw err
          }
        })
      });


    }

    const getAll = ( route ) => {
      app.get(`/api/players`, function(req, res) {

        res.setHeader('Content-Type', 'application/json')

        connection.query(`SELECT * FROM players`, ( err, records ) => {
          if (!err) {
            res.end( JSON.stringify(records) )
          } else {
            throw err
          }
        })
      });
    }

  const _get = ( route ) => route.contains( ':' ) ? getOne( route ) : getAll( route )



// .............................................................................
  const _put = (route) => {
    app.put('/api/players/:id', function(req, res) {

          // First read id from params
          let id = +req.params.id
          let body = req.body;


          connection.query(
            'UPDATE players SET score=? Where id = ?',
            [body.anwser, id],
            (err, result) => {
              if (!err) {
                console.log(`Changed ${result.changedRows} row(s)`);

                // end of the update => send response
                // execute a query to find the result of the update
                connection.query('SELECT * FROM players where id=?', [id], (err, rows) => {
                  if (!err) {
                    console.log('Data received from Db:\n');

                    let user = rows[0];

                    console.log(user);
                    if (user) {
                      res.setHeader('Content-Type', 'application/json')
                      res.end(JSON.stringify(user));
                    } else {
                      res.setHeader('Content-Type', 'application/json')
                      console.log("Not found!!!");
                      res.status(404).end(); // rloman send 404???
                    }
                  } else {
                    throw err;
                  }
                });
              }
              else {
                throw err;
              }
        });
      });


  }
// .............................................................................
  const _post = (route) => {
    app.post(`/api/${route}`, function(req, res) {

      let player = req.body;
      connection.query(`INSERT INTO ${route} SET ?`, player, (err, result) => {
        if (!err) {
          res.setHeader('Content-Type', 'application/json')
          connection.query('SELECT * FROM players where id=?', result.insertId, (err, rows) => {
            if (!err) {
              let player = rows[0];
              if (player) {
                res.setHeader('Content-Type', 'application/json')
                res.status(201).end(JSON.stringify(player));
              } else {
                res.setHeader('Content-Type', 'application/json')
                res.status(404).end();
              }
            } else {
              throw err;
            }
          });
        } else {
          throw err;
        }
      });
    });

  }
  // .............................................................................
  const _delete = (route) => {
    app.delete('/api/players/:id', function( req, res ) {
      let id =+req.params.id;

      connection.query( `DELETE FROM players WHERE id = ?`, [id], ( err, result ) => {
        if (!err) {
          res.status(204).end();
        } else {
            throw err;
        }
      })
    });
  }

    return {
      get : _get,
      put : _put,
      post : _post,
      delete : _delete
    }
  }







  const api = getApi
  for( let item of config.routes ){
    if( item.route.contains(':/id' ) && item.method ){ //delete
      api.delete( item.route )

    }else if (item.route.contains( ':/id')) { // getOne
      api.get( item.route )

    }else if (item.method && item.fields ) { // put
      api.put( item.route, item.fields )

    }else if (item.method  ) { // post
      api.post( item.route )

    }else { // getAll
      api.get( item.route )

    }
  }


  const server = app.listen(8081, () => {
    console.log( 'Server listening on port 8081')
  })



})()
