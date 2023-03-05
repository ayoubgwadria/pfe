    const Postulation = require('../models/postulation');

    const createPostulation = async (req, res) => {
        try {
            const { post, professionnel } = req.body;
            const postulation = new Postulation({
                client: post.client,
                post: post._id,
                professionnel,
                status: 'pending'
            });
            await postulation.save();
            res.status(201).json({ message: 'Postulation créée avec succès'});
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    };

    const getPostulationsByPost = async (req, res) => {
        try {
            const postulations = await Postulation.find({ post: req.params.postId }).populate('professionnel');
            res.json(postulations);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    };

    const acceptPostulation = async (req, res) => {
        try {
            const postulation = await Postulation.findByIdAndUpdate(req.params.id, { status: 'accepted' }, { new: true });
            res.json({ message: 'Postulation acceptée avec succès', postulation });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    };

    const refusePostulation = async (req, res) => {
        try {
            const postulation = await Postulation.findByIdAndUpdate(req.params.id, { status: 'unchecked' }, { new: true });
            res.json({ message: 'Postulation refusée avec succès', postulation });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    };

    module.exports = { createPostulation, getPostulationsByPost, acceptPostulation, refusePostulation };
