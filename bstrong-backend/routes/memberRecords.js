const express = require('express')
const router = express.Router()
const MemberRecord = require('../models/memberRecord')


router.get('/', async (req, res) => {
    console.log('/', req.params)
    try {
        const member_records = await MemberRecord.find()
        res.json(member_records)
    } catch (err) {
        res.send('Error' + err)
    }
    console.log('Member get request')
})

// Fetch recent 5 tx
router.get('/recentFiveMemberTx', async (req, res) => {
    try {
        const member_records = await MemberRecord.find()
        const result = member_records.slice(-5)
        res.json(result)
    } catch (err) {
        res.send('Error' + err)
    }
    console.log('Member tx get request')
})

router.post('/', async (req, res) => {
    console.log('Post Req received', req.body)
    const member_record = new MemberRecord({
        "txtype": req.body.txtype,
        "name": req.body.name,
        "mobile": req.body.mobile,
        "email": req.body.email,
        "plan": req.body.plan,
        "txdate": req.body.txdate,
        "amount": req.body.amount,
        "balance": req.body.balance,
        "files": req.body.files,
        "remarks": req.body.remarks,
    })

    try {
        const result = await member_record.save()
        res.json(result)
    } catch (err) {
        res.send('Error' + err)
    }
})

module.exports = router