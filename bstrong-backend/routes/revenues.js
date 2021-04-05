const express = require('express')
const router = express.Router()
const MemberRecord = require('../models/memberRecord')
const ExpenseRecord = require('../models/expense')

var revenuePayload = {
    "netRevenue": '',                          // Sum of all member records till date
    "netCashRevenue": '',
    "netBankRevenue": '',
    "netExpense": '',                          // Sum of all Expense records till date
    "netExpense": '',
    "netCashExpense": '',
    "netPending": '',                          // Sum of all Pending records till date
    "netCompanyBalance": '',                   // Net Revenue - Net Expense
    "netCashBalance": '',                      // Net Cash Revenue - Net Cash Expense
    "netBankBalance": '',                      // Net Online Revenue - Net Online Expense
    "monthlyData": [{                          // Month wise data
        "month": '',
        "revenue": '',
        "expense": '',
        "pl": '',
        "registration": '',
        "renewal": ''
    }]
}

router.get('/', async (req, res) => {
    // console.log('/api/revenues', req)
    try {
        // Fetch revenue and expense records (should be fetched year wise)
        const revenue_records = await MemberRecord.find()
        const expense_records = await ExpenseRecord.find()
        let netRevenue = 0
        let netExpense = 0
        let netPending = 0
        let netCashRevenue = 0
        let netBankRevenue = 0
        let netCashExpense = 0
        let netBankExpense = 0

        let monthlyData = [{
            "SNo": 0,                        // Month wise data
            "month": 'JAN',
            "revenue": 0,
            "expense": 0,
            "pl": 0,
            "registration": 0,
            "renewal": 0
        }, {
            "SNo": 1,                        // Month wise data
            "month": 'FEB',
            "revenue": 0,
            "expense": 0,
            "pl": 0,
            "registration": 0,
            "renewal": 0
        }, {
            "SNo": 3,                        // Month wise data
            "month": 'MAR',
            "revenue": 0,
            "expense": 0,
            "pl": 0,
            "registration": 0,
            "renewal": 0
        }, {
            "SNo": 4,                        // Month wise data
            "month": 'APR',
            "revenue": 0,
            "expense": 0,
            "pl": 0,
            "registration": 0,
            "renewal": 0
        }, {
            "SNo": 5,                        // Month wise data
            "month": 'MAY',
            "revenue": 0,
            "expense": 0,
            "pl": 0,
            "registration": 0,
            "renewal": 0
        }, {
            "SNo": 6,                        // Month wise data
            "month": 'JUN',
            "revenue": 0,
            "expense": 0,
            "pl": 0,
            "registration": 0,
            "renewal": 0
        }, {
            "SNo": 7,                        // Month wise data
            "month": 'JUL',
            "revenue": 0,
            "expense": 0,
            "pl": 0,
            "registration": 0,
            "renewal": 0
        }, {
            "SNo": 8,                        // Month wise data
            "month": 'AUG',
            "revenue": 0,
            "expense": 0,
            "pl": 0,
            "registration": 0,
            "renewal": 0
        }, {
            "SNo": 9,                        // Month wise data
            "month": 'SEP',
            "revenue": 0,
            "expense": 0,
            "pl": 0,
            "registration": 0,
            "renewal": 0
        }, {
            "SNo": 10,                        // Month wise data
            "month": 'OCT',
            "revenue": 0,
            "expense": 0,
            "pl": 0,
            "registration": 0,
            "renewal": 0
        }, {
            "SNo": 11,                        // Month wise data
            "month": 'NOV',
            "revenue": 0,
            "expense": 0,
            "pl": 0,
            "registration": 0,
            "renewal": 0
        }, {
            "SNo": 12,                        // Month wise data
            "month": 'DEC',
            "revenue": 0,
            "expense": 0,
            "pl": 0,
            "registration": 0,
            "renewal": 0
        }]

        // console.log("Revenue Records --> ", revenue_records)
        // console.log("Expense Records --> ", expense_records)

        // Process revenue records
        revenue_records.forEach(record => {
            // console.log("Loop Revenue Records --> ", record)

            netRevenue += record.amount;
            netPending += record.balance;

            if (record.mode == 'Cash') {
                netCashRevenue += record.amount
            } else {
                netBankRevenue += record.amount
            }
            // Check the month of Records
            var date = new Date(record.txdate);
            var month = date.getMonth();
            console.log('record.txdate', record.txdate)
            console.log('Month', month)
            monthlyData[month].revenue += record.amount;
            console.log('monthlyData[month]', monthlyData[month])

            monthlyData[month].pl += monthlyData[month].revenue

            // Count number of registration for fetched month
            record.txtype == "REGISTRATION" ?
                monthlyData[month].registration += 1 :
                monthlyData[month].renewal += 1
        });

        expense_records.forEach(record => {
            console.log("Loop Expense Records --> ", record)

            netExpense += record.amount;

            if (record.mode == 'Cash') {
                netCashExpense += record.amount
            } else {
                netBankExpense += record.amount
            }
            // Check the month of Records
            var date = new Date(record.txdate);
            var month = date.getMonth();
            console.log("monthlyData[month].revenue", monthlyData[month].revenue)
            console.log("record.amount", record.amount)

            monthlyData[month].expense += record.amount;
            monthlyData[month].pl -= record.amount;
        });

        revenuePayload.netRevenue = netRevenue;
        revenuePayload.netCashRevenue = netCashRevenue;
        revenuePayload.netBankRevenue = netBankRevenue;

        revenuePayload.netExpense = netExpense;
        revenuePayload.netCashExpense = netCashExpense;
        revenuePayload.netBankExpense = netBankExpense;

        revenuePayload.netPending = netPending;
        revenuePayload.netBankBalance = netBankRevenue - netBankExpense;
        revenuePayload.netCashBalance = netCashRevenue - netCashExpense;
        revenuePayload.netCompanyBalance = netRevenue - netExpense;
        revenuePayload.monthlyData = monthlyData
        res.json(revenuePayload)
    } catch (err) {
        res.send('Error -->' + err)
    }
    console.log('Revenue get request')
})

module.exports = router