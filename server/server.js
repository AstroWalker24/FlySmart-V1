const express = require('express');

// a package for handling the cross-origin resource sharing
const cors = require('cors');

// a package for handling the file system
const fs = require('fs');

// a package for handling the pool of connections and database 
const pool = require('./db');

// a package for handling the environment variables
require('dotenv').config();

// a package for handling the stripe payment gateway
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

// a package for handling the body of the request
const bodyParser = require('body-parser');


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
    limit: '10mb',
    type: 'application/json',
    strict: true,
}));



// defining the home route
app.get('/', (req, res) => {
    res.send('<h1>Server is running on port 3000, please call this API for data</h1>');
});


// defining the route for filtering the flights based on the airlines
app.get('/filter/', async (req, res) => {
    const { airlines } = req.query;
    console.log("Connected to the server")

    let query = `
    SELECT flights.*, 
           src_airport.name as source_airport_name, 
           dest_airport.name as dest_airport_name, 
           airlines.airlinename as airline_name
    FROM flights
    JOIN airlines ON flights.airline_id = airlines.airlineid
    JOIN airports AS src_airport ON flights.source_airport_id = src_airport.airport_id
    JOIN airports AS dest_airport ON flights.destination_airport_id = dest_airport.airport_id
    `;
    let queryParams = [];

    if (airlines) {
        const airlineList = airlines.split(',');
        const placeholders = airlineList.map((_, i) => `$${i + 1}`).join(',');
        query += ` WHERE airlines.airlinename IN (${placeholders})`;
        queryParams = airlineList;
    }

    try {
        const result = await pool.query(query, queryParams);
        res.json(result.rows);
        console.log(result);
    } catch (error) {
        console.error('Error fetching filtered flights:', error);
        res.status(500).send('Server error');
    }
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
    const { fromCity, toCity, DepartureDate, ReturnDate } = req.body;
    console.log(fromCity, toCity, DepartureDate, ReturnDate);

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


// defining the route for user registration 
app.post('/userRegister/', async (req, res) => {
    try {

        // fetching the form data from the request body
        const {
            additionalMobileNumber, city, classType, country, dob, email, firstName, gender, lastName, mobileNumber, state, street, zipCode
        } = req.body;


        // generating a random string user id for the user 
        const userId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

        // generating a random amount from 50000 to 100000 for the payment and store in the users database 
        const amount = Math.floor(Math.random() * 50000) + 50000;



        // write a query for inserting the user data into the database and retreving the balance amount from the database 
        const userQuery = `
    INSERT INTO user_airways (
        usercontact2, usercity, preferred_class, usercountry, dob, useremail, userfirstname, usergender, userlastname, usercontact,userstate, userstreet, userpincode,user_id,balance
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13,$14,$15) RETURNING balance
     ;
`;
        // defining the parameters for the query
        const userParams = [
            additionalMobileNumber, city, classType, country, dob, email, firstName, gender, lastName, mobileNumber, state, street, zipCode, userId,amount
        ]

        // executing the query and returning the balance amount 
        const balance_amount = pool.query(userQuery, userParams, (err, result) => {

            if (err) {

                // if error occurs in the query execution then send the error message to the client along with the status code 500
                console.error('Error executing query', err);
                res.status(500).send({ error: 'Database query error' });
            } else {

                // if the query exection is successful then send the success message to the client along with status code 200 and also send the balance amount to the client
                console.log("Successful Insertion of the data");
                res.status(200).json({ message: 'User registered successfully', balance: result.rows[0].balance });
            }
        });

    }

    catch (err) {
        // if any error occurs in the try block then send the error message to the client along with the status code 500
        console.error('Error in the user registration:', err);
        res.status(500).send('Server error');
    }
})




// defining the route for passengers
app.post('/Passengers/', async (req, res) => {
    try {

        // fetching the form data from the request body
        const {
            additionalMobileNumber, city, classType, country, dob, email, firstName, gender, lastName, mobileNumber, state, street, zipCode
        } = req.body;

        // geenerating a random string user id for the user
        userId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        // generating a random amount from 50000 to 100000 for the payment and store in the users database 
        const amount = Math.floor(Math.random() * 50000) + 50000;

        // write a query for inserting the user data into the database and retreving the amount balance from the database based on the user id

        const userQuery = `
    INSERT INTO user_airways (
        usercontact2, usercity, preferred_class, usercountry, dob, useremail, userfirstname, usergender, userlastname, usercontact,userstate, userstreet, userpincode,user_id
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13,$14,$15 ) RETURNING amount
     ;
`;

        // defining the parameters for the query
        const userParams = [
            additionalMobileNumber, city, classType, country, dob, email, firstName, gender, lastName, mobileNumber, state, street, zipCode, userId, amount
        ]

        // executing the query and returning the balance amount
        const queryReturnsAmount = pool.query(userQuery, userParams, (err, result) => {


            if (err) {
                console.error('Error executing query', err);
                res.status(500).send({ error: 'Database query error while querying' });
            } else {
                console.log("Successfull insertion of the data");
                res.status(200).json({ message: 'Submitted succesfully', amount: queryReturnsAmount.rows[0].balance});
            }
        });

    }

    catch (err) {
        console.error('Error in the user registration:', err);
        res.status(500).send('Server error');
    }




})





// starting the server using listen function of the express 
app.listen(port, (err) => {
    if (err) {
        console.log(`An unknown error has occurred: ${err}`);
        return;
    }
    console.log(`Server is running on port ${port}`);
});
