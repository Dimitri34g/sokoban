# 🎮 Sokoban Game en TypeScript 🛠️

Bienvenue dans le jeu Sokoban ! Ceci est un jeu de puzzle classique implémenté en TypeScript, où le joueur pousse des rochers dans des trous pour compléter des niveaux. Vous trouverez ci-dessous un guide pour jouer au jeu, comprendre ses mécanismes et explorer la structure du code.

## 🔖 Table des Matières

- [📜 Introduction](#introduction)
- [🔥 Comment Jouer](#comment-jouer)
- [🛠️ Fonctionnalités du Jeu](#fonctionnalités-du-jeu)
- [📊 Structure du Code](#structure-du-code)
  - [👨‍💻 Classes et Leurs Rôles](#classes-et-leurs-rôles)
  - [⚙️ Méthodes Importantes](#méthodes-importantes)
- [🛠️ Comment Exécuter le Jeu](#comment-exécuter-le-jeu)
- [📦 Dépendances et Technologies Utilisées](#dépendances-et-technologies-utilisées)
- [🚀 Améliorations Futures](#améliorations-futures)
- [📝 Crédits](#crédits)

## 📜 Introduction

Sokoban est un jeu de puzzle dans lequel le joueur doit déplacer des rochers vers des emplacements spécifiques (des trous). L'objectif est de pousser tous les rochers dans les trous désignés, ce qui les remplira et permettra au joueur de passer au niveau suivant. Les niveaux deviennent progressivement plus difficiles, avec davantage de rochers et de trous à gérer.

## 🔥 Comment Jouer

1. **Contrôles de Mouvement** : Utilisez les touches flèches de votre clavier pour déplacer le joueur.
   - **⬆️ Flèche Haut** : Déplacer le joueur vers le haut.
   - **⬇️ Flèche Bas** : Déplacer le joueur vers le bas.
   - **⬅️ Flèche Gauche** : Déplacer le joueur vers la gauche.
   - **➡️ Flèche Droite** : Déplacer le joueur vers la droite.
2. **🎯 Objectif** : Poussez tous les rochers dans les trous pour compléter le niveau.
3. **🛂 Restrictions** : Les rochers ne peuvent être que poussés (pas tirés), et le joueur ou le rocher ne peuvent pas sortir des limites de la grille. Les rochers ne peuvent pas être poussés s'il y a un obstacle immédiat derrière eux.
4. **🏁 Fin du Niveau** : Une fois tous les trous remplis, vous passez au niveau suivant, qui comporte plus de rochers et de trous.

## 🛠️ Fonctionnalités du Jeu

- **💡 Multiples Niveaux** : Le jeu génère automatiquement de nouveaux niveaux avec une complexité croissante.
- **⚡ Obstacles Dynamiques** : Le joueur peut pousser plusieurs rochers en séquence s'ils sont bien alignés.
- **🛡️ Interactions Animées** : Chaque mouvement est visuellement mis à jour, et les trous changent de couleur lorsqu'ils sont remplis.

## 📊 Structure du Code

Le jeu est implémenté en TypeScript en utilisant une approche orientée objet, ce qui le rend modulaire et facile à comprendre.

### 👨‍💻 Classes et Leurs Rôles

Voici un résumé des principales classes utilisées dans le projet :

1. **`Position`** : Représente les coordonnées (`x`, `y`) des objets sur la grille du jeu.
2. **`Tile`** : Représente la tuile de base, étendue par tous les autres éléments du jeu.
3. **`MovableTile`** : Étend `Tile` pour ajouter des capacités de mouvement. Les rochers et les joueurs sont des exemples de tuiles mobiles.
4. **`Player`** : Étend `MovableTile` pour représenter le personnage du joueur.
5. **`Rock`** : Étend `MovableTile` pour représenter les rochers qui peuvent être poussés par le joueur.
6. **`Hole`** : Étend `Tile` pour représenter les trous. Les trous peuvent être remplis par des rochers, changeant ainsi leur état.
7. **`Level`** : Gère la collection de rochers, de trous et du joueur. Initialise les positions de tous les composants pour chaque niveau.
8. **`Game`** : Centralise la logique du jeu, y compris les actions du joueur, les mouvements, la détection des collisions, la progression des niveaux, et la boucle de jeu.
9. **`Display`** : Gère le rendu des éléments du jeu à l'écran.
10. **`Drawer`** : Gère les opérations de dessin de bas niveau, telles que le dessin de cercles et de rectangles.
11. **`Sokoban`** : Le point d'entrée du jeu, configurant la boucle de jeu et capturant les entrées de l'utilisateur.

### ⚙️ Méthodes Importantes

- **`gameLoop(direction: Direction)`** : Gère les actions du joueur pour chaque pression de touche, y compris le mouvement, la détection des collisions, et l'interaction entre les rochers et les trous.
- **`nextLevel()`** : Génère un nouveau niveau une fois que tous les rochers ont été placés dans les trous.
- **`canMoveTo(position: Position): boolean`** (dans `Game`) : Vérifie si une position donnée est dans les limites de la grille du jeu.
- **`fill()`** (dans `Hole`) : Remplit un trou lorsqu'un rocher y est déplacé et change sa couleur.
- **`push(direction: Direction)`** (dans `Rock`) : Gère la logique pour pousser plusieurs rochers.

## 🛠️ Comment Exécuter le Jeu

1. **Prérequis** : Assurez-vous d'avoir [Node.js](https://nodejs.org) installé.
2. **💻 Cloner le Répertoire** : Clonez le répertoire sur votre machine locale.
3. **🔧 Installer les Dépendances** : Exécutez `npm install` pour installer toutes les dépendances nécessaires.
4. **🚀 Construire le Projet** : Exécutez `npm run build` pour transpiler le code TypeScript en JavaScript.
5. **🌐 Démarrer le Jeu** : Ouvrez le fichier `index.html` dans votre navigateur pour commencer à jouer.

## 📦 Dépendances et Technologies Utilisées

- **HTML & Canvas** : Utilisé pour créer l'interface graphique du jeu.
- **TypeScript** : Utilisé pour organiser la logique du jeu de manière orientée objet.
- **CSS** : Utilisé pour styliser le jeu.

## 🚀 Améliorations Futures

- **Ajout de Niveaux de Difficulté** : Implémenter différents niveaux de vitesse pour rendre le jeu plus difficile au fur et à mesure de la progression.
- **Enregistrement des Scores** : Ajouter un classement des meilleurs scores pour encourager la compétition.
- **Mode Sans Fin** : Ajouter un mode où le joueur continue à pousser les rochers même après avoir rempli tous les trous, créant un effet "téléportation".

## 📝 Crédits

Développé par Dimitri Georgiadis, dans le cadre de la formation de Concepteur de Solutions Digitales.
