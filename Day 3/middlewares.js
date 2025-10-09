const express = require('express');
const app = express();

// 1. Afficher les logs donc la méthode, l'URL et la méthode
app.use((req, res, next) => {
  const date = new Date().toISOString();
  console.log(`[${date}] ${req.method} ${req.url}`);
  next();
});

// 2. Authorization : en utilisant une de 3 propriétés
function checkAuth(req, res, next) {
  const user = req.query.user;
  const password = req.query.password;
  
  if (user === "admin" && password === "1234") {
    console.log(`✅ Authentifié : ${user}`);
    next();
  } else {
    console.log("❌ Accès refusé !");
    res.status(401).send("Accès refusé : identifiants incorrects !");
  }
}

app.get('/', (req, res) => {
  res.send('Page d\'accueil');
});

app.get('/login', checkAuth, (req, res) => {
  res.send("Bienvenue dans la page profil 🕵️‍♂️");
});

app.get('/about', (req, res) => {
  res.send('Page à propos');
});

// 3. Une gestion en cas d'erreur
app.use((req, res) => {
  res.status(404).send(`
    <h1>404 - Page non trouvée 😢</h1>
    <p>L'URL <code>${req.url}</code> n'existe pas.</p>
  `);
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});