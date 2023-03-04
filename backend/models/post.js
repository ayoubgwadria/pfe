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
  image: {
    type: String,
    required: true
  },
  /*   emplacement: {
      type: String,
      required: true
    },
    longitude: {
      type: String,
      required: true
    },
    latitude: {
      type: String,
      required: true
    }, */
  date: {
    type: Date,
    default: Date.now
  },
  client: {
    type: Schema.Types.ObjectId,
    ref: 'client',
    required: true
  }
});

const post = mongoose.model('post', PostSchema);

module.exports = post;
