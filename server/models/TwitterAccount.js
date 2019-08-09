const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TwitterAccountSchema = new Schema({

})


const TwitterAccount = mongoose.model('TwitterAccount', TwitterAccountSchema);
module.exports = TwitterAccount;