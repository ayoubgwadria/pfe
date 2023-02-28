const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  mot_de_passe: {
    type: String,
    required: true
  },
  telephone: {
    type: String,
    required: true
  },
  emplacement: {
    type: String,
    required: true
  },
  latitude: {
    type: String,
    required: true
  },
  longitude: {
    type: String,
    required: true
  },
  domaine: {
    type: String,
    required: true
  },
  usertype: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserType',
    required: true
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
