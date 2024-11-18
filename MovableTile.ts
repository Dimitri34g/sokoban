import { Tile } from './Tile.js';
import { Position } from './Position.js';

export enum Direction {
    UP = 'UP',
    DOWN = 'DOWN',
    LEFT = 'LEFT',
    RIGHT = 'RIGHT'
  }
  
  export class MovableTile extends Tile {
    /**
     * Déplace la tuile dans une direction donnée.
     * @param direction - La direction dans laquelle la tuile doit être déplacée.
     */
    public move(direction: Direction): void {
      const nextPosition = this.getNextPosition(direction);
      this.setPosition(nextPosition.x, nextPosition.y);
    }
  
    /**
     * Retourne la prochaine position en fonction de la direction donnée.
     * @param direction - La direction dans laquelle la tuile doit se déplacer.
     * @returns La prochaine position de la tuile.
     */
    public getNextPosition(direction: Direction): Position {
      let { x, y } = this.getPosition();
      switch (direction) {
        case Direction.UP:
          y -= 1;
          break;
        case Direction.DOWN:
          y += 1;
          break;
        case Direction.LEFT:
          x -= 1;
          break;
        case Direction.RIGHT:
          x += 1;
          break;
      }
      return new Position(x, y);
    }
  }