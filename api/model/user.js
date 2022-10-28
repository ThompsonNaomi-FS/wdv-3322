const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    firstName: { tpe: string, required: true},
    lastName: { type: string, required: true}
});

module.exports = mongoose.model('User', userSchema);