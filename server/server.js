const express = require('express');

// a package for handling the cross-origin resource sharing
const cors = require('cors');

// a package for handling the file system
const fs=require('fs');

// a package for handling the pool of connections and database 
const pool=require('./db');

// a package for handling the environment variables
require('dotenv').config();

// a package for handling the stripe payment gateway
const stripe=require('stripe')(process.env.STRIPE_SECRET_KEY)

// a package for handling the body of the request
const bodyParser=require('body-parser');


// creating an instance of the express application
const app = express();

// defining the port 
const port = 3000;

// Allow CORS from the specific origin
    app.use(cors({
        origin: 'http://localhost:3001' 
    }));  
    



// defining the middleware that handles the json data
app.use(express.json({
    limit:'10mb',
    type:'application/json',
    strict:true,
}));



// defining the home route
app.get('/', (req, res) => {
    res.send('Hello World');
});

const query = `
        SELECT 
            flights.flight_number,
            airlines.airlinename,
            flights.departure_time,
            flights.journey_start_date,
            flights.journey_end_date,
            source_airport.airport AS source_airport_name,
            destination_airport.airport AS destination_airport_name
        FROM 
            flights 
        INNER JOIN 
            airlines ON flights.airline_id = airlines.airlineid 
        INNER JOIN 
            airports AS source_airport ON flights.source_airport_id = source_airport.airport_id 
        INNER JOIN 
            airports AS destination_airport ON flights.destination_airport_id = destination_airport.airport_id
        WHERE 
            source_airport.name = $1 
            AND destination_airport.name = $2 
            AND flights.journey_start_date = $3
            AND flights.journey_end_date = $4
    `;

app.post('/flights/', (req, res) => {
    const { fromCity, toCity, DepartureDate,ReturnDate } = req.body;
    console.log(fromCity, toCity, DepartureDate,ReturnDate);

    // querying the database for the available flights on that particular date and from that particular city and to that particular city 
    pool.query(query, [fromCity, toCity, DepartureDate, ReturnDate], (err, result) => {
        
        if (err) {
            console.error('Error executing query', err);
            res.status(500).send({ error: 'Database query error' });
        } else {
            console.log("Successfull Fetch of the data");
            console.log(result);
            res.status(200).json(result.rows);          
        }
    });
});




// starting the server using listen function of the express 
app.listen(port, (err) => {
    if (err) {
        console.log(`An unknown error has occurred: ${err}`);
        return;
    }
    console.log(`Server is running on port ${port}`);
});
