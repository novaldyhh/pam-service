const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    volume: {
        type: Number,
        required: true
    },
    status: {
        type: Boolean,
        required: false
    }
}, {
    timestamps: true
});

const Transaction = mongoose.model('Transaction', transactionSchema);
module.exports = Transaction