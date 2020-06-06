const mongoose = require ('mongoose');

const userSchema = new mongoose.Schema({
    fullName : String,
    birth_day: String,
    email: String,
    password: String,
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