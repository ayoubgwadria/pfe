const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const path = require('path');
const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const userId = req.user._id;
    const dir = `./assets/${userId}`;
    fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    cb(null, uuidv4() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 } // set limit to 1 MB
}).single('image');
register = async (req, res) => {
  try {
    const { nom, prenom, email, mot_de_passe, telephone, emplacement, latitude, longitude, usertype } = req.body;
    console.log('data', nom)
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({ message: 'email existe déjà' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(mot_de_passe, salt);
    const user = new User({ nom, prenom, email, mot_de_passe: hashedPassword, telephone, emplacement, latitude, longitude, usertype });
    await user.save();
    req.user = user
    upload(req, res, (err) => {
      if (err) {
        // handle error
        console.error(err);
        res.status(500).json({ message: 'Failed to upload image' });
      } else {
        // file uploaded successfully, send response
        res.status(200).json({ message: 'User and image uploaded successfully' });
      }
    });
    res.status(201).json({ message: 'Utilisateur créé avec succès', userId: user._id });
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
    const token = jwt.sign({ id: user.id, nom: user.nom, prenom: user.prenom, email: user.email, telephone: user.telephone, emplacement: user.emplacement, usertype: user.usertype }, process.env.SECRET);


    res.status(200).json({ message: 'Connexion réussie', token, usertype: user.usertype, id: user.id });

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

    const { nom, prenom, email, telephone, emplacement, domaine } = user;

    res.status(200).json({ nom, prenom, email, telephone, emplacement, domaine });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTechniciens = async (req, res) => {
  try {
    const techniciens = await User.find({ usertype: 'Technicien' });
    res.json(techniciens);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { register, login, getProfile, getTechniciens };