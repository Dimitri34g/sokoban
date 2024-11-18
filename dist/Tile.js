import { Position } from './Position.js';
export var TileType;
(function (TileType) {
    TileType["Hole"] = "Hole";
    TileType["Rock"] = "Rock";
    TileType["Player"] = "Player";
})(TileType || (TileType = {}));
export class Tile extends Position {
    /**
     * Constructeur pour initialiser la tuile avec une position, une couleur, une forme et un type.
     * @param x - La coordonnée x de la tuile.
     * @param y - La coordonnée y de la tuile.
     * @param color - La couleur de la tuile.
     * @param type - Le type de la tuile.
     */
    constructor(x, y, color, type) {
        super(x, y);
        this.color = color;
        this.type = type;
    }
    /**
     * Retourne le type de la tuile si la position correspond à celle fournie.
     * @param position - La position à comparer avec la position actuelle de la tuile.
     * @returns Le type de la tuile si les positions correspondent, sinon `null`.
     */
    getTileTypeAtPosition(position) {
        if (this.hasSamePosition(position)) {
            return this.type;
        }
        return null;
    }
    /**
     * Retourne la couleur de la tuile.
     * @returns La couleur de la tuile.
     */
    getColor() {
        return this.color;
    }
    setColor(color) {
        this.color = color;
    }
}
