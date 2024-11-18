import { Position } from './Position.js';

export enum TileType {
    Hole = 'Hole',
    Rock = 'Rock',
    Player = 'Player'
}

export class Tile extends Position {
    private color: string;
    public type: TileType;

    /**
     * Constructeur pour initialiser la tuile avec une position, une couleur, une forme et un type.
     * @param x - La coordonnée x de la tuile.
     * @param y - La coordonnée y de la tuile.
     * @param color - La couleur de la tuile.
     * @param type - Le type de la tuile.
     */
    constructor(x: number, y: number, color: string, type: TileType) {
        super(x, y);
        this.color = color;
        this.type = type;
    }

    /**
     * Retourne le type de la tuile si la position correspond à celle fournie.
     * @param position - La position à comparer avec la position actuelle de la tuile.
     * @returns Le type de la tuile si les positions correspondent, sinon `null`.
     */
    public getTileTypeAtPosition(position: Position): TileType | null {
        if (this.hasSamePosition(position)) {
            return this.type;
        }
        return null;
    }

    /**
     * Retourne la couleur de la tuile.
     * @returns La couleur de la tuile.
     */
    public getColor(): string {
        return this.color;
    }

    setColor(color: string): void {
        this.color = color;

    }
}
