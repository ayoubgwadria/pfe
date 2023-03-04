const express = require('express');
const router = express.Router();
const multer = require('multer');
const postController = require('../controllers/post.controller');

const upload = multer({ dest: 'uploads/' });

router.post('/add', upload.single('image'), postController.add);
router.delete('/delete', postController.deletePost);
router.get('/getpostbyclient/:idclient', postController.getpostbyclient);
router.get('/updatepost/:postId', postController.updatepost);


module.exports = router;