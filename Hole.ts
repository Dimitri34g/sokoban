import { Tile, TileType } from './Tile';

export class Hole extends Tile {
  public isFilled: boolean;
  protected filledColor: string = 'darkbrown';

  constructor(x: number, y: number) {
    super(x, y, TileType.Hole, 'brown', 'circle');
    this.isFilled = false;
  }

  /**
   * Remplit le trou, le rendant praticable
   */
  public fill(): void {
    this.isFilled = true;
    this.updateVisualState();
  }

  /**
   * Met à jour l'état visuel du trou lorsqu'il est rempli
   */
  public updateVisualState(): void {
    if (this.isFilled) {
      this.color = this.filledColor;
    }
  }

  /**
   * Indique si le trou est praticable (walkable)
   * @returns true si le trou est rempli, sinon false
   */
  public isWalkable(): boolean {
    return this.isFilled;
  }
}
