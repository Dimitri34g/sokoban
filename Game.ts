import { Display } from './Display';
import { Level } from './Level';
import { Player } from './Player';
import { Rock } from './Rock';
import { Obstacle } from './Obstacle';
import { Direction } from './MovableTile';
import { Position } from './Position';
import { MoveHistory } from './MoveHistory';
import { GameState } from './GameState';

export class Game {
  private currentLevel: number;
  private levels: Level[];
  private player: Player;
  private rocks: Rock[];
  private obstacles: Obstacle[];
  private isGameRunning: boolean;
  private score: number;
  private display: Display;
  private moveHistory: MoveHistory;

  constructor(levels: Level[], display: Display) {
    this.levels = levels;
    this.display = display;
    this.currentLevel = 0;
    this.player = new Player(0, 0); // Position initiale par défaut
    this.rocks = [];
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
  }

  /**
   * Charge un niveau spécifique
   * @param level - Le numéro du niveau à charger
   */
  public loadLevel(level: number): void {
    const currentLevelData = this.levels[level];
    this.player = new Player(currentLevelData.grid[0][0].x, currentLevelData.grid[0][0].y);
    this.rocks = currentLevelData.rocks;
    this.obstacles = currentLevelData.obstacles;
    this.display.draw(this);
  }

  /**
   * Vérifie si le jeu est terminé (tous les trous sont remplis)
   * @returns true si le jeu est terminé, sinon false
   */
  public isGameComplete(): boolean {
    return this.levels[this.currentLevel].isLevelComplete();
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
    // Logique pour déplacer le joueur et pousser des rochers si nécessaire
    this.display.draw(this);
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
           !this.rocks.some(rock => rock.hasSamePosition(position));
  }

  /**
   * Termine le jeu
   */
  public endGame(): void {
    this.isGameRunning = false;
    console.log('Le jeu est terminé !');
  }

  /**
   * Calcule le score actuel
   * @returns Le score actuel
   */
  public calculateScore(): number {
    return this.score; // Logique pour calculer le score si nécessaire
  }

  /**
   * Sauvegarde l'état actuel du jeu
   */
  public saveGame(): void {
    const gameState = new GameState(this.currentLevel, this.player, this.rocks, this.levels[this.currentLevel].holes);
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
      this.player = new Player(gameState.playerPosition.x, gameState.playerPosition.y);
      this.rocks = gameState.rockPositions.map(pos => new Rock(pos.x, pos.y));
      this.levels[this.currentLevel].holes.forEach(hole => {
        const savedHole = gameState.holeStates.find(h => h.position.hasSamePosition(hole));
        if (savedHole) {
          hole.isFilled = savedHole.isFilled;
        }
      });
      this.display.draw(this);
    }
  }
}
