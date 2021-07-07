const jwt = require("jsonwebtoken");
const TOKEN = process.env.TOKEN;

module.exports = (req, res, next) => {
  try {
    console.log("🔒  Route protégée");
    //Get token in authorization headers
    const token = req.headers.authorization.split(" ")[1];
    console.log(`🔑  Token reçu !`);
    //verify is token is matching with API
    const decodedToken = jwt.verify(token, TOKEN);
    //Get userID from token
    const userId = decodedToken.userId;
    console.log("🕵️  Utilisateur : n°" + userId);
    //If is null or != from that one of API : invalid request
    if (req.body.userId && req.body.userId != userId) {
      throw "⛔️ Utilisateur non valide ⛔️";
    } else {
      console.log("🔓  Accès autorisé ! ✔️");
      next();
    }
  } catch {
    res.status(401).json({ error: new Error("❌ Requète invalide ❌") });
    console.log("❌ Requète invalide ❌");
  }
};
