const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();


mongoose.connect(process.env.URL ,{
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const PORT = process.env.PORT ;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});




