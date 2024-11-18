import { Tile,TileType } from './Tile.js';

export class Hole extends Tile {
  private filled: boolean;

  /**
   * Constructeur pour initialiser le trou avec des valeurs par défaut.
   * @param x - La coordonnée x du trou.
   * @param y - La coordonnée y du trou.
   */
  constructor(x: number, y: number) {
    super(x, y, 'black', TileType.Hole);
    this.filled = false;
  }

  /**
   * Vérifie si le trou est rempli.
   * @returns `true` si le trou est rempli, sinon `false`.
   */
  public isFilled(): boolean {
    return this.filled;
  }

  /**
   * Remplit le trou et change la couleur en marron.
   */
  public fill(): void {
    this.filled = true;
    this.setColor('brown');
  }
}
