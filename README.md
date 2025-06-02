# Application Météo avec API OpenWeather

![Prévisualisation de l'application](preview.jpg) <!-- Remplacez par une image réelle de votre app -->

Une application météo mobile-first utilisant l'API OpenWeather avec géolocalisation, animations dynamiques et interface moderne.

## Fonctionnalités

✅ **Recherche par ville**  
✅ **Géolocalisation automatique**  
✅ **Thèmes dynamiques** (soleil, pluie, nuages, neige, nuit)  
✅ **Données complètes**:
- Température actuelle, ressentie, min/max
- Humidité, pression atmosphérique
- Vitesse et direction du vent
- Visibilité, couverture nuageuse
- Heures de lever/coucher du soleil

✅ **Design responsive** (mobile-first)  
✅ **Gestion des erreurs** (ville non trouvée, problèmes réseau)  
✅ **Animations CSS**  

## Technologies utilisées

- HTML5
- CSS3 (Flexbox, Grid, animations)
- JavaScript (ES6)
- API OpenWeather
- Geolocation API
- Font Awesome (icônes)

## Installation

1. **Cloner le dépôt**:
   ```bash
   git clone https://github.com/votre-utilisateur/meteo-app.git
   cd meteo-app
   ```

2. **Obtenir une clé API OpenWeather**:
   - Créez un compte sur [OpenWeatherMap](https://openweathermap.org/)
   - Obtenez votre clé API gratuite
   - Remplacez `YOUR_API_KEY_HERE` dans `script.js`

3. **Ouvrir l'application**:
   - Ouvrez `index.html` dans votre navigateur
   - Ou utilisez un serveur local:
     ```bash
     python -m http.server 8000
     ```
     puis visitez `http://localhost:8000`

## Configuration

Modifiez `script.js` pour personnaliser:

```javascript
const config = {
    villeParDefaut: "Paris",  // Ville affichée au premier chargement
    unités: "metric",        // "metric" (C°) ou "imperial" (F°)
    langue: "fr"             // Langue des descriptions
};
```

## Structure des fichiers

```
meteo-app/
├── index.html          # Structure principale
├── style.css           # Styles et animations
├── script.js           # Logique et API calls
├── assets/             # Dossier pour images/icons
└── README.md           # Ce fichier
```

## Captures d'écran

| Écran principal | Mode nuit | Erreur |
|-----------------|-----------|--------|
| ![Day](screenshot-day.jpg) | ![Night](screenshot-night.jpg) | ![Error](screenshot-error.jpg) |

## Améliorations possibles

- [ ] Ajouter des prévisions sur 5 jours
- [ ] Implémenter un système de favoris
- [ ] Ajouter des graphiques météo
- [ ] Version PWA (application web progressive)

## Licence

Ce projet est sous licence MIT - voir le fichier [LICENSE](LICENSE) pour plus de détails.

---

**Remarque** : Vous aurez besoin de votre propre clé API OpenWeather (plan gratuit disponible) pour que l'application fonctionne.
``` 

## Conseils pour le fichier README.md

1. **Images** : 
   - Remplacez les noms comme `preview.jpg` par vos propres captures d'écran
   - Utilisez des chemins relatifs si les images sont dans votre dépôt

2. **Badges** (optionnel) : Vous pouvez ajouter en haut :
   ![Licence](https://img.shields.io/badge/Licence-MIT-green)
   ![Statut](https://img.shields.io/badge/Statut-Stable-brightgreen)
   ```

3. **Pour les contributions** (si open-source) :
   ## Comment contribuer

   1. Forkez le projet
   2. Créez une branche (`git checkout -b feature/AmazingFeature`)
   3. Committez vos changements (`git commit -m 'Add some AmazingFeature'`)
   4. Pushez (`git push origin feature/AmazingFeature`)
   5. Ouvrez une Pull Request
   
