const path = require('path');
const multer = require('multer');
const fs = require('fs')
const storageUser = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log('requuest email ', req.headers.email)
        const user = req.headers.email
        const dir = `./assets/${user}/user`;
        fs.mkdirSync(dir, { recursive: true });

        cb(null, dir);
    },
    filename: function (req, file, cb) {
        /*      console.log('req; body', req.body.) */
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, req.headers.email + path.extname(file.originalname));
        req.image = path.extname(file.originalname)

    }
});
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log('requuest ', req.user.id)
        const user = req.user.id
        const dir = `./assets/${user}/post`;
        fs.mkdirSync(dir, { recursive: true });

        cb(null, dir);
    },
    filename: function (req, file, cb) {
        /*      console.log('req; body', req.body.) */
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, req.user.id + path.extname(file.originalname));
        req.image = path.extname(file.originalname)

    }
});
const uploadPost = multer({ storage: storage });
const uploadUser = multer({ storage: storageUser })
module.exports = { uploadPost, uploadUser }