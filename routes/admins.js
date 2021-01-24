const router = require('express').Router()
const bcrypt = require('bcryptjs');
const Admin = require('../models/admin');
const { adminValidation } = require('../helper/validation');
const jwt = require('jsonwebtoken');
const authentication = require('../helper/jwt-handler');
const key = 'tbgfdyixldpxseciqiieehadomwzxugrfekbmpuscldmkzdnyvzdaxosdydjioflojygamkjvyytqreqekieaikdwqcgcamovlzctmnbwxcruergmjionlpgalpvguteguirvpoyvfimujqcfvgzxjboietvvv'

router.get('/retrieve', authentication, (req, res) => {
    Admin.find()
        .then(admins => res.json(admins))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.get('/retrieve/:id', authentication, (req, res) => {
    Admin.findById(req.params.id)
        .then(admins => res.json(admins))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.post('/add', async (req, res) => {
    const verifyUsername = await Admin.findOne({ username: req.body.username });
    if (verifyUsername) return res.status(400).send('Choose different username...')

    const { error } = adminValidation(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(req.body.password, salt)

    const newAdmin = new Admin({
        username: req.body.username,
        password: hashPassword,
        role: req.body.role,
    });
    newAdmin.save()
        .then(() => res.json('Admin created...'))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.delete('/delete/:id', authentication, (req, res) => {
    Admin.findByIdAndDelete(req.params.id)
        .then(admins => res.json(admins))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.post('/edit/:id', authentication, (req, res) => {
    Admin.findById(req.params.id)
        .then(admins => {
            admins.username = req.body.username;
            admins.password = req.body.password;
            admins.role = req.body.role;

            admins.save()
                .then(() => res.json('Admin updated...'))
                .catch(err => res.status(400).json('Error: ' + err))
        })
        .catch(err => res.status(400).json('Error: ' + err))
})

router.post('/login', async (req, res) => {
    const username = await Admin.findOne({ username: req.body.username });
    if (!username) return res.status(400).send('False login...');

    const checkPassword = await bcrypt.compare(req.body.password, username.password);
    if (!checkPassword) return res.status(400).send('False login...')

    const token = jwt.sign({ _id: username.id }, key)
    res.header('Barrier-Token', token).send(token)

    res.send('Logged in...')
})

module.exports = router
