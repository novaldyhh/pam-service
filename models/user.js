const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: false
    },
    RT: {
        type: String,
        required: true
    },
    RW: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: false
    },
    customerID: {
        type: String,
        required: false
    }

}, {
    timestamps: true
})

const User = mongoose.model('User', userSchema)
module.exports = User