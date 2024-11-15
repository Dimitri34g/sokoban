import { Tile, TileType } from './Tile.js';
import { Position } from './Position.js';

export abstract class MovableTile extends Tile {
  constructor(x: number, y: number, type: TileType, color: string, shape: string) {
    super(x, y, type, color, shape);
  }

  /**
   * Déplace la tuile mobile dans une direction donnée
   * @param direction - La direction du déplacement (haut, bas, gauche, droite)
   */
  public move(direction: Direction): void {
    const nextPosition = this.getNextPosition(direction);
    this.x = nextPosition.x;
    this.y = nextPosition.y;
  }

  /**
   * Obtient la prochaine position basée sur la direction donnée
   * @param direction - La direction du déplacement
   * @returns La nouvelle position après le déplacement
   */
  public getNextPosition(direction: Direction): Position {
    let newX = this.x;
    let newY = this.y;

    switch (direction) {
      case Direction.UP:
        newY -= 1;
        break;
      case Direction.DOWN:
        newY += 1;
        break;
      case Direction.LEFT:
        newX -= 1;
        break;
      case Direction.RIGHT:
        newX += 1;
        break;
    }

    return new Position(newX, newY);
  }
}

export enum Direction {
  UP = 'UP',
  DOWN = 'DOWN',
  LEFT = 'LEFT',
  RIGHT = 'RIGHT'
}
