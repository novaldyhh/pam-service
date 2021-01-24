const express = require("express");
const router = express.Router();
const User = require('../models/user')
const authentication = require('../helper/jwt-handler');

router.get('/retrieve', authentication, (req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
})

router.get('/retrieve/:id', authentication, (req, res) => {
    User.findById(req.params.id)
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.post('/add', authentication, (req, res) => {
    const name = req.body.name;
    const address = req.body.address;
    const RT = req.body.RT;
    const RW = req.body.RW;
    const phone = req.body.phone;
    const customerID = req.body.customerID;
    const newUser = new User({
        name: name,
        address: address,
        RT: RT,
        RW: RW,
        phone: phone,
        customerID: customerID
    })

    newUser.save()
        .then(() => res.json('User succesfully added!'))
        .catch(err => res.status(400).json('Error ' + err))
})

router.delete('/delete/:id', authentication, (req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.post('/edit/:id', authentication, (req, res) => {
    User.findById(req.params.id)
        .then(users => {
            users.name = req.body.name;
            users.address = req.body.address;
            users.RT = req.body.RT;
            users.RW = req.body.RW;
            users.phone = req.body.phone;
            users.customerID = req.body.customerID;

            users.save()
                .then(() => res.json('User updated...'))
                .catch(err => res.status(400).json('Error: ' + err))
        })
        .catch(err => res.status(400).json('Error: ' + err))
})

module.exports = router