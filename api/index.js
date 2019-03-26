
"use strict";

const api = (function(){

  const mysql = require( 'mysql' )
  const express = require( 'express' )
  const app = express()
  const bodyParser = require( 'body-parser' )

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
    }//,routes : [ 'game','game/:id','questions','questions/:id','anwsers','anwsers/:id' ]
  }
  const connection = mysql.createConnection( config.db )
  connection.connect((err) => {
    if (err) {
      throw err;
    } else {
      console.log('Connected!');
    }
  });


  // .............................................................................
  // players
  /* -----------------------------------------------------------------------------
    * players get
    */
      app.get( `/api/players/:id`, function( req, res ) {

        let id = +req.params[ 'id' ]

        connection.query(`SELECT * FROM players where id=?`, id, ( err, rows ) => {
          if (!err) {
            let record = rows[0];
            res.setHeader('Content-Type', 'application/json')
            record ? res.end(JSON.stringify( record ) ) : res.status(404).end()
          } else {
            throw err
          }
        })
      });

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

  /* -----------------------------------------------------------------------------
    * players post
    */

    app.post('/api/players', function(req, res) {

      let player = req.body;
      connection.query('INSERT INTO players SET ?', player, (err, result) => {
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

    /* -----------------------------------------------------------------------------
      * players put
    */

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





  const server = app.listen(8081, () => {
    console.log( 'Server listening on port 8081')
  })



})()
