// ============================================================
// MIDDLEWARE PERSONNALISÉ : Vérification des heures d'ouverture
//
// L'application n'est accessible que :
// - du LUNDI (1) au VENDREDI (5)
// - entre 9h et 17h
//
// Express exécute ce middleware AVANT chaque route grâce à app.use()
// ============================================================

function checkBusinessHours(req, res, next) {
  const maintenant = new Date();
  const jour  = maintenant.getDay();   // 0 = Dimanche, 1 = Lundi, ..., 6 = Samedi
  const heure = maintenant.getHours(); // 0 à 23

  // Conditions d'ouverture : Lundi(1) à Vendredi(5), de 9h à 17h (17h exclue)
  const estJourOuvrable  = jour >= 1 && jour <= 5;
  const estHeureOuvrable = heure >= 9 && heure < 17;

  if (estJourOuvrable && estHeureOuvrable) {
    // ✅ On est dans les heures d'ouverture → on passe à la route suivante
    return next();
  }

  // ❌ Hors des heures d'ouverture → on affiche une page "Fermé"
  res.status(403).render('closed', {
    heureActuelle: maintenant.toLocaleString('fr-FR')
  });
}

module.exports = checkBusinessHours;
