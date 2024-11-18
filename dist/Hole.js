import { Tile, TileType } from './Tile.js';
export class Hole extends Tile {
    /**
     * Constructeur pour initialiser le trou avec des valeurs par défaut.
     * @param x - La coordonnée x du trou.
     * @param y - La coordonnée y du trou.
     */
    constructor(x, y) {
        super(x, y, 'black', TileType.Hole);
        this.filled = false;
    }
    /**
     * Vérifie si le trou est rempli.
     * @returns `true` si le trou est rempli, sinon `false`.
     */
    isFilled() {
        return this.filled;
    }
    /**
     * Remplit le trou et change la couleur en marron.
     */
    fill() {
        this.filled = true;
        this.setColor('brown');
    }
}
