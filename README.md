# Ma PWA - Progressive Web App

Une Progressive Web App moderne avec fonctionnalités offline et installation.

## Fonctionnalités

- 📱 **Installable**: Peut être installée comme une application native
- 🌐 **Offline**: Fonctionne hors connexion grâce au service worker
- 🚀 **Rapide**: Mise en cache des ressources pour un chargement instantané
- 🔔 **Notifications**: Support des notifications push
- 📱 **Responsive**: Design adaptatif pour tous les écrans
- 🌙 **Thème sombre**: Support du mode sombre automatique

## Installation

1. Clonez ou téléchargez ce projet
2. Servez les fichiers avec un serveur HTTP (voir ci-dessous)
3. Ouvrez l'application dans un navigateur compatible PWA
4. Cliquez sur le bouton "Installer l'app" pour l'ajouter à votre écran d'accueil

## Serveur de développement

### Avec Python
```bash
python -m http.server 8000
```

### Avec Node.js
```bash
npx serve .
```

### Avec PHP
```bash
php -S localhost:8000
```

## Structure du projet

```
sop-pwa/
├── index.html          # Page principale
├── styles.css          # Styles CSS
├── app.js              # Logique JavaScript
├── sw.js               # Service Worker
├── manifest.json       # Manifest PWA
├── icons/              # Icônes de l'application
└── README.md           # Documentation
```

## Fichiers PWA essentiels

- **manifest.json**: Définit les métadonnées de l'application
- **sw.js**: Service worker pour le cache et le mode offline
- **app.js**: Logique de l'application et gestion des fonctionnalités PWA

## Icônes nécessaires

Pour une installation complète, ajoutez les icônes suivantes dans le dossier `icons/`:
- icon-72x72.png
- icon-96x96.png
- icon-128x128.png
- icon-144x144.png
- icon-152x152.png
- icon-192x192.png
- icon-384x384.png
- icon-512x512.png

## Compatibilité

Cette PWA fonctionne sur les navigateurs modernes supportant les Service Workers:
- Chrome (Android/Desktop)
- Firefox (Android/Desktop)
- Safari (iOS 11.3+)
- Edge (Chromium)

## Développement

Pour tester les fonctionnalités PWA:
1. Ouvrez les DevTools (F12)
2. Allez dans l'onglet "Application"
3. Vérifiez le Manifest et le Service Worker
4. Testez le mode offline dans l'onglet "Network"

## Déploiement

Pour déployer cette PWA:
1. Uploadez tous les fichiers sur un serveur HTTPS (obligatoire pour les PWA)
2. Assurez-vous que le serveur envoie les bons en-têtes CORS
3. Testez l'installation et les fonctionnalités offline

## Licence
confidentiel
