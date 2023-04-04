const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  contenu: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  expediteur_id: {
    type: Number,
    required: true
  },
  destinataire_id: {
    type: Number,
    required: true
  }
});
const message = mongoose.model('Message', messageSchema);
module.exports = message;

