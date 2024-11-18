import { Display } from './Display.js';
import { Level } from './Level.js';
import { Player } from './Player.js';
import { Rock } from './Rock.js';
import { Hole } from './Hole.js';
import { TileType } from './Tile.js';
export class Game {
    /**
     * Constructeur pour initialiser le jeu avec une largeur, une hauteur et une échelle.
     * @param width - La largeur du jeu.
     * @param height - La hauteur du jeu.
     * @param scale - L'échelle du jeu.
     */
    constructor(width, height, scale) {
        this.width = width;
        this.height = height;
        this.display = new Display(width, height, scale, this);
        this.score = 0;
        this.levelCount = 1;
        this.currentLevel = this.createInitialLevel(2, 2);
    }
    /**
     * Crée un niveau du jeu avec des positions aléatoires et un nombre donné de rochers et de trous.
     * @param rockCount - Le nombre de rochers dans le niveau.
     * @param holeCount - Le nombre de trous dans le niveau.
     * @returns Une instance de `Level` représentant le niveau.
     */
    createInitialLevel(rockCount, holeCount) {
        const rocks = Array.from({ length: rockCount }, () => new Rock(0, 0, this));
        const holes = Array.from({ length: holeCount }, () => new Hole(0, 0));
        const player = new Player(0, 0);
        return new Level(rocks, holes, player, this.width, this.height);
    }
    /**
     * Démarre le jeu et initialise le niveau actuel.
     */
    start() {
        this.currentLevel.initializeLevel();
        this.display.draw(this);
        console.log("Le jeu a démarré !");
    }
    /**
     * Passe au niveau suivant et augmente le score.
     */
    nextLevel() {
        if (this.currentLevel.isCompleted()) {
            this.score++;
            this.levelCount++;
            const newRockCount = 2 + this.levelCount - 1;
            const newHoleCount = 2 + this.levelCount - 1;
            this.currentLevel = this.createInitialLevel(newRockCount, newHoleCount);
            this.currentLevel.initializeLevel();
            this.display.update();
            console.log("Niveau suivant commencé ! Score actuel :", this.score);
        }
    }
    /**
     * Vérifie si la tuile peut se déplacer à une position donnée.
     * @param position - La position cible.
     * @returns `true` si la position est à l'intérieur des limites de la grille, sinon `false`.
     */
    canMoveTo(position) {
        const { x, y } = position;
        // Vérifier si la position est dans les limites de la grille
        return x >= 0 && x < this.width && y >= 0 && y < this.height;
    }
    /**
     * Retourne le type de tuile à une position donnée.
     * @param position - La position cible.
     * @returns Le type de la tuile à la position donnée ou null si aucune tuile n'est présente.
     */
    getTileTypeAtPosition(position) {
        if (this.currentLevel.holes.some(hole => hole.hasSamePosition(position))) {
            return TileType.Hole;
        }
        if (this.currentLevel.rocks.some(rock => rock.hasSamePosition(position))) {
            return TileType.Rock;
        }
        if (this.currentLevel.player.hasSamePosition(position)) {
            return TileType.Player;
        }
        return null;
    }
    gameLoop(direction) {
        var _a, _b;
        const player = this.currentLevel.player;
        const nextPosition = player.getNextPosition(direction);
        // Vérifier si le mouvement est à l'intérieur des limites de la grille
        if (!this.canMoveTo(nextPosition)) {
            return; // Mouvement non valide, on ne fait rien
        }
        // Vérifier le type de tuile à la prochaine position
        let tileType = this.getTileTypeAtPosition(nextPosition);
        if (tileType === TileType.Hole) {
            const hole = this.currentLevel.holes.find(hole => hole.hasSamePosition(nextPosition));
            if (hole && hole.isFilled()) {
                player.move(direction); // Le trou est rempli, le joueur peut se déplacer
            }
            else {
                return; // Le trou n'est pas rempli, le joueur ne peut pas s'y déplacer
            }
        }
        else if (tileType === TileType.Rock) {
            let currentRock = (_a = this.currentLevel.rocks.find(rock => rock.hasSamePosition(nextPosition))) !== null && _a !== void 0 ? _a : null;
            let rocksToPush = [];
            // Boucle pour collecter tous les rochers alignés
            while (currentRock) {
                rocksToPush.push(currentRock);
                const nextRockPosition = currentRock.getNextPosition(direction);
                // Vérifier si la prochaine position est dans les limites et si un autre rocher est présent
                if (!this.canMoveTo(nextRockPosition)) {
                    return; // Mouvement non valide, on ne fait rien
                }
                tileType = this.getTileTypeAtPosition(nextRockPosition);
                if (tileType === TileType.Rock) {
                    currentRock = (_b = this.currentLevel.rocks.find(rock => rock.hasSamePosition(nextRockPosition))) !== null && _b !== void 0 ? _b : null;
                }
                else if (tileType === TileType.Hole) {
                    currentRock = null; // Le trou est libre pour le rocher
                }
                else if (tileType === null) {
                    currentRock = null; // Fin de la chaîne de rochers, la prochaine position est libre
                }
                else {
                    return; // Un obstacle est rencontré (autre que rocher ou case vide), on ne peut pas pousser
                }
            }
            // Si toutes les positions suivantes sont libres ou des trous, déplacer les rochers
            if (tileType === null || tileType === TileType.Hole) {
                // Déplacer tous les rochers dans l'ordre inverse pour éviter les conflits de position
                for (let i = rocksToPush.length - 1; i >= 0; i--) {
                    rocksToPush[i].move(direction);
                    // Vérifier si le rocher est sur un trou après avoir été déplacé
                    const correspondingHole = this.currentLevel.holes.find(hole => hole.hasSamePosition(rocksToPush[i]));
                    if (correspondingHole && !correspondingHole.isFilled()) {
                        correspondingHole.fill(); // Remplir le trou
                        this.currentLevel.rocks.splice(this.currentLevel.rocks.indexOf(rocksToPush[i]), 1); // Retirer le rocher de la liste
                    }
                }
                player.move(direction); // Déplacer le joueur après avoir déplacé les rochers
            }
        }
        else if (tileType === null) {
            // La position est libre, on peut bouger
            player.move(direction);
        }
        // Mise à jour de l'affichage après chaque action
        this.display.update();
        // Vérifier si le niveau est terminé et passer au niveau suivant si nécessaire
        if (this.currentLevel.isCompleted()) {
            this.nextLevel();
        }
    }
}
