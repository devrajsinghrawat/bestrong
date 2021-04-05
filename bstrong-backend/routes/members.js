const express = require('express')
const router = express.Router()
const Member = require('../models/member')


router.get('/', async (req, res) => {
    try {
        const members = await Member.find()
        console.log(members[1])
        res.json(members)
    } catch (err) {
        res.send('Error' + err)
    }
    console.log('Member get request')
})

router.get('/:mobile', async (req, res) => {
    console.log('Params ', req.params.mobile)
    try {
        const member_records = await Member.find({ mobile: req.params.mobile })
        if (member_records.length == 0) {
            res.status(404).send('No member record found for given mobile number')
        } else {
            res.json(member_records[0])
        }

    } catch (err) {
        res.send('Error' + err)
    }
    console.log('MemberRecord by ID get request')
})

// Fetch recent 5 registrations
router.get('/recentFiveRegistration', async (req, res) => {
    try {
        const members = await Member.find()
        const result = members.slice(-5)
        res.json(result)
    } catch (err) {
        res.send('Error' + err)
    }
    console.log('Member get request')
})

router.post('/', async (req, res) => {
    console.log('Post Req received', req.body)
    const member = new Member({
        "name": req.body.name,
        "mobile": req.body.mobile,
        email: req.body.email,
        age: req.body.age,
        address: req.body.address,
        gender: req.body.gender,
        infosign: req.body.infosign,
        termssign: req.body.termssign,
    })

    try {
        const result = await member.save()
        res.json(result)
    } catch (err) {
        res.send('Error' + err)
    }
})

module.exports = router