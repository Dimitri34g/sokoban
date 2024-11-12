import { Tile, TileType } from './Tile';

export abstract class MovableTile extends Tile {
  constructor(x: number, y: number, type: TileType, color: string, shape: string) {
    super(x, y, type, color, shape);
  }

  /**
   * Déplace la tuile mobile dans une direction donnée
   * @param direction - La direction du déplacement (haut, bas, gauche, droite)
   */
  public move(direction: Direction): void {
    switch (direction) {
      case Direction.UP:
        this.y -= 1;
        break;
      case Direction.DOWN:
        this.y += 1;
        break;
      case Direction.LEFT:
        this.x -= 1;
        break;
      case Direction.RIGHT:
        this.x += 1;
        break;
    }
  }
}

export enum Direction {
  UP = 'UP',
  DOWN = 'DOWN',
  LEFT = 'LEFT',
  RIGHT = 'RIGHT'
}
