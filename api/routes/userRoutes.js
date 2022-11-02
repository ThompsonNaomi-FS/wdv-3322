const express = require('express');
const User = require('../model/user');
const { default: mongoose } = require("mongoose");
const router = express.Router();
const { findUser, saveUser } = require('../../db/db');
const bcrypt = require('bcrypt');

const user = {};

router.post('/signup', (req,res) => {
    // findUser by email address { email: email }
    findUser({email: req.body.email})
    // if user exists return 409 (conflict) with message about user existing
    .then(result => {
        if(result){
            res.status(409).json({
                message: "That email address is already in use! Please try logging in."
            });
        // else encrypt the password
        } else {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if(err){
                    res.status(500).json({ message: err.message });
                } else {
                    user.password = hash;
                    res.status(200).json({ message: `User with email of ${req.body.email} created successfully!` });
        // create a new user object with the hashed password as the new password
        // saveUser (user.save(user))
                    const newUser = new User({
                        _id: mongoose.Types.ObjectId(),
                        firstName: req.body.firstName, 
                        lastName: req.body.lastName,
                        address: req.body.address,
                        city: req.body.city,
                        state: req.body.state,
                        zip: req.body.zip,
                        email: req.body.email,
                        password: hash
                    })
                    saveUser(newUser)
                }
            });
        }
    })
});

router.post('/login', (req, res) => {
    // findUser
    // if user not found then return 401 (not authorized) with message saying authorization failed
    // else compare passwords
    // test for error in side callback function
    // test the result (true or false)
    // return message authorization successful
    // return name if you want

    bcrypt.compare(req.body.password, user.password, (err, result) => {
        if(err) return res.status(501).json({ message: err.message });
        if(result){
            res.status(200).json({ 
                message: "Authorization Successful!",
                result: result,
            });
        } else {
            res.status(401).json({ 
                message: "Authorization Failed!",
                result: result,
        });
        }
    });

    // res.status(201).json({ message: 'LOGIN' });
});

router.get('/profile', (req, res) => {
    const id = req.params.id;

    findUser(id)
    .then(result => {
        res.status(201).json({ message: 'PROFILE'});
    })
});

module.exports = router;