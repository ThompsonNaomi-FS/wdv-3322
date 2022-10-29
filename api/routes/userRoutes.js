const express = require('express');
const router = express.Router();
const { findUser, saveUser } = require('../../db/db');

router.post('/signup', (req,res) => {
    findUser({ 
        firstName: req.body.firstName, 
        lastName: req.body.lastName,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        zip: req.body.zip,
        email: req.body.email,
        password: req.body.password
    }) 
    res.status(201).json({ message: 'POST' })
});

router.post('/login', (req, res) => {

});

router.get('/', (req, res) => {
    res.status(201).json({ message: 'GET' });
});

router.get('/profile/:id', (req, res) => {
    const id = req.params.id;
    res.status(201).json({ message: 'GET by Id', id:id });
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