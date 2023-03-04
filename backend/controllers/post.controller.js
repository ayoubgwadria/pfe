const Post = require('../models/Post');


add = async (req, res) => {
  try {
    const { titre, description, client } = req.body;
    const image = req.file.path;

    const post = new Post({
      titre,
      description,
      date: Date.now(),
      client: client,
      image
    });

    await post.save();
    res.status(201).json({ message: 'Post ajouté avec succès', post });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

getpostbyclient = async (req, res) => {
  try {
    const { idclient } = req.params
    const data = await Post.findOne({ client: idclient })
    console.log(data)
    res.status(200).json({ data })
  } catch (error) {
    console.log(error)
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
updatepost = async (req,res)=>{
  try {
    const {titre,description}=req.body;
    const update= await Post.findOneAndUpdate ({_id:req.params.postId},{titre,description})
    res.status(200).json({message:'mise a jour  avec succées'})
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}


module.exports = { deletePost, add, getpostbyclient,updatepost };

