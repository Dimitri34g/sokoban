import Drawer from './Drawer';
import { Game } from './Game';

export class Display {
  private drawer: Drawer;

  constructor(width: number, height: number, scale: number = 10) {
    this.drawer = new Drawer(width, height, scale);
  }

  /**
   * Met à jour le score affiché
   */
  public refreshScore(): void {
    let score: HTMLElement | null = document.getElementById('score');
    if (score != null) score.innerHTML = '0';
  }

  /**
   * Dessine l'état actuel du jeu
   * @param game - L'instance du jeu à dessiner
   */
  public draw(game: Game): void {
    this.drawer.clear();
    // Logique pour dessiner les éléments du jeu sur le canvas
    // Exemple :
    // this.drawer.drawRectangle(game.player.x, game.player.y, 'blue');
  }
}
