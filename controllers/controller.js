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
          console.log(res)
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
        
    },
    createTask: async (req, res) => {
        const { userId, description} = req.body;
        
        try {
            const newTask = await dataMapper.createTask({ userId, description });
            res.status(201).json(newTask);
        } catch (err) {
            console.error("Erreur lors de la création de la tâche :", err);
            res.status(500).json({ errorMessage: "Erreur lors de la création de la tâche" });
        }
    },

    getTasks: async (req, res) => {
        const { userId } = req.params;
        
        try {
            const tasks = await dataMapper.getTasks(userId);
            res.status(200).json(tasks);
        } catch (err) {
            console.error("Erreur lors de la récupération des tâches :", err);
            res.status(500).json({ errorMessage: "Erreur lors de la récupération des tâches" });
        }
    },

    deleteTask: async (req, res) => {
        const { taskId } = req.params;

        try {
            const deletedTask = await dataMapper.deleteTask(taskId);
            if (!deletedTask) {
                return res.status(404).json({ errorMessage: "Tâche non trouvée" });
            }
            res.status(200).json(deletedTask);
        } catch (err) {
            console.error("Erreur lors de la suppression de la tâche :", err);
            res.status(500).json({ errorMessage: "Erreur lors de la suppression de la tâche" });
        }
    },

    updateTask: async (req, res) => {
        const { taskId } = req.params;
        const updates = req.body;

        try {
            const updatedTask = await dataMapper.updateTask(taskId, updates);
            if (!updatedTask) {
                return res.status(404).json({ errorMessage: "Tâche non trouvée" });
            }
            res.status(200).json(updatedTask);
        } catch (err) {
            console.error("Erreur lors de la mise à jour de la tâche :", err);
            res.status(500).json({ errorMessage: "Erreur lors de la mise à jour de la tâche" });
        }
    },
    OneProfile: async (req, res) => {
        const { id } = req.params;
    
        try {
            const getUser = await dataMapper.getOneprofile(id);
            if (!getUser) {
                return res.status(404).json({ errorMessage: "user pas trouvé" });
            }
            res.status(200).json(getUser);
        } catch (err) {
            console.error("Erreur lors de la recherche d'utilisateur :", err);
            res.status(500).json({ errorMessage: "Erreur lors de la recherche d'utilisateur" });
        }
    },
    
};

module.exports = controller;
