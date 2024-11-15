import { Display } from './Display.js';
import { Level } from './Level.js';
import { Player } from './Player.js';
import { Rock } from './Rock.js';
import { Obstacle } from './Obstacle.js';
import { Hole } from './Hole.js';
import { Direction } from './MovableTile.js';
import { Position } from './Position.js';
import { MoveHistory } from './MoveHistory.js';
import { GameState } from './GameState.js';
import { TileType } from './Tile.js';
import { Move } from './Move.js';

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
    this.player = new Player(0, 0); // Position initiale par défaut
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
   * @param direction - La direction dans laquelle déplacer le joueur
   * @param isCtrlPressed - Indique si la touche Ctrl est appuyée
   * @param isShiftPressed - Indique si la touche Shift est appuyée
   */
  public gameLoop(direction?: Direction, isCtrlPressed: boolean = false, isShiftPressed: boolean = false): void {
    if (direction) {
      const nextPosition = this.player.getNextPosition(direction);

      if (this.isWithinBounds(nextPosition)) {
        const tileType = this.getTileTypeAtPosition(nextPosition);

        if (this.isPositionFree(nextPosition)) {
          this.moveHistory.addMove(new Move(this.player.getPosition()));
          this.player.move(direction);
        } else {
          switch (tileType) {
            case TileType.Hole:
              const hole = this.holes.find(h => h.hasSamePosition(nextPosition));
              if (hole && !hole.isFilled) {
                // Ne rien faire si le trou est vide
              } else {
                this.moveHistory.addMove(new Move(this.player.getPosition()));
                this.player.move(direction);
              }
              break;

            case TileType.Obstacle:
              // Ne rien faire pour les obstacles
              break;

            case TileType.Rock:
              const rock = this.getRockAtPosition(nextPosition);
              if (rock) {
                if (rock.isWalkable()) {
                  this.moveHistory.addMove(new Move(this.player.getPosition()));
                  this.player.move(direction);
                } else if (isShiftPressed) {
                  this.moveHistory.addMove(new Move(this.player.getPosition(), rock.getPosition()));
                  this.pullRock(rock, direction);
                } else if (isCtrlPressed) {
                  this.moveHistory.addMove(new Move(this.player.getPosition(), rock.getPosition()));
                  this.pushRocksInCascade(rock, direction);
                } else {
                  this.moveHistory.addMove(new Move(this.player.getPosition(), rock.getPosition()));
                  this.pushRock(rock, direction);
                }
              }
              break;

            default:
              console.log("Déplacement invalide");
          }
        }

        // Mise à jour de l'affichage après le mouvement
        this.display.draw(this);
        this.removeWalkableRocks(); // Supprime les rochers traversables
        if (this.levels[this.currentLevel].isLevelComplete()) {
          this.endGame();
        }
      } else {
        console.log("Déplacement invalide : hors des limites");
      }
    }
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
    this.player = new Player(currentLevelData.getGrid()[0][0].x, currentLevelData.getGrid()[0][0].y);
    this.rocks = currentLevelData.getRocks().map(rockData => new Rock(rockData.x, rockData.y));
    this.holes = currentLevelData.getHoles();
    this.obstacles = currentLevelData.getObstacles();
    this.display.draw(this);
  }

  /**
   * Pousse un rocher dans une direction donnée
   * @param rock - Le rocher à pousser
   * @param direction - La direction dans laquelle pousser le rocher
   */
  private pushRock(rock: Rock, direction: Direction): void {
    const nextPosition = rock.getNextPosition(direction);
    if (this.isPositionFree(nextPosition)) {
      rock.move(direction);
    }
  }

  /**
   * Pousse plusieurs rochers en cascade dans une direction donnée
   * @param rock - Le rocher de départ
   * @param direction - La direction du déplacement
   */
  private pushRocksInCascade(rock: Rock, direction: Direction): void {
    let currentRock: Rock | null = rock;
    while (currentRock && this.isPositionFree(currentRock.getNextPosition(direction))) {
      currentRock.move(direction);
      currentRock = this.getRockAtPosition(currentRock.getNextPosition(direction));
    }
  }

  /**
   * Tire un rocher dans une direction donnée
   * @param rock - Le rocher à tirer
   * @param direction - La direction dans laquelle tirer le rocher
   */
  private pullRock(rock: Rock, direction: Direction): void {
    const playerNextPosition = this.player.getNextPosition(direction);
    if (playerNextPosition.hasSamePosition(rock.getPosition()) && this.isPositionFree(rock.getNextPosition(direction))) {
      this.player.move(direction);
      rock.move(direction);
    }
  }

  /**
   * Supprime les rochers traversables
   */
  private removeWalkableRocks(): void {
    this.rocks = this.rocks.filter(rock => !rock.isWalkable());
  }

  /**
   * Annule le dernier mouvement
   */
  public undoLastMove(): void {
    if (this.moveHistory.canUndo()) {
      const lastMove = this.moveHistory.undoMove();
      if (lastMove) {
        const rock = lastMove.rockOldPosition ? this.getRockAtPosition(lastMove.rockOldPosition) : null;
        lastMove.reverse(this.player, rock);
      }
      this.display.draw(this);
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
      this.player = new Player(gameState.playerPosition.x, gameState.playerPosition.y);
      this.rocks = gameState.rockPositions.map(pos => new Rock(pos.x, pos.y));
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
