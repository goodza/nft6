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


 /****************************************/
 /****************************************/


var pg = require('pg');
var connectionString = process.env.DATABASE_URL || 'postgres://postgres:marvin@localhost:5432/newnft6?sslmode=require&sslfactory=org.postgresql.ssl.NonValidatingFactory';
/*&user=postgres&password=marvin*/

pg.connect(connectionString , function(err, client) {
  if (err) throw err;
  console.log('Connected to postgres! Getting schemas...');

  client
    .query('SELECT name, param1 FROM kataloggg')
    .on('row', function(row) {
      console.log(JSON.stringify(row));
    });
});






/*# # # # # # # # # # # # # # # # #*/

//API SQL BEGIN

//GET BEGIN
app.get('/api/models', (req, res, next) => {

  console.log('GET GET GET')  
  const results = [];
  // Get a Postgres client from the connection pool
  pg.connect(connectionString, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    // SQL Query > Select Data
    const query = client.query('SELECT key,name,foto,price,param1 FROM kataloggg');
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
//GET END

//POST BEGIN
app.post('/api/models/:key/:name/:param1', (req, res, next) => {

  console.log('POST POST POST'+req.params.name);  
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
      `INSERT INTO kataloggg (key,name,param1) VALUES (${req.params.key},
        '${req.params.name}',
        '${req.params.param1}');`);

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
   console.log('DELETE DELETE DELETE');  
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
    client.query('DELETE FROM kataloggg WHERE key=($1)', [key]);
    // SQL Query > Select Data

    const query = client.query('SELECT key FROM kataloggg');

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
