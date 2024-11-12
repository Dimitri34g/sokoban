import { Position } from './Position';

export class Move {
  public playerOldPosition: Position;
  public rockOldPosition: Position | null;

  constructor(playerOldPosition: Position, rockOldPosition: Position | null = null) {
    this.playerOldPosition = playerOldPosition;
    this.rockOldPosition = rockOldPosition;
  }

  /**
   * Inverse le mouvement effectué
   */
  public reverse(): void {
    // Implémenter la logique pour inverser le mouvement
  }
}
