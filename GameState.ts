import { Position } from './Position.js';
import { Player } from './Player.js';
import { Rock } from './Rock.js';
import { Hole } from './Hole.js';

export class GameState {
  public levelNumber: number;
  public playerPosition: Position;
  public rockPositions: Position[];
  public holeStates: { position: Position; isFilled: boolean }[];

  constructor(levelNumber: number, player: Player, rocks: Rock[], holes: Hole[]) {
    this.levelNumber = levelNumber;
    this.playerPosition = new Position(player.x, player.y);
    this.rockPositions = rocks.map(rock => new Position(rock.x, rock.y));
    this.holeStates = holes.map(hole => ({
      position: new Position(hole.x, hole.y),
      isFilled: hole.isFilled,
    }));
  }
}
