const pg      = require('pg'); // because our production server is not able to install native module for PG
const globalConfig = require('../config.js');
const config = globalConfig.db;
const pool = new pg.Pool(config);


pool.connect(function(err, client, done) {
  if(err) {
    return console.error('error fetching client from pool', err);
  }
  client.query('SELECT $1::int AS number', ['1'], function(err, result) {
    //call `done(err)` to release the client back to the pool (or destroy it if there is an error)
    done(err);
    if(err) {
      return console.error('error running query', err);
    }
    console.log("Db Connection ready "+result.rows[0].number);
  });
});

pool.on('error', function (err, client) {
  console.error(err.message, err.stack)
});
module.exports = pool;
