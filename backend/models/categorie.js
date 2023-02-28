const mongoose = require('mongoose');

const CategorieSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const Categorie = mongoose.model('Categorie', CategorieSchema);

module.exports = Categorie;
