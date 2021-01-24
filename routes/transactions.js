const router = require('express').Router()
const Transactions = require('../models/transaction');
const authentication = require('../helper/jwt-handler');

router.get('/retrieve', authentication, (req, res) => {
    Transactions.find()
        .then(transactions => res.json(transactions))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.get('/retrieve/:id', authentication, (req, res) => {
    Transactions.findById(req.params.id)
        .then(transactions => res.json(transactions))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.post('/add', authentication, (req, res) => {
    const user = req.body.user;
    const date = Date.parse(req.body.date);
    const amount = req.body.amount;
    const volume = req.body.volume;
    const status = req.body.status;

    const newTransaction = new Transactions({
        user: user,
        date: date,
        amount: amount,
        volume: volume,
        status: status
    })
    newTransaction.save()
        .then(() => res.json('Transaction created...'))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.delete('/delete/:id', authentication, (req, res) => {
    Transactions.findByIdAndDelete(req.params.id)
        .then(transactions => res.json(transactions))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.post('/edit/:id', authentication, (req, res) => {
    Transactions.findById(req.params.id)
        .then(transactions => {
            transactions.user = req.body.user;
            transactions.date = Date.parse(req.body.date);
            transactions.amount = Number(req.body.amount);
            transactions.volume = Number(req.body.volume);
            transactions.status = req.body.status;

            transactions.save()
                .then(() => res.json('Transaction updated...'))
                .catch(err => res.status(400).json('Error: ' + err))
        })
        .catch(err => res.status(400).json('Error: ' + err))
})

module.exports = router
