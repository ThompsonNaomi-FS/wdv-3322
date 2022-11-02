const user = require('../api/model/user');

const findUser = async (data) => { await user.findOne(data).exec() };

const saveUser = async (user) => {
    users.push(user)
    console.log('From saveUser:')
    console.log(users)
    return user;
};

module.exports = {
    // connect, 
    // disconnect,
    findUser,
    saveUser,
};