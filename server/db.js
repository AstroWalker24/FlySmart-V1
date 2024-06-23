const Pool = require('pg').Pool;

// establishing the database connection


// defining the parameters for the database connection 
const pool=new Pool({
    db:'AirWaysV1',
    user:'postgres',
    password:'$nadeem03',
    host:'localhost',
    port:5432
})

module.exports=pool;