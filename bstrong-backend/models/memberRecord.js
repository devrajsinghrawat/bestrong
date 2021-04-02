const mongoose = require('mongoose')

const memberRecordSchema = new mongoose.Schema({
    txtype: {
        type: String,
        required: true
    },
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
    plan: {
        type: String,
        required: true
    },
    txdate: {
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

const memberRecord = mongoose.model('memberRecord', memberRecordSchema)

module.exports = memberRecord