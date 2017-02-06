/* eslint no-console: 0 */

const path = require('path');
const express = require('express');
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./webpack.config.js');

const isDeveloping = process.env.NODE_ENV !== 'production';
const port = isDeveloping ? 3333 : process.env.PORT;
const app = express();
const bodyParser = require('body-parser');

 /****************************************/
 /****************************************/


var pg = require('pg');
var connectionString = process.env.DATABASE_URL || 'postgres://postgres:marvin@localhost:5432/newnft6?sslmode=require&sslfactory=org.postgresql.ssl.NonValidatingFactory';
var configPostgre = {
  user: 'postgres', //env var: PGUSER
  database: 'newnft6', //env var: PGDATABASE
  password: 'marvin', //env var: PGPASSWORD
  host: 'localhost', // Server hosting the postgres database
  port: 5432, //env var: PGPORT
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
};
/*&user=postgres&password=marvin*/



/*# # # # # # # # # # # # # # # # #*/

//API SQL BEGIN

//GET BEGIN
app.get('/api/models', (req, res, next) => {

  console.log('GET GET GET'); 
  var results = [];
  // Get a Postgres client from the connection pool

    var pool = new pg.Pool(configPostgre);
    
    pool.connect(function(err, client, done) {

    // Handle connection errors
    if(err) {
                done();
                return console.error('ERROR FETCHING DAMN',err);
             }
    // SQL Query > Select Data
    var c = client.query('SELECT key,name,foto,price,param1 FROM kataloggg', (err,result) =>{
                                                                      done();
                                                                      if(err) throw err});
                                                                      
                                                                      // Stream results back one row at a time
                                                                      c.on('row', (result) => {
                                                                        results.push(result);
                                                                      });
                                                                      // After all data is returned, close connection and return results
                                                                      c.on('end', () => {
                                                                        done();
                                                                        return res.json(results);
                                                                      });



        });
        
        pool.on('error', function (err, client) {
        // if an error is encountered by a client while it sits idle in the pool
        // the pool itself will emit an error event with both the error and
        // the client which emitted the original error
        // this is a rare occurrence but can happen if there is a network partition
        // between your application and the database, the database restarts, etc.
        // and so you might want to handle it and at least log it out
        console.error('idle client error', err.message, err.stack)
                                                })
            
});
//GET END


//POST BEGIN
app.use(bodyParser.json({ type: 'application/json' }))


app.post('/api/models/', (req, res, next) => {

  console.log('POST POST POST: '+req.body.name);  
  const results = [];
  // Get a Postgres client from the connection pool
  pg.connect(connectionString, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    // SQL Query > INSERT

    const query = client.query(
      `INSERT INTO kataloggg (key,name,foto,param1,price) VALUES ('${req.body.key}',
        '${req.body.name}', '${req.body.foto}','${req.body.param1}', '${req.body.price}');`);

    // Stream results back one row at a time
    query.on('row', (row) => {
      results.push(row);
    });
    // After all data is returned, close connection and return results
    query.on('end', () => {
      done();
      return res.json(results);
    });
  });
});
//POST END

//DELETE BEGIN
app.delete('/api/models/:key', (req, res, next) => {
  const results = [];
   console.log('DELETE DELETE DELETE: '+req.params.key);  
  // Grab data from the URL parameters
  const key = req.params.key;
  // Get a Postgres client from the connection pool
  pg.connect(connectionString, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    // SQL Query > Delete Data
    client.query('DELETE FROM kataloggg WHERE key=($1)', [key]).on('end', ()=>
      {done(); return res.json({status:"success"}) });
   
  });
});
//DELETE END

//API SQL END

/*# # # # # # # # # # # # # # # # #*/

 


/****************************************/
 /****************************************/




if (isDeveloping) {
  const compiler = webpack(config);
  const middleware = webpackMiddleware(compiler, {
    publicPath: config.output.publicPath,
    contentBase: 'src',
    lazy: false,
    watchOptions: {
        aggregateTimeout: 0.001,
        poll: true },
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  });

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));
  app.get('*', function response(req, res) {
    res.write(middleware.fileSystem.readFileSync(path.join(__dirname, 'dist/index.html')));
    res.end();
  });
} else {
  app.use(express.static(__dirname + '/dist'));
  app.get('*', function response(req, res) {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
  });
}

app.listen(port, '0.0.0.0', function onStart(err) {
  if (err) {
    console.log(err);
  }
  console.info('==> 🌎 Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.', port, port);
});
