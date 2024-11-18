import { MovableTile } from './MovableTile.js';
import { TileType } from './Tile.js';
export class Rock extends MovableTile {
    /**
     * Constructeur pour initialiser le rocher avec des valeurs par défaut.
     * @param x - La coordonnée x du rocher.
     * @param y - La coordonnée y du rocher.
     * @param game - Instance du jeu pour vérifier les règles de déplacement.
     */
    constructor(x, y, game) {
        super(x, y, 'gray', TileType.Rock);
        this.game = game;
    }
    /**
     * Pousse le rocher dans une direction donnée.
     * @param direction - La direction dans laquelle le rocher doit être poussé.
     * @returns `true` si le rocher a été poussé avec succès, sinon `false`.
     */
    push(direction) {
        const nextPosition = this.getNextPosition(direction);
        if (this.game.canMoveTo(nextPosition)) {
            this.move(direction);
            return true;
        }
        return false;
    }
}
