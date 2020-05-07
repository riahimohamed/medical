const mongoose = require ('mongoose');

const patientSchema = new mongoose.Schema({
    numfich:{
        type: String,
        required: true
    },
    firstName : {
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    createdAt:{
        type:Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Patient', patientSchema);