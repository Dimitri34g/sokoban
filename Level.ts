import { Rock } from './Rock.js';
import { Hole } from './Hole.js';
import { Player } from './Player.js';
import { Position } from './Position.js';

export class Level {
  public rocks: Rock[];
  public holes: Hole[];
  public player: Player;
  public width: number;
  public height: number;

  constructor(rocks: Rock[], holes: Hole[], player: Player, width: number, height: number) {
    this.rocks = rocks;
    this.holes = holes;
    this.player = player;
    this.width = width;
    this.height = height;
  }

  /**
   * Initialise le niveau en plaçant les rochers, les trous et le joueur à des positions aléatoires.
   */
  public initializeLevel(): void {
    const occupiedPositions = new Set<string>();

    // Génère une position aléatoire valide pour chaque entité
    const generateRandomPosition = (minX: number, maxX: number, minY: number, maxY: number): Position => {
      let x, y;
      do {
        x = Math.floor(Math.random() * (maxX - minX + 1)) + minX;
        y = Math.floor(Math.random() * (maxY - minY + 1)) + minY;
      } while (occupiedPositions.has(`${x},${y}`));
      occupiedPositions.add(`${x},${y}`);
      return new Position(x, y);
    };

    // Placer le joueur aléatoirement dans la grille (sans restriction particulière)
    const playerPosition = generateRandomPosition(0, this.width - 1, 0, this.height - 1);
    this.player.setPosition(playerPosition.x, playerPosition.y);

    // Placer chaque rocher à une position aléatoire dans la grille, à au moins une case du bord
    this.rocks.forEach((rock) => {
      const rockPosition = generateRandomPosition(1, this.width - 2, 1, this.height - 2);
      rock.setPosition(rockPosition.x, rockPosition.y);
    });

    // Placer chaque trou à une position aléatoire dans la grille (aucune restriction particulière)
    this.holes.forEach((hole) => {
      const holePosition = generateRandomPosition(0, this.width - 1, 0, this.height - 1);
      hole.setPosition(holePosition.x, holePosition.y);
    });

    console.log('Niveau initialisé avec le joueur, les rochers et les trous.');
  }
  /**
   * Vérifie si tous les trous du niveau sont remplis.
   * @returns `true` si tous les trous sont remplis, sinon `false`.
   */
  public isCompleted(): boolean {
    return this.holes.every(hole => hole.isFilled());
  }
}
