import { MovableTile } from './MovableTile.js';
import { TileType } from './Tile.js';
export class Player extends MovableTile {
    /**
     * Constructeur pour initialiser le joueur avec des valeurs par défaut.
     * @param x - La coordonnée x du joueur.
     * @param y - La coordonnée y du joueur.
     */
    constructor(x, y) {
        super(x, y, 'red', TileType.Player);
    }
    /**
     * Déplace le joueur dans une direction donnée.
     * @param direction - La direction dans laquelle le joueur doit être déplacé.
     */
    movePlayer(direction) {
        this.move(direction);
    }
}