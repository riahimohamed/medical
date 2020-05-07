const mongoose = require ('mongoose');

const userSchema = new mongoose.Schema({
    fullName : {
        type: String,
        required: true
    },
    birth_day:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    role:{
        type: String,
        Default: 'ROLE_USER'
    },
    createdAt:{
        type:Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', userSchema);