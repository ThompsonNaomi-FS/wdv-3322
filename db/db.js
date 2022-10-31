const users = [
    {
    _id: '23',
    firstName: 'Naomi',
    lastName: 'Thompson',
    address: '255 N 5th St',
    city: 'Ulysses',
    state: 'NE',
    zip: '68669',
    email: 'nameowmi@outlook.com',
    password: 'password'
    }
];

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