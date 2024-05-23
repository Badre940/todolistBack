const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {

  const authorizationHeader = req.headers.authorization;
  if (!authorizationHeader) {
    return res.status(401).json({message : "vous n'avez pas fourni de jeton d'authentification. Ajoutez-en un à l'en-tête de la requête"});
  }
  const token = authorizationHeader.split(' ')[1];
  const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
  req.userId = decodedToken.userId;
  next();

};

module.exports = verifyToken;

