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
        required: false
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
})

const member = mongoose.model('member', memberSchema)

module.exports = member