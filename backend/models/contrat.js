const mongoose = require('mongoose');

const contractSchema = new mongoose.Schema({

    date: {
        type: Date,
        required: true
    },

    emplacement: {
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
    },
    professionnel_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Professionnel',
        required: true
      },
      client_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'client',
        required: true
      }
});

const Contract = mongoose.model('Contract', contractSchema);

module.exports = Contract;

