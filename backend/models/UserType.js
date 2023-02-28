const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserTypeSchema = new Schema({

    type:String

})
const UserType = mongoose.model('post', PostSchema);

module.exports = UserType;