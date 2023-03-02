const express = require('express');
const router = express.Router();
const postController = require('../controllers/post.controller');


router.post('/add', postController.add);
router.delete('/delete', postController.deletePost);

module.exports = router;