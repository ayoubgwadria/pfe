const Chatroom = require('../models/chatroom')

const Message = require('../models/message')

const getChatRoombyIdPostulaTion = async (req, res) => {
    const { idPostulation } = req.params
    try {
        const chatroom = await Chatroom.findOne({ PostulationId: idPostulation })
        res.status(200).json(chatroom)
    } catch (error) {
        res.status(400).json({ message: error.message });
    }

}

const postMessage = async (req, res) => {
    try {
        const message = new Message({
            contenu: req.body.contenu,
            room: req.body.room,
            sender: req.body.sender,
            reciever: req.body.reciever
        })
        await message.save()
        res.status(200).send(message)
    } catch (error) {
        res.status(400).send('error message')
    }


}
const getChatRoomMessage = async (req, res) => {
    const { idRoom } = req.params
    try {


        const data = await Message.find({ room: idRoom })

        res.status(200).send(data)


    } catch (error) {
        res.status(400).send('error message')

    }


}

module.exports = { getChatRoombyIdPostulaTion, postMessage, getChatRoomMessage }