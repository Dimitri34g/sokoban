import { MovableTile} from './MovableTile.js';
import { TileType } from './Tile.js';
export class Player extends MovableTile {

  constructor(x: number, y: number) {
    super(x, y, TileType.Player, 'blue', 'triangle');
  }

  /**
   * Indique si le joueur est praticable (walkable)
   * @returns false car le joueur n'est jamais praticable
   */
  public isWalkable(): boolean {
    return false;
  }
}
