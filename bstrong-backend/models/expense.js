const mongoose = require('mongoose')

const expensesSchema = new mongoose.Schema({
    expensetype: {
        type: String,
        required: true
    },
    expensedate: {
        type: Date,
        required: true
    },
    mode: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    remarks: {
        type: String,
        required: true
    },
    files: {
        type: String,
        required: false
    },
})

const expenses = mongoose.model('expenses', expensesSchema)

module.exports = expenses