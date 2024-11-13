import Drawer from './Drawer';
import { Game } from './Game';
import { Player } from './Player';
import { Rock } from './Rock';
import { Hole } from './Hole';
import { Obstacle } from './Obstacle';

export class Display {
  private drawer: Drawer;

  constructor(width: number, height: number, scale: number = 10) {
    this.drawer = new Drawer(width, height, scale);
  }

  /**
   * Met à jour le score affiché
   */
  public refreshScore(scoreValue: number): void {
    let score: HTMLElement | null = document.getElementById('score');
    if (score != null) score.innerHTML = scoreValue.toString();
  }

  /**
   * Dessine l'état actuel du jeu
   * @param game - L'instance du jeu à dessiner
   */
  public draw(game: Game): void {
    this.drawer.clear();

    // Dessiner le joueur
    const player = game.getPlayer();
    this.drawer.drawRectangle(player.getPosition().x, player.getPosition().y, 'blue');

    // Dessiner les rochers
    const rocks: Rock[] = game.getRocks();
    rocks.forEach(rock => {
      this.drawer.drawRectangle(rock.getPosition().x, rock.getPosition().y, 'grey');
    });

    // Dessiner les trous
    const holes: Hole[] = game.getHoles();
    holes.forEach(hole => {
      const color = hole.isFilled ? 'darkbrown' : 'black';
      this.drawer.drawRectangle(hole.getPosition().x, hole.getPosition().y, color);
    });

    // Dessiner les obstacles
    const obstacles: Obstacle[] = game.getObstacles();
    obstacles.forEach(obstacle => {
      this.drawer.drawRectangle(obstacle.getPosition().x, obstacle.getPosition().y, 'green');
    });
  }
}
