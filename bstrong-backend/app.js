require("./config/config");
const express = require('express')
// const mongoose = require('mongoose')
const db = require("./db");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const app = express()

//connection from db here
db.connect(app);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// var url = "mongodb://localhost:27017/beStrongdB";
// mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

// const con = mongoose.connection
// con.on('open', () => {
//     console.log('dB Connetced !!')
// })

// app.use((req, res, next) => {
//     req.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Origin', '*');
//     next();
// });

/** Express Framework */
app.use(express.json())

const memberRouter = require('./routes/members')
app.use('/api/members', memberRouter)

const memberRecordRouter = require('./routes/memberRecords')
app.use('/api/memberRecords', memberRecordRouter)

const expenseRouter = require('./routes/expenses')
app.use('/api/expenses', expenseRouter)

const revenueRouter = require('./routes/revenues')
app.use('/api/revenues', revenueRouter)

app.listen(9000, () => {
    console.log('Server Started !!')
})