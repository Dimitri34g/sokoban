import { Display } from './Display';
import { Level } from './Level';
import { Player } from './Player';
import { Rock } from './Rock';
import { Obstacle } from './Obstacle';
import { Hole } from './Hole';
import { Direction } from './MovableTile';
import { Position } from './Position';
import { MoveHistory } from './MoveHistory';
import { GameState } from './GameState';
import { TileType } from './Tile';

export class Game {
  private currentLevel: number;
  private levels: Level[];
  private player: Player;
  private rocks: Rock[];
  private holes: Hole[];
  private obstacles: Obstacle[];
  private isGameRunning: boolean;
  private score: number;
  private display: Display;
  private moveHistory: MoveHistory;

  constructor(levels: Level[], display: Display) {
    this.levels = levels;
    this.display = display;
    this.currentLevel = 0;
    this.player = new Player(0, 0, this); // Position initiale par défaut
    this.rocks = [];
    this.holes = [];
    this.obstacles = [];
    this.isGameRunning = true;
    this.score = 0;
    this.moveHistory = new MoveHistory(10); // Par exemple, maxUndo = 10
  }

  /**
   * Démarre le jeu
   */
  public start(): void {
    this.loadLevel(this.currentLevel);
    this.display.draw(this);
    this.gameLoop();
  }

  /**
   * Boucle de jeu principale
   */
  private gameLoop(): void {
    const gameInterval = setInterval(() => {
      if (!this.isGameRunning) {
        clearInterval(gameInterval);
        return;
      }

      // Mise à jour de l'affichage et vérification des conditions de fin de jeu
      this.display.draw(this);

      if (this.isGameComplete()) {
        this.endGame();
        clearInterval(gameInterval);
      }
    }, 100); // Mise à jour toutes les 100 ms
  }

  /**
   * Redémarre le jeu
   */
  public restart(): void {
    this.loadLevel(this.currentLevel);
    this.isGameRunning = true;
    this.score = 0;
    this.moveHistory = new MoveHistory(10);
    this.display.draw(this);
    this.gameLoop();
  }

  /**
   * Charge un niveau spécifique
   * @param level - Le numéro du niveau à charger
   */
  public loadLevel(level: number): void {
    const currentLevelData = this.levels[level];
    this.player = new Player(currentLevelData.getGrid()[0][0].x, currentLevelData.getGrid()[0][0].y, this);
    this.rocks = currentLevelData.getRocks().map(rockData => new Rock(rockData.x, rockData.y, this));
    this.holes = currentLevelData.getHoles();
    this.obstacles = currentLevelData.getObstacles();
    this.display.draw(this);
  }

  /**
   * Vérifie si le jeu est terminé (tous les trous sont remplis)
   * @returns true si le jeu est terminé, sinon false
   */
  public isGameComplete(): boolean {
    return this.holes.every(hole => hole.isFilled);
  }

  /**
   * Annule le dernier mouvement
   */
  public undoLastMove(): void {
    if (this.moveHistory.canUndo()) {
      const lastMove = this.moveHistory.undoMove();
      // Logique pour annuler le mouvement du joueur et/ou des rochers
      this.display.draw(this);
    }
  }

  /**
   * Déplace le joueur dans une direction donnée
   * @param direction - La direction dans laquelle déplacer le joueur
   */
  public movePlayer(direction: Direction): void {
    const nextPosition = this.player.getNextPosition(direction);
    if (this.isWithinBounds(nextPosition) && this.isPositionFree(nextPosition)) {
      this.player.move(direction);
      this.display.draw(this);  // Mise à jour de l'affichage après le déplacement
    } else {
      console.log("Déplacement invalide : hors des limites ou position occupée");
    }
  }

  /**
   * Vérifie si une position est dans les limites de la grille
   * @param position - La position à vérifier
   * @returns true si la position est dans les limites, sinon false
   */
  public isWithinBounds(position: Position): boolean {
    return position.x >= 0 && position.x < this.levels[this.currentLevel].getGrid()[0].length &&
           position.y >= 0 && position.y < this.levels[this.currentLevel].getGrid().length;
  }

