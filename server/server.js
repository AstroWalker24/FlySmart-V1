const express = require('express');
const cors = require('cors');
const fs=require('fs');

// creating an instance of the express application
const app = express();

// defining the port 
const port = 3000;

// Allow CORS from the specific origin
    app.use(cors({
        origin: 'http://127.0.0.1:5500' 
    }));  
    
    
// function that logs the raw request body to the console
const logRawBody = (req,res,buf,encoding)=>{

    // checking whether the buffer is null or undefined or neither and also the length of the buffer
    if(buf!=null && buf!=undefined && buf.length>0){
        // convert the buffer to string
        let bodyString = buf.toString(encoding || 'utf8') 
        fs.appendFile('log.txt',bodyString+'\n',(err)=>{
            if (err){
                console.log(`An error has been occured while Logging the raw body : ${err}`)
            }
        })
    }
}


// defining the middleware that handles the json data
app.use(express.json({
    limit:'10mb',
    type:'application/json',
    strict:true,
    verify :logRawBody
}));



// defining the home route
app.get('/', (req, res) => {
    res.send('Hello World');
    console.log('Handler function has been called');
});



// starting the server using listen function of the express 
app.listen(port, (err) => {
    if (err) {
        console.log(`An unknown error has occurred: ${err}`);
        return;
    }
    console.log(`Server is running on port ${port}`);
});
