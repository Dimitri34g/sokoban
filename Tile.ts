import { Position } from './Position';

export abstract class Tile extends Position {
  public type: TileType;
  public color: string;
  public shape: string;

  constructor(x: number, y: number, type: TileType, color: string, shape: string) {
    super(x, y);
    this.type = type;
    this.color = color;
    this.shape = shape;
  }

  /**
   * Indique si la tuile est praticable (walkable)
   * @returns true si la tuile est praticable, sinon false
   */
  public abstract isWalkable(): boolean;
}

export enum TileType {
  Hole = 'Hole',
  Obstacle = 'Obstacle',
  Rock = 'Rock',
  Player = 'Player'
}
