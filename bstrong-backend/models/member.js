const mongoose = require('mongoose')

const memberSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    mobile: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: false
    },
    address: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    plan: {
        type: String,
        required: true
    },
    doj: {
        type: Date,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    balance: {
        type: Number,
        default: 0,
        required: false
    },
    files: {
        type: String,
        required: false
    },
    remarks: {
        type: String,
        required: false
    },
})

const member = mongoose.model('member', memberSchema)

module.exports = member