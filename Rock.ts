import { MovableTile } from './MovableTile.js';
import { TileType } from './Tile.js';
import { Hole } from './Hole.js';

export class Rock extends MovableTile {
  protected isInHole: boolean;
  
  constructor(x: number, y: number) {
    super(x, y, TileType.Rock, 'grey', 'square');
    this.isInHole = false;
  }

  /**
   * Indique si le rocher est praticable (walkable)
   * @returns true si le rocher est dans un trou, sinon false
   */
  public isWalkable(): boolean {
    return this.isInHole;
  }
  
  /**
   * Vérifie si le rocher est dans un trou et met à jour son état
   * @param holes - La liste des trous du niveau
   */
  public checkIfInHole(holes: Hole[]): void {
    for (const hole of holes) {
      if (hole.hasSamePosition(this)) {
        hole.fill();
        this.isInHole = true; // Le rocher est dans un trou
        break;
      }
    }
  }
}
