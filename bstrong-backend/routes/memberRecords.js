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

router.get('/:mobile', async (req, res) => {
    console.log('Params ', req.params.mobile)
    try {
        // console.log('Params ', req.params)
        const member_records = await MemberRecord.find({ mobile: req.params.mobile })
        // const req_records = await member_records.map((c) => {
        //     return c.mobile === parseInt(req.params.mobile) ? c : ''
        // })
        if (member_records.length == 0) {
            res.status(404).send('No member record found for given mobile number')
        } else {
            res.json(member_records)
        }

    } catch (err) {
        res.send('Error' + err)
    }
    console.log('MemberRecord by ID get request')
})

router.post('/', async (req, res) => {
    console.log('Post Req received', req.body)
    const member_record = new MemberRecord({
        "txtype": req.body.txtype,
        "name": req.body.name,
        "mobile": req.body.mobile,
        "email": req.body.email,
        "plan": req.body.plan,
        "doj": req.body.doj,
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