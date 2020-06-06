const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

require ('./db'); // appel database

const patientRoute = require('./controllers/patient.controller');
const userRoute = require('./controllers/user/users.controller');

app.use(bodyParser.json());
app.use(cors());

//app.use('/patient', patientRoute); //localhost:3000/patient
app.use('/users', userRoute); //localhost:3000/users

let port = process.env.NODE_ENV || 3000 ;

app.listen(port, () => {
    console.log(`server is connected on port ${port}...`);
})
