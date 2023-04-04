const mongoose = require('mongoose');

const postulationSchema = new mongoose.Schema({
    durée: {
        type: String,
        required: true,
    },
    Lettre_de_motivation: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['unchecked', 'pending', 'accepted', 'refused'],
        default: 'unchecked',
        required: true
    },
    titre:{
        type: String,
        required: true,
    } ,
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'post',
        required: true
    },
    technicienId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    clientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
}, { timestamps: true });

module.exports = mongoose.model('Postulation', postulationSchema);
