const express = require('express');
const { default: mongoose } = require("mongoose");
const router = express.Router();
const { findUser, saveUser } = require('../../db/db');

router.post('/signup', (req,res) => {
    saveUser({ 
        _id: mongoose.Types.ObjectId(),
        firstName: req.body.firstName, 
        lastName: req.body.lastName,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        zip: req.body.zip,
        email: req.body.email,
        password: req.body.password
    })
    .then(result => {
        res.status(200).json({
            message: "User Saved",
            user: {
                "ID": result._id,
                "First Name": result.firstName,
                "Last Name": result.lastName,
                "Address": result.address,
                "City": result.city,
                "State": result.state,
                "Zip": result.zip,
                "Email": result.email,
                "Password": result.password
            }
        })
    })
});

router.post('/login', (req, res) => {
    res.status(201).json({ message: 'LOGIN' });
});

router.get('/', (req, res) => {
    res.status(201).json({ message: 'GET' });
});

router.get('/profile/:id', (req, res) => {
    const id = req.params.id;

    findUser(id)
    .then(result => {
        res.status(201).json({ message: 'GET by Id', id:id });
        console.log(result);
    })
});

router.patch('/:id', (req, res) => {
    const id = req.params.id;
    res.status(201).json({ message: 'PATCH by Id', id:id });
});

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    res.status(201).json({ message: 'DELETE by Id', id:id });
});

module.exports = router;