const mongoose = require('mongoose');

const contratSchema = new mongoose.Schema({
    titre: {
        type: String,
        required: true
    },

    prix: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    emplacement: {
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
    },
    postulation_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Postulation',
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'refused'],
        default: 'pending',
        required: true
    }
},{ timestamps: true });

const Contrat = mongoose.model('Contrat', contratSchema);

module.exports = Contrat;