  /**
   * Récupère un rocher à une position donnée
   * @param position - La position à vérifier
   * @returns Le rocher à la position donnée, ou null s'il n'y en a pas
   */
  public getRockAtPosition(position: Position): Rock | null {
    return this.rocks.find(rock => rock.hasSamePosition(position)) || null;
  }

  /**
   * Vérifie si une position est libre (sans obstacle ni rocher)
   * @param position - La position à vérifier
   * @returns true si la position est libre, sinon false
   */
  public isPositionFree(position: Position): boolean {
    return !this.obstacles.some(obstacle => obstacle.hasSamePosition(position)) &&
           !this.rocks.some(rock => rock.hasSamePosition(position)) &&
           !this.holes.some(hole => hole.hasSamePosition(position) && !hole.isFilled);
  }

  /**
   * Récupère le type de la tuile à une position donnée
   * @param position - La position à vérifier
   * @returns Le type de la tuile à la position donnée, ou null s'il n'y a aucune tuile
   */
  public getTileTypeAtPosition(position: Position): TileType | null {
    if (this.player.hasSamePosition(position)) {
      return this.player.type;
    }

    for (const rock of this.rocks) {
      if (rock.hasSamePosition(position)) {
        return rock.type;
      }
    }

    for (const obstacle of this.obstacles) {
      if (obstacle.hasSamePosition(position)) {
        return obstacle.type;
      }
    }

    for (const hole of this.holes) {
      if (hole.hasSamePosition(position)) {
        return hole.type;
      }
    }

    return null; // Si aucune tuile ne se trouve à cette position
  }

  /**
   * Termine le jeu si tous les trous sont remplis
   */
  public endGame(): void {
    this.isGameRunning = false;
    console.log(`Le jeu est terminé ! ${this.holes.filter(hole => hole.isFilled).length}/${this.holes.length} trous sont remplis.`);
    alert(`Félicitations ! Vous avez complété le niveau. ${this.holes.filter(hole => hole.isFilled).length}/${this.holes.length} trous sont remplis.`);
  }

  /**
   * Calcule le score actuel basé sur le nombre de trous remplis
   * @returns Le score actuel
   */
  public calculateScore(): number {
    const filledHoles = this.holes.filter(hole => hole.isFilled).length;
    this.score = Math.round((filledHoles / this.holes.length) * 100);
    return this.score;
  }

  /**
   * Sauvegarde l'état actuel du jeu
   */
  public saveGame(): void {
    const gameState = new GameState(this.currentLevel, this.player, this.rocks, this.holes);
    localStorage.setItem('savedGameState', JSON.stringify(gameState));
  }

  /**
   * Charge un état de jeu sauvegardé
   */
  public loadGame(): void {
    const savedGame = localStorage.getItem('savedGameState');
    if (savedGame) {
      const gameState: GameState = JSON.parse(savedGame);
      this.currentLevel = gameState.levelNumber;
      this.player = new Player(gameState.playerPosition.x, gameState.playerPosition.y, this);
      this.rocks = gameState.rockPositions.map(pos => new Rock(pos.x, pos.y, this));
      this.holes = gameState.holeStates.map(holeState => {
        const hole = new Hole(holeState.position.x, holeState.position.y);
        hole.isFilled = holeState.isFilled;
        return hole;
      });
      this.display.draw(this);
    }
  }

  /**
   * Getter pour le joueur
   * @returns L'instance du joueur
   */
  public getPlayer(): Player {
    return this.player;
  }

  /**
   * Getter pour les rochers
   * @returns Un tableau de rochers
   */
  public getRocks(): Rock[] {
    return this.rocks;
  }

  /**
   * Getter pour les trous
   * @returns Un tableau de trous
   */
  public getHoles(): Hole[] {
    return this.holes;
  }

  /**
   * Getter pour les obstacles
   * @returns Un tableau d'obstacles
   */
  public getObstacles(): Obstacle[] {
    return this.obstacles;
  }
}
