import { Tile, TileType } from './Tile';

export class Obstacle extends Tile {
  constructor(x: number, y: number) {
    super(x, y, TileType.Obstacle, 'black', 'square');
  }

  /**
   * Indique si l'obstacle est praticable (walkable)
   * @returns false car un obstacle n'est jamais praticable
   */
  public isWalkable(): boolean {
    return false;
  }
}
