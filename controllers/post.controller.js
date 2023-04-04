const Post = require('../models/post');


add = async (req, res) => {
  try {
    const { titre, description, domaine, prix, condition } = req.body;


    const post = new Post({
      titre,
      description,
      domaine,
      prix,
      date: Date.now(),
      condition,
      creator: req.user.id,
    });

    await post.save();
    res.status(201).json({ message: 'Post ajouté avec succès', post });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getpostbyclient = async (req, res) => {
  try {
    const { clientId } = req.params; 
    const data = await Post.find({ creator: clientId });
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


deletePost = async (req, res) => {
  try {
    const postId = req.body.postId;
    const deletedPost = await Post.findByIdAndDelete(postId);

    if (!deletedPost) {
      return res.status(404).json({ message: 'Post introuvable' });
    }

    res.status(200).json({ message: 'Post supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

updatepost = async (req, res) => {
  try {
    const { titre, description } = req.body;
    const update = await Post.findOneAndUpdate({ _id: req.params.postId }, { titre, description })
    res.status(200).json({ message: 'mise a jour  avec succées' })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
};


const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate('creator', 'nom');
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

getPostById = async (req, res) => {
  try {
    const postId = req.params.postId;
    const post = await Post.findById(postId).populate('creator', 'nom prenom');

    if (!post) {
      return res.status(404).json({ message: 'Post introuvable' });
    }

    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};


module.exports = { deletePost, add, getpostbyclient, updatepost, getAllPosts, getPostById };

