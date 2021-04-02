const express = require('express')
const router = express.Router()
const ExpenseRecord = require('../models/expense')


router.get('/', async (req, res) => {
    console.log('/', req.params)
    try {
        const expense_records = await ExpenseRecord.find()
        res.json(expense_records)
    } catch (err) {
        res.send('Error' + err)
    }
    console.log('Expense get request')
})

// Fetch recent 5 registrations
router.get('/recentFiveExpenses', async (req, res) => {
    try {
        const expense_records = await ExpenseRecord.find()
        const result = expense_records.slice(-5)
        res.json(result)
    } catch (err) {
        res.send('Error' + err)
    }
    console.log('Member tx get request')
})




router.post('/', async (req, res) => {
    console.log('Expense Post Req', req.body)
    const expense_record = new ExpenseRecord({
        "expensetype": req.body.expensetype,
        "expensedate": req.body.expensedate,
        "mode": req.body.mode,
        "amount": req.body.amount,
        "remarks": req.body.remarks,
        "files": req.body.files,
    })

    try {
        const result = await expense_record.save()
        res.json(result)
    } catch (err) {
        res.send('Error' + err)
    }
})

module.exports = router