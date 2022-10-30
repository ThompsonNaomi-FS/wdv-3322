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
    },
    {
    _id: '24',
    firstName: 'Odin',
    lastName: 'Thompson',
    address: '255 N 5th St',
    city: 'Ulysses',
    state: 'NE',
    zip: '68669',
    email: 'odin@outlook.com',
    password: 'password'
        }
];

const findUser = async (data) => {
    // const match = users.filter(user => {
    //     return user._id.includes(data)
    // });
    // const match = {}; 
    for (let i = 0; i < users.length++; i++) {
        if (users[i] === data) return users[i];
    }
    // console.log("From findUser: ")
    // console.log(match);

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