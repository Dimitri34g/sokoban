import { MovableTile, Direction } from './MovableTile';
import { TileType } from './Tile';
import { Rock } from './Rock';
import { Position } from './Position';
import { Game } from './Game';

export class Player extends MovableTile {
  private game: Game;

  constructor(x: number, y: number, game: Game) {
    super(x, y, TileType.Player, 'blue', 'triangle');
    this.game = game;
  }

  /**
   * Pousse un rocher dans une direction donnée
   * @param rock - Le rocher à pousser
   * @param direction - La direction dans laquelle pousser le rocher
   */
  public pushRock(rock: Rock, direction: Direction): void {
    const nextPosition = rock.getNextPosition(direction);
    if (this.game.isPositionFree(nextPosition)) {
      rock.move(direction);
    }
  }

  /**
   * Tire un rocher dans une direction donnée
   * @param rock - Le rocher à tirer
   * @param direction - La direction dans laquelle tirer le rocher
   */
  public pullRock(rock: Rock, direction: Direction): void {
    const playerNextPosition = this.getNextPosition(direction);
    const rockNextPosition = rock.getNextPosition(direction);

    if (playerNextPosition.hasSamePosition(rock.getPosition()) && this.game.isPositionFree(rockNextPosition)) {
      this.move(direction);
      rock.move(direction);
    }
  }

  /**
   * Indique si le joueur est praticable (walkable)
   * @returns false car le joueur n'est jamais praticable
   */
  public isWalkable(): boolean {
    return false;
  }
}
