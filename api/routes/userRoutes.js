const express = require('express');
const router = express.Router();
const { findUser, saveUser } = require('../../db/db');

router.post('/', (req,res) => {
    findUser({ 
        firstName: req.body.firstName, 
        lastName: req.body.lastName,
        email: req.body.email
    }) 
    res.status(201).json({ message: 'POST' })
});

router.get('/', (req, res) => {
    res.status(201).json({ message: 'GET' });
});

router.get('/:id', (req, res) => {
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