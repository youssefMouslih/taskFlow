# TaskFlow — Application de Gestion de Tâches (CRUD)

TaskFlow est une application de gestion de tâches développée avec React et Vite. Elle implémente un front-end CRUD connecté à une API locale `json-server` pour stocker les tâches dans `db.json`.

## ✅ Ce que réalise ce projet

L'application répond aux exigences du mini-projet React :

- afficher une liste de tâches,
- créer une tâche avec titre, description et statut,
- modifier une tâche existante via une page d'édition,
- supprimer une tâche avec confirmation,
- filtrer les tâches par statut (`Tout`, `À faire`, `En cours`, `Terminé`).

## 🔎 Compatibilité avec le cahier des charges

Le projet correspond à la spécification du PDF `mini-projet1_react_msid.pdf` :

- Front-end React.js avec pages de liste, création et modification,
- Back-end simulé avec `json-server`,
- Opérations CRUD sur les tâches.

Remarque : le PDF mentionne parfois `/task` comme route, mais le projet utilise `/tasks` pour tous les endpoints.

## 🚀 Installation

### Prérequis

- Node.js >= 18
- npm >= 9

### Installation des dépendances

```bash
cd task-manager
npm install
```

## ▶️ Démarrage

Lancer le front-end et le serveur de données ensemble :

```bash
npm run start
```

Ou lancer séparément :

```bash
npm run server
npm run dev
```

- Front-end : http://localhost:5173
- API locale : http://localhost:3001

## 📁 Structure du projet

```
task-manager/
├── db.json                # Base de données locale de json-server
├── package.json
├── vite.config.js
├── index.html
└── src/
    ├── main.jsx           # Point d'entrée React
    ├── App.jsx            # Routeur principal
    ├── index.css          # Styles globaux
    ├── services/
    │   └── taskService.js # Appels API vers json-server
    ├── components/
    │   ├── Navbar.jsx     # Barre de navigation
    │   ├── TaskCard.jsx   # Carte de tâche
    │   ├── TaskForm.jsx   # Formulaire création / édition
    │   └── DeleteModal.jsx# Modal de confirmation suppression
    └── pages/
        ├── HomePage.jsx   # Page de liste des tâches
        ├── AddTaskPage.jsx# Page de création de tâche
        └── EditTaskPage.jsx# Page de modification de tâche
```

## 📦 Comment le projet fonctionne

- `src/services/taskService.js` utilise Axios pour communiquer avec `json-server`.
- `HomePage.jsx` récupère la liste des tâches, applique les filtres et gère la suppression.
- `AddTaskPage.jsx` et `EditTaskPage.jsx` utilisent `TaskForm.jsx` pour afficher le formulaire.
- `TaskForm.jsx` valide le titre et envoie les données au back-end.
- `DeleteModal.jsx` protège contre les suppressions accidentelles.

## 🔌 API REST utilisées

| Méthode | Endpoint        | Description                            |
|--------|-----------------|----------------------------------------|
| GET    | `/tasks`        | Récupère toutes les tâches             |
| POST   | `/tasks`        | Crée une nouvelle tâche                |
| PUT    | `/tasks/:id`    | Met à jour une tâche existante         |
| DELETE | `/tasks/:id`    | Supprime une tâche                     |

## ✨ Fonctionnalités principales

- Affichage des tâches avec état et description
- Filtres sur le statut
- Statistiques en temps réel par statut
- Formulaire de création et édition
- Confirmation avant suppression
- Gestion des erreurs et des états de chargement
- Design responsive et minimaliste

## 🛠️ Technologies utilisées

- React 18
- Vite
- React Router v6
- Axios
- json-server
- CSS personnalisé

## 💡 Améliorations possibles

- Ajouter une recherche de tâches
- Gérer la priorité et la date d'échéance
- Ajouter une authentification utilisateur
- Permettre le tri des tâches
- Passer à un vrai back-end 

## 📌 Remarques

- Les données sont stockées dans `db.json`.
- `json-server` sert de back-end local sans base de données réelle.
- Les tâches sont persistées localement tant que `db.json` n'est pas réinitialisé.
