import { Game } from './Game';

export class Sokoban {
  private game: Game;

  constructor() {
    this.game = new Game(50, 50, 10);
    this.startGame();
  }

  /**
   * Démarre le jeu Sokoban
   */
  private startGame(): void {
    this.game.start();
  }
}

// Initialiser Sokoban
const sokoban = new Sokoban();
