const express = require('express');
const cors = require('cors');
const fs=require('fs');
const pool=require('./db')
require('dotenv').config();
const stripe=require('stripe')(process.env.STRIPE_SECRET_KEY)
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

app.post('/flights/',(req,res)=>{
    const {fromCity,toCity,DepartureDate}=req.body;
    console.log(fromCity,toCity,DepartureDate);
    res.status(200).send({message:'Form Submitted Successfully'});
})



// starting the server using listen function of the express 
app.listen(port, (err) => {
    if (err) {
        console.log(`An unknown error has occurred: ${err}`);
        return;
    }
    console.log(`Server is running on port ${port}`);
});
