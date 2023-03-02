const Post = require('../models/Post');

add = async (req, res) => {
  try {
    const { titre, description } = req.body;

    const post = new Post({
      titre,
      description,
      date: Date.now(),
    });

    await post.save();
    res.status(201).json({ message: 'Post ajouté avec succès', post });
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


module.exports = { deletePost, add };

