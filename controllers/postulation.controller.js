const Postulation = require('../models/postulation');
const Post = require('../models/post');
const Chatroom = require('../models/chatroom')
createPostulation = async (req, res) => {
    try {
        const { durée, Lettre_de_motivation } = req.body;
        const postId = req.params.postId;
        const technicienId = req.params.technicienId;
        const post = await Post.findById(postId);

        const postulation = new Postulation({
            durée,
            Lettre_de_motivation,
            status: 'pending',
            postId,
            technicienId,
            clientId: post.creator,
            titre: post.titre,
            date: Date.now(),
        });

        const savedPostulation = await postulation.save();

        res.status(201).json(savedPostulation);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


const getPostulationByTech = async (req, res) => {
    try {
        const technicienId = req.params.technicienId;
        const postulations = await Postulation.find({ technicienId: technicienId });
        res.status(200).json(postulations);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
const getPostulationsByClient = async (req, res) => {
    const { clientId } = req.params;
    try {
        const postulations = await Postulation.find({ clientId: clientId }).populate("technicienId");
        console.log('postutalion', postulations)
        res.status(200).json(postulations);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
const acceptPostulation = async (req, res) => {
    try {
        const postulation = await Postulation.findByIdAndUpdate(req.params.id, { status: 'accepted' }, { new: true });
        const chatroom = new Chatroom({
            PostulationId: req.params.id,
            clientId: postulation.clientId,
            postId: postulation.postId,
            technicienId: postulation.technicienId
        })
        chatroom.save()
        res.json({ message: 'Postulation acceptée avec succès', postulation });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const refusePostulation = async (req, res) => {
    try {
        const postulation = await Postulation.findByIdAndUpdate(req.params.id, { status: 'refused' }, { new: true });
        res.json({ message: 'Postulation refusée avec succès', postulation });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { createPostulation, getPostulationsByClient, acceptPostulation, refusePostulation, getPostulationByTech };
