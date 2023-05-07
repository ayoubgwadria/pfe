const mongoose = require('mongoose');

const chatRoomSchema = new mongoose.Schema({
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'post',
        required: true
    },
    PostulationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Postulation',
        require: true
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

}, { timestamps: true });

module.exports = mongoose.model('Chatroom', chatRoomSchema);
