const user = require('../api/model/user');
const mongoose = require('mongoose');

const connect = async () => {
    await mongoose.connect(process.env.mongoDBURL)
};

const findUser = async (data) => { 
    let result = await user.findOne(data).exec()
    return result;
};

const saveUser = async (user) => { await user.save(user) 
console.log(user)};

const disconnect = async () => {
    await mongoose.connection.close(process.env.mongoDBURL)
};

module.exports = {
    connect, 
    disconnect,
    findUser,
    saveUser,
};