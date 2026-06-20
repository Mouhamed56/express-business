# Express Business App — Checkpoint

Application Express avec 3 pages (Accueil, Nos Services, Nous Contacter)
disponible uniquement Lundi-Vendredi, 9h-17h.

## Installation
```bash
npm install
npm start
```
Puis ouvrir : http://localhost:3000

## Structure
- `server.js` — serveur Express + routes
- `middleware/checkBusinessHours.js` — middleware personnalisé qui vérifie l'heure
- `views/*.ejs` — pages (moteur de template EJS)
- `public/css/style.css` — styles

## Fonctionnement du middleware
Le site n'est accessible que si :
- Le jour est Lundi à Vendredi
- L'heure est entre 9h et 17h

Sinon, une page "Site Fermé" (statut HTTP 403) s'affiche.
