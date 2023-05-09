const http = require("http");
const express = require('express');
const mongoose = require('mongoose');
const { Server } = require("socket.io");
require('dotenv').config();
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const postulationRoutes = require('./routes/postulationRoutes');
const contratRoutes = require('./routes/contratRoutes');
const profileRoutes = require('./routes/profileRoutes');
const chatRoomRoute = require('./routes/chatroom.routes')
const cors = require("cors")
const app = express();
const path = require('path')
const server = http.createServer(app);
app.use(express.static(path.join(__dirname, 'assets')));
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ["GET", "POST"]
  }
})

// Use the following middlewares to handle incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: "*" }))

// Use the following routes to handle incoming requests
app.use('/api/profile', profileRoutes);
app.use('/api/users', userRoutes);
app.use('/api/post', postRoutes);
app.use('/api/postulations', postulationRoutes);
app.use('/api/contrats', contratRoutes);
app.use('/api/chatroom', chatRoomRoute);

mongoose.connect(process.env.URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
    const PORT = process.env.PORT;

    // Set up socket.io

    io.on('connection', (socket) => {

      socket.on("join_room", (data) => {
        socket.join(data)
      })
      socket.on('send_message', (data) => {
        console.log('Socket connected', data);
        socket.to(data.room).emit("recievce_message", data.room)
      })
    })

    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
  });
