import { Position } from './Position';
import { Player } from './Player';
import { Rock } from './Rock';

export class Move {
  public playerOldPosition: Position;
  public rockOldPosition: Position | null;

  constructor(playerOldPosition: Position, rockOldPosition: Position | null = null) {
    this.playerOldPosition = playerOldPosition;
    this.rockOldPosition = rockOldPosition;
  }

  /**
   * Inverse le mouvement effectué
   * @param player - Le joueur dont la position doit être restaurée
   * @param rock - Le rocher dont la position doit être restaurée, s'il y en a un
   */
  public reverse(player: Player, rock: Rock | null = null): void {
    player.setInitialPosition(this.playerOldPosition.x, this.playerOldPosition.y);
    if (rock && this.rockOldPosition) {
      rock.setInitialPosition(this.rockOldPosition.x, this.rockOldPosition.y);
    }
  }
}
