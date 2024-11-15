import { Position } from './Position.js';

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
   * Définit la position initiale de la tuile
   * @param x - La coordonnée x
   * @param y - La coordonnée y
   */
  public setInitialPosition(x: number, y: number): void {
    this.x = x;
    this.y = y;
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