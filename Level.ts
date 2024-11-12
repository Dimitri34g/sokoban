import { Tile } from './Tile';
import { Hole } from './Hole';
import { Rock } from './Rock';
import { Obstacle } from './Obstacle';

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
   * Initialise le niveau avec les éléments fournis
   */
  public initializeLevel(): void {
    // Implémenter la logique d'initialisation du niveau
  }

  /**
   * Vérifie si le niveau est complété (tous les trous sont remplis)
   * @returns true si le niveau est complété, sinon false
   */
  public isLevelComplete(): boolean {
    return this.holes.every(hole => hole.isFilled);
  }
}
