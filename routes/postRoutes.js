const express = require('express');
const router = express.Router();
const postController = require('../controllers/post.controller');
const auth = require('../middleware/auth');
const { uploadPost } = require('../middleware/upload')

router.post('/add', auth, uploadPost.single('image'), postController.add);
router.delete('/delete', auth, postController.deletePost);
router.get('/getpostbyclient/:idclient', auth, postController.getpostbyclient);
router.get('/updatepost/:postId', auth, postController.updatepost);
router.get('/getAllPosts', postController.getAllPosts);
router.get('/getpost/:postId', postController.getPostById);
router.get('/getclientpost/:clientId', auth, postController.getpostbyclient);
router.get('/post/image/:id', postController.getImagePost)
module.exports = router;