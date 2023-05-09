const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path')
/* const fileType = require('file-type'); */
register = async (req, res) => {
  try {
    const { nom, prenom, email, mot_de_passe, telephone, emplacement, latitude, longitude, usertype } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({ message: 'email existe déjà' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(mot_de_passe, salt);
    const user = new User({ nom, prenom, email, mot_de_passe: hashedPassword, telephone, emplacement, latitude, longitude, usertype });
    await user.save();
    const imagePath = `./assets/${email.split(".")[0]}/user/`
    const newIamgepath = `./assets/${user._id}/user/`
    const imageName = `${email.split(".")[0]}`
    const imageExtension = path.extname(`${imagePath}${imageName}`);
    /*  fs.rename(`${imagePath}`, `${newIamgepath}`,(err)=>{
       if (err) {
         console.log('Error renaming image:', err);
       } else {
         console.log('Image renamed successfully');
       }
     }) */

    fs.rename(`${imagePath}${imageName}${imageExtension}${req.image}`, `${imagePath}${user._id}${imageExtension}${req.image}`, async function (err) {
      if (err) {
        console.log('Error renaming image:', err);
      } else {
        console.log('Image renamed successfully');
        /*  var useUpd = new User() */
        await User.findOneAndUpdate({ _id: user._id }, { image: `${imagePath}${user._id}${imageExtension}${req.image}` })
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
const getUserImage = async (req, res) => {
  const { id } = req.params
  const user = await User.findById(id)

  var file = null
  console.log('user', user)
  if (user?.image && user?.image !== "") {
    file = fs.createReadStream(user.image)

    file.pipe(res);
    res.status(200)
  }
  else { res.status(200).send('noe image') }

}
module.exports = { register, login, getProfile, getTechniciens, getUserImage };