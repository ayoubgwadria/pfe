const bcrypt = require('bcrypt');
const User = require('../models/user');
register = async (req, res) => {
    try {
        const { nom, email, mot_de_passe, telephone, emplacement, latitude, longitude, domaine, usertype } = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(mot_de_passe, salt);
        const user = new User({ nom, email, mot_de_passe: hashedPassword, telephone, emplacement, latitude, longitude, domaine, usertype });
        await user.save();
        res.status(201).json({ message: 'Utilisateur créé avec succès' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

login = async (req, res) => {
    try {
      const { email, mot_de_passe } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: 'Email ou mot de passe invalide' });
      }
      const isPasswordValid = await bcrypt.compare(mot_de_passe, user.mot_de_passe);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'mot de passe invalide' });
      }
      res.status(200).json({ message: 'Connexion réussie' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  module.exports = { register, login };