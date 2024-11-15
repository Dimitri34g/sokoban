import { LevelManager } from './LevelManager.js';
import { Game } from './Game.js';
import { Display } from './Display.js';
import { Direction } from './MovableTile.js';

export class Sokoban {
  private levelManager: LevelManager;
  private game: Game;

  constructor() {
    this.levelManager = new LevelManager();
    this.levelManager.loadLevelsFromJSON();
    const levels = this.levelManager.getLevels();
    const grid = levels[0].getGrid();
    const width = grid[0].length;
    const height = grid.length;
    const display = new Display(width, height, 10);
    this.game = new Game(levels, display);
    this.startGame();
    this.setupEventListeners();
  }

  /**
   * Démarre le jeu Sokoban
   */
  private startGame(): void {
    this.game.start();
  }

  /**
   * Configure les event listeners pour les interactions utilisateur
   */
  private setupEventListeners(): void {
    // Déplacement du joueur avec gestion des touches Ctrl et Shift
    document.addEventListener('keydown', (event) => {
      const isCtrlPressed = event.ctrlKey;
      const isShiftPressed = event.shiftKey;

      switch (event.key) {
        case 'ArrowUp':
          this.game.gameLoop(Direction.UP, isCtrlPressed, isShiftPressed);
          break;
        case 'ArrowDown':
          this.game.gameLoop(Direction.DOWN, isCtrlPressed, isShiftPressed);
          break;
        case 'ArrowLeft':
          this.game.gameLoop(Direction.LEFT, isCtrlPressed, isShiftPressed);
          break;
        case 'ArrowRight':
          this.game.gameLoop(Direction.RIGHT, isCtrlPressed, isShiftPressed);
          break;
        case 'z':
          if (isCtrlPressed) {
            this.game.undoLastMove(); // Annule le dernier mouvement quand Ctrl + Z est pressé
          }
          break;
      }
    });

    // Charger un niveau spécifique
    document.getElementById('loadLevelButton')?.addEventListener('click', () => {
      const selectElement = document.getElementById('levelSelect') as HTMLSelectElement;
      const selectedLevel = parseInt(selectElement.value);
      this.game.loadLevel(selectedLevel);
    });

    // Sauvegarder le jeu
    document.getElementById('saveButton')?.addEventListener('click', () => {
      this.game.saveGame();
    });

    // Redémarrer le niveau
    document.getElementById('restartButton')?.addEventListener('click', () => {
      this.game.restart();
    });
  }
}

// Initialiser Sokoban
const sokoban = new Sokoban();
