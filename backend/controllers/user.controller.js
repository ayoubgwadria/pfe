const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
register = async (req, res) => {
  try {
    const { nom, email, mot_de_passe, telephone, emplacement, latitude, longitude, domaine, usertype } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({ message: 'email existe déjà' });
    }

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
    const token = jwt.sign({ id: user.id, name: user.nom, email: user.email }, process.env.SECRET);
    const decodedToken = jwt.verify(token, process.env.SECRET);

    res.status(200).json({ message: 'Connexion réussie', token });
    console.log(decodedToken);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

getProfile = async (req, res) => {
  try {
    const userId = req.user.id; 
    const user = await User.findById(userId); 

    if (!user) {
      return res.status(404).json({ message: 'Utilisateur introuvable' });
    }

    const { nom, email, telephone, emplacement, domaine } = user; 

    res.status(200).json({ nom, email, telephone, emplacement, domaine });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = { register, login,getProfile };