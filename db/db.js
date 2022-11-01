const users = [];

const findUser = async (data) => {
    return data;
};

const saveUser = async (data) => {
    users.push(data)
    console.log('From saveUser:')
    console.log(users)
    return data;
};

module.exports = {
    findUser,
    saveUser
};