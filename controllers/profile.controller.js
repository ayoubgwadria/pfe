const Profile = require('../models/profile')

const add = async (req, res) => {
    try {
        const { formation, compétences, disponibilité, langue ,domaine,bio} = req.body;


        const profile = new Profile({
            formation,
            compétences,
            disponibilité,
            langue,
            domaine,
            bio,
            user: req.user.id,
        });

        await profile.save();
        res.status(201).json({ message: 'profile ajouté avec succès', profile });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const  getprofile = async (req, res) => {
    try {
      const { userId } = req.params;
  
      const profile = await Profile.findOne({ user: userId }).populate('user','nom prenom');;
  
      if (!profile) {
        return res.status(404).json({ message: 'Profile not found for this user' });
      }
  
      res.json(profile);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  const findAllProfile = async (req, res) => {
    try {
        const profiles = await Profile.find().populate('user', 'nom prenom emplacement');

        if (!profiles || profiles.length === 0) {
            return res.status(404).json({ message: 'No profiles found' });
        }

        res.json(profiles);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
  
module.exports = { add ,getprofile,findAllProfile};