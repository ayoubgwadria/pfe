const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  titre: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  domaine: {
    type: String,
    required: true,
  },
  condition: {
    type: String,
    required: true,
  },
  prix: {
    type: String,
    required: true,
  },

  date: {
    type: Date,
    default: Date.now
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

});

const post = mongoose.model('post', PostSchema);

module.exports = post;
