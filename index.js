const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const bodyParser = require("body-parser")
const index = express()
const url = "mongodb+srv://novaldy:yiHE5njmD0G6KswK@instances.kby02.mongodb.net/pam?retryWrites=true&w=majority"
const port = 6666
const cors = require('cors')

index.use(cors())
index.use(express.json())


mongoose.connect(url, { useNewUrlParser: true, useCreateIndex: true });
const mong = mongoose.connection
mong.once('open', () => {
    console.log('Database connection is estabilished...')
})

const adminRouter = require('./routes/admins')
index.use('/main', adminRouter);

const userRouter = require('./routes/users');
index.use('/users', userRouter);

const transactionRouter = require('./routes/transactions')
index.use('/transaction', transactionRouter)

index.listen(port, () => {
    console.log('Service started in port ' + port)
})