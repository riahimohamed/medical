const mongoose=require ("mongoose");
const dotenv = require('dotenv').config();

//const baseUrl = 'mongodb://localhost:27018/medical';

mongoose.connect('mongodb://localhost:27018/medical',
            { useNewUrlParser: true,useUnifiedTopology: true }, 
            () => console.log("mongodb is connected  ...") );
