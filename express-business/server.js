// ============================================================
// SERVEUR EXPRESS — Application web avec 3 pages
// Accueil | Nos Services | Nous Contacter
//
// L'application n'est disponible que :
// Lundi - Vendredi, de 9h à 17h (voir middleware/checkBusinessHours.js)
// ============================================================

const express = require('express');
const path = require('path');
const checkBusinessHours = require('./middleware/checkBusinessHours');

const app = express();
const PORT = 3000;

// ===== CONFIGURATION DU MOTEUR DE TEMPLATE EJS =====
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// ===== SERVIR LES FICHIERS STATIQUES (CSS) =====
app.use(express.static(path.join(__dirname, 'public')));

// ===== PARSER LES DONNÉES DE FORMULAIRE (POST) =====
app.use(express.urlencoded({ extended: true }));

// ===== MIDDLEWARE PERSONNALISÉ : vérifie les heures d'ouverture =====
// Appliqué à TOUTES les routes grâce à app.use()
app.use(checkBusinessHours);


// ============================================================
// ROUTES
// ============================================================

// Page d'accueil
app.get('/', (req, res) => {
  res.render('index');
});

// Page Nos Services
app.get('/services', (req, res) => {
  res.render('services');
});

// Page Nous Contacter (affichage du formulaire)
app.get('/contact', (req, res) => {
  res.render('contact');
});

// Traitement du formulaire de contact (soumission POST)
app.post('/contact', (req, res) => {
  const { nom, email, message } = req.body;
  console.log('📨 Nouveau message reçu :', { nom, email, message });
  // On redirige vers la page contact après l'envoi
  res.redirect('/contact');
});


// ===== DÉMARRAGE DU SERVEUR =====
app.listen(PORT, () => {
  console.log(`✅ Serveur démarré : http://localhost:${PORT}`);
  console.log(`🕘 Accessible uniquement Lundi-Vendredi, 9h-17h`);
});
