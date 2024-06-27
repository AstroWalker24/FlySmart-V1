const { Client } = require('pg')
const client = new Client({
  user: 'postgres',

  host: 'localhost',
  database: 'AirWaysV1',
  password: '$nadeem03',
  port: 5432,
})
client.connect(function(err) {
  if (err) throw err;
  console.log("Successfully connected to the database.");
});

module.exports = client;