const mongoose = require('mongoose');

const AvisSchema = new mongoose.Schema({
  titre: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  evaluation: {
    type: Number,
    required: true
  },
  professionnel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Professionnel',
    required: true
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'client',
    required: true
  }
});

const Avis = mongoose.model('Avis', AvisSchema);

module.exports = Avis;
