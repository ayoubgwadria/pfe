const express = require('express');
const router = express.Router();
const chatroomController = require("../controllers/chatroom.controller")

router.get('/getroom/:idPostulation', chatroomController.getChatRoombyIdPostulaTion)
router.post('/message', chatroomController.postMessage)
router.get('/room/:idRoom/message', chatroomController.getChatRoomMessage)
module.exports = router;