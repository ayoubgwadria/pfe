const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  montant: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  statut: {
    type: String,
    required: true
  },
  professionnel_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  client_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
