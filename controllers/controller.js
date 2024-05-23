const dataMapper = require('../datamaper/datamaper');
const emailValidator = require('email-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const controller = {
    addNewUser: async (req, res) => {
        const {
          email,
          password,
        } = req.body;
    
        if (!email || !password) {
          return res.status(400).json({ errorMessage: "Veuillez remplir tous les champs" });
        }
    
        if (!emailValidator.validate(email)) {
          return res.status(400).json({ errorMessage: "Veuillez entrer une adresse e-mail valide" });
        }
    
        try {
          const alreadyExistingUser = await dataMapper.getuserFromEmail(email);
          if (alreadyExistingUser) {
            return res.status(400).json({ errorMessage: "Cet e-mail existe déjà" });
          }
    
          const saltRound = 10;
          const hashedPassword = await bcrypt.hash(password, saltRound);
    
          await dataMapper.createOneUser({
            email,
            password: hashedPassword,
          });
    
          const newUser = await dataMapper.getuserFromEmail(email);
          const token = jwt.sign(
            { userId: newUser.id },
            process.env.TOKEN_KEY,
            { expiresIn: "24h" }
          );
    
          return res.status(200).json({ message: "Votre inscription est réussie", token });
        } catch (err) {
          console.error("Erreur lors de l'enregistrement du profil :", err);
          return res.status(500).json({ errorMessage: "L'enregistrement de votre profil n'a pas pu être réalisé. Réessayez ultérieurement" });
        }
      },

    Allprofile: async (req, res) => { // Renommé pour correspondre au routeur

        try {
            const allProfile = await dataMapper.getAllprofile();
          
            res.json(allProfile);
        } catch (err) {
            const message = "Le profil de cette personne n'a pas pu être récupéré. Réessayez dans quelques instants.";
            res.status(500).json({ message, err });
        }
    }
};

module.exports = controller;
