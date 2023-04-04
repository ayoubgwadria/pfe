const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require ('./routes/postRoutes');
const postulationRoutes = require('./routes/postulationRoutes');
const contratRoutes = require ('./routes/contratRoutes');
const profileRoutes = require ('./routes/profileRoutes');

const cors = require ("cors")
const app = express();

app.use(bodyParser.urlencoded({ extended: false }), bodyParser.json());
app.use(cors({origin:"*"}))

app.use('/api/profile',profileRoutes);
app.use('/api/users', userRoutes);
app.use('/api/post', postRoutes);
app.use('/api/postulations', postulationRoutes);
app.use('/api/contrats', contratRoutes);

mongoose.connect(process.env.URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
  const PORT = process.env.PORT;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
})
.catch((error) => {
  console.error('Error connecting to MongoDB:', error.message);
});



