import { Tile } from './Tile.js';
import { Hole } from './Hole.js';
import { Rock } from './Rock.js';
import { Obstacle } from './Obstacle.js';

export class Level {
  private grid: Tile[][];
  private holes: Hole[];
  private rocks: Rock[];
  private obstacles: Obstacle[];

  constructor(grid: Tile[][], holes: Hole[], rocks: Rock[], obstacles: Obstacle[]) {
    this.grid = grid;
    this.holes = holes;
    this.rocks = rocks;
    this.obstacles = obstacles;
  }

  /**
   * Getter pour la grille du niveau
   * @returns La grille du niveau
   */
  public getGrid(): Tile[][] {
    return this.grid;
  }

  /**
   * Getter pour les trous du niveau
   * @returns La liste des trous
   */
  public getHoles(): Hole[] {
    return this.holes;
  }

  /**
   * Getter pour les rochers du niveau
   * @returns La liste des rochers
   */
  public getRocks(): Rock[] {
    return this.rocks;
  }

  /**
   * Getter pour les obstacles du niveau
   * @returns La liste des obstacles
   */
  public getObstacles(): Obstacle[] {
    return this.obstacles;
  }

  /**
   * Initialise le niveau avec les éléments fournis
   */
  public initializeLevel(): void {
    // Logique d'initialisation, par exemple définir les positions initiales des tuiles
    this.holes.forEach(hole => hole.setInitialPosition(hole.x, hole.y));
    this.rocks.forEach(rock => rock.setInitialPosition(rock.x, rock.y));
    this.obstacles.forEach(obstacle => obstacle.setInitialPosition(obstacle.x, obstacle.y));
  }

  /**
   * Vérifie si le niveau est complété (tous les trous sont remplis)
   * @returns true si le niveau est complété, sinon false
   */
  public isLevelComplete(): boolean {
    return this.holes.every(hole => hole.isFilled);
  }
}
