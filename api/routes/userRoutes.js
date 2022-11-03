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
    findUser({email: req.body.email})
    // if user not found then return 401 (not authorized) with message saying authorization failed
    .then(result => {
        if(!result){
            res.status(401).json({
                message: "That email address is not in our system! Please sign up and try again."
            });
    // else compare passwords
    // test for error in side callback function
    // test the result (true or false)
    // return message authorization successful
        } else {
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
        }
    })
});

router.get('/profile', (req, res) => {
    const email = req.params.email;

    findUser(email)
    .then(result => {
        if(result){
            res.status(200).json({
                message: "User Profile",
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
        } else {
            res.status(409).json({ message: "Please log in to view your profile." })
        }
    })
}); 

module.exports = router;