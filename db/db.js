const user = require('../api/model/user');

const findUser = async (data) => { 
    let result = await user.findOne(data).exec()
    return result;
};

const saveUser = async (user) => { await user.save(user) 
console.log(user)};

module.exports = {
    // connect, 
    // disconnect,
    findUser,
    saveUser,
};