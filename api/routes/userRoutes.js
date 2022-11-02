const express = require('express');
const { default: mongoose } = require("mongoose");
const router = express.Router();
const { findUser, saveUser } = require('../../db/db');
const bcrypt = require('bcrypt');

const user = {};

router.post('/signup', (req,res) => {
    // findUser by email address { email: email }
    // if user exists return 409 (conflict) with message about user existing
    // else encrypt the password
    // create a new user object with the hashed password as the new password
    // saveUser (user.save(user))

    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if(err){
            res.status(500).json({ message: err.message });
        } else {
            user.password = hash;
            res.status(200).json({ password: hash });
        }
    });

    // saveUser({ 
    //     _id: mongoose.Types.ObjectId(),
    //     firstName: req.body.firstName, 
    //     lastName: req.body.lastName,
    //     address: req.body.address,
    //     city: req.body.city,
    //     state: req.body.state,
    //     zip: req.body.zip,
    //     email: req.body.email,
    //     password: req.body.password
    // })
    // .then(result => {
    //     res.status(200).json({
    //         message: "User Saved",
    //         user: {
    //             "ID": result._id,
    //             "First Name": result.firstName,
    //             "Last Name": result.lastName,
    //             "Address": result.address,
    //             "City": result.city,
    //             "State": result.state,
    //             "Zip": result.zip,
    //             "Email": result.email,
    //             "Password": result.password
    //         }
    //     })
    // })
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