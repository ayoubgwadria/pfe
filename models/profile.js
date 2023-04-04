const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    formation: {
        type: String,
        required: true
    },
    compétences: {
        type: String,
        required: true
    },
    disponibilité: {
        type: String,
        required: true
    },
    langue: {
        type: String,
        required: true
    },
    domaine: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;
