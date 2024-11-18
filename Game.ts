import { Display } from './Display.js';
import { Level } from './Level.js';
import { Player } from './Player.js';
import { Rock } from './Rock.js';
import { Hole } from './Hole.js';

export class Game {
  public width: number;
  public height: number;
  public display: Display;
  public currentLevel: Level;
  private score: number;

  /**
   * Constructeur pour initialiser le jeu avec une largeur, une hauteur et une échelle.
   * @param width - La largeur du jeu.
   * @param height - La hauteur du jeu.
   * @param scale - L'échelle du jeu.
   */
  constructor(width: number, height: number, scale: number) {
    this.width = width;
    this.height = height;
    this.display = new Display(width, height, scale, this);
    this.score = 0;
    this.currentLevel = this.createInitialLevel();
  }

  /**
   * Crée le niveau initial du jeu.
   * @returns Une instance de `Level` représentant le niveau initial.
   */
  private createInitialLevel(): Level {
    const rocks = [new Rock(2, 3), new Rock(4, 5)];
    const holes = [new Hole(6, 7), new Hole(8, 9)];
    const player = new Player(0, 0);
    return new Level(rocks, holes, player);
  }

  /**
   * Démarre le jeu et initialise le niveau actuel.
   */
  public start(): void {
    this.currentLevel.initializeLevel();
    this.display.draw(this);
    console.log("Le jeu a démarré !");
  }

  /**
   * Passe au niveau suivant et augmente le score.
   */
  public nextLevel(): void {
    if (this.currentLevel.isCompleted()) {
      this.score++;
      this.currentLevel = this.createInitialLevel(); // Pour l'instant, créer un nouveau niveau similaire
      this.currentLevel.initializeLevel();
      this.display.update();
      console.log("Niveau suivant commencé ! Score actuel :", this.score);
    }
  }

  /**
   * Vérifie les collisions entre le joueur et les rochers/trous.
   */
  public checkCollision(): void {
    const playerPosition = this.currentLevel.player;

    // Vérifier si le joueur entre en collision avec un rocher
    this.currentLevel.rocks.forEach((rock) => {
      if (rock.hasSamePosition(playerPosition)) {
        console.log("Collision avec un rocher !");
      }
    });

    // Vérifier si le joueur atteint un trou
    this.currentLevel.holes.forEach((hole) => {
      if (hole.hasSamePosition(playerPosition) && !hole.isFilled()) {
        console.log("Le joueur a atteint un trou !");
        hole.fill();
        this.display.update();
      }
    });
  }
}
