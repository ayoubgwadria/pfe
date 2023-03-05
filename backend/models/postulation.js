const mongoose = require('mongoose');

const postulationSchema = new mongoose.Schema({
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required:true
    },
    professionnel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true
    },
    status: {
        type: String,
        enum: ['unchecked', 'pending', 'accepted', 'refused'],
        default: 'unchecked',
        required:true
    }
}, { timestamps: true });

module.exports = mongoose.model('Postulation', postulationSchema);
