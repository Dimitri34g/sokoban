import { Position } from './Position';
import { Player } from './Player';
import { Rock } from './Rock';
import { Hole } from './Hole';

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
