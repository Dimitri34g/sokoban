import { Display } from './Display.js';
import { Level } from './Level.js';
import { Player } from './Player.js';
import { Rock } from './Rock.js';
import { Hole } from './Hole.js';
import { Position } from './Position.js';
import { Direction } from './MovableTile.js';
import { TileType } from './Tile.js';

export class Game {
  public width: number;
  public height: number;
  public display: Display;
  public currentLevel: Level;
  private score: number;
  private levelCount: number;

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
    this.levelCount = 1;
    this.currentLevel = this.createInitialLevel(2, 2);
  }

  /**
   * Crée un niveau du jeu avec des positions aléatoires et un nombre donné de rochers et de trous.
   * @param rockCount - Le nombre de rochers dans le niveau.
   * @param holeCount - Le nombre de trous dans le niveau.
   * @returns Une instance de `Level` représentant le niveau.
   */
  private createInitialLevel(rockCount: number, holeCount: number): Level {
    const rocks = Array.from({ length: rockCount }, () => new Rock(0, 0, this));
    const holes = Array.from({ length: holeCount }, () => new Hole(0, 0));
    const player = new Player(0, 0);
    return new Level(rocks, holes, player, this.width, this.height);
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
      this.levelCount++;
      const newRockCount = 2 + this.levelCount - 1;
      const newHoleCount = 2 + this.levelCount - 1;
      this.currentLevel = this.createInitialLevel(newRockCount, newHoleCount);
      this.currentLevel.initializeLevel();
      this.display.update();
      console.log("Niveau suivant commencé ! Score actuel :", this.score);
    }
  }

  /**
   * Vérifie si la tuile peut se déplacer à une position donnée.
   * @param position - La position cible.
   * @returns `true` si la position est à l'intérieur des limites de la grille, sinon `false`.
   */
  public canMoveTo(position: Position): boolean {
    const { x, y } = position;

    // Vérifier si la position est dans les limites de la grille
    return x >= 0 && x < this.width && y >= 0 && y < this.height;
  }

  /**
   * Retourne le type de tuile à une position donnée.
   * @param position - La position cible.
   * @returns Le type de la tuile à la position donnée ou null si aucune tuile n'est présente.
   */
  public getTileTypeAtPosition(position: Position): TileType | null {
    if (this.currentLevel.holes.some(hole => hole.hasSamePosition(position))) {
      return TileType.Hole;
    }
    if (this.currentLevel.rocks.some(rock => rock.hasSamePosition(position))) {
      return TileType.Rock;
    }
    if (this.currentLevel.player.hasSamePosition(position)) {
      return TileType.Player;
    }
    return null;
  }

  /**
   * Gère la boucle de jeu pour le déplacement du joueur.
   * @param direction - La direction dans laquelle le joueur souhaite se déplacer.
   */
  public gameLoop(direction: Direction): void {
    const player = this.currentLevel.player;
    const nextPosition = player.getNextPosition(direction);

    // Vérifier si le mouvement est à l'intérieur des limites de la grille
    if (!this.canMoveTo(nextPosition)) {
      return; // Mouvement non valide, on ne fait rien
    }

    // Vérifier le type de tuile à la prochaine position
    const tileType = this.getTileTypeAtPosition(nextPosition);

    if (tileType === TileType.Hole) {
      const hole = this.currentLevel.holes.find(hole => hole.hasSamePosition(nextPosition));
      if (hole && hole.isFilled()) {
        player.move(direction); // Le trou est rempli, le joueur peut se déplacer
      } else {
        return; // Le trou n'est pas rempli, le joueur ne peut pas s'y déplacer
      }
    } else if (tileType === TileType.Rock) {
      const rock = this.currentLevel.rocks.find(rock => rock.hasSamePosition(nextPosition));
      if (rock) {
        // Tenter de pousser le rocher
        if (rock.push(direction)) {
          player.move(direction); // Déplacer le joueur si le rocher a été poussé
        } else {
          return; // Si le rocher ne peut pas être poussé, on ne bouge pas
        }
      }
    } else if (tileType === null) {
      // La position est libre, on peut bouger
      player.move(direction);
    }

    // Vérifier si un rocher et un trou ont la même position
    this.currentLevel.rocks.forEach((rock, index) => {
      const correspondingHole = this.currentLevel.holes.find(hole => hole.hasSamePosition(rock));
      if (correspondingHole) {
        correspondingHole.fill(); // Remplir le trou
        this.currentLevel.rocks.splice(index, 1); // Retirer le rocher de la liste
      }
    });

    // Vérifier si le niveau est terminé et passer au niveau suivant si nécessaire
    if (this.currentLevel.isCompleted()) {
      this.nextLevel();
    }

    // Mise à jour de l'affichage après chaque action
    this.display.update();
  }
}
