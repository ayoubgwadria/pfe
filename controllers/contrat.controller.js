const Contrat = require('../models/contrat');
const Postulation = require('../models/postulation');

createContrat = async (req, res) => {
  try {
    const postulation = await Postulation.findById(req.body.postulation_id);

    if (!postulation) {
      return res.status(404).json({ error: 'Postulation non trouvée' });
    }

    if (postulation.status !== 'accepted') {
      return res.status(400).json({ error: 'La postulation doit être acceptée avant de créer un contrat' });
    }

    const contrat = new Contrat({
      titre: req.body.titre,
      prix: req.body.prix,
      description: req.body.description,
      emplacement: req.body.emplacement,
      professionnel_id: req.body.professionnel_id,
      client_id: req.body.client_id,
      postulation_id: req.body.postulation_id
    });

    await contrat.save();

    res.status(201).json(contrat);
  } catch (err) {
    res.status(500).json({ error: 'Échec de la création du contrat' });
  }
};


actionContrat = async (req, res) => {
  try {
    const contrat = await Contrat.findById(req.params.contratId);

    if (!contrat) {
      return res.status(404).json({ error: 'Contrat non trouvé' });
    }

    if (contrat.status !== 'pending') {
      return res.status(400).json({ error: 'Le statut du contrat doit être en attente pour accepter ou refuser' });
    }

    const { action } = req.body;

    if (action === 'accept') {
      contrat.status = 'accepted';
      await contrat.save();
      return res.status(200).json(contrat);

    } else if (action === 'refuse') {
      contrat.status = 'refused';
      await contrat.save();
      return res.status(200).json(contrat);
    } else {
      return res.status(400).json({ error: 'Action spécifiée non valide' });
    }

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports = {actionContrat,createContrat}