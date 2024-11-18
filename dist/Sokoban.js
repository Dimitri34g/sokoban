import { Game } from './Game.js';
import { Direction } from './MovableTile.js';
export class Sokoban {
    /**
     * Constructeur pour initialiser Sokoban avec un jeu.
     */
    constructor() {
        this.game = new Game(50, 50, 10); // Initialiser un jeu avec largeur, hauteur et échelle
    }
    /**
     * Point d'entrée principal pour démarrer le jeu Sokoban.
     */
    main() {
        this.game.start();
        // Logique pour interagir avec le joueur (écouter les commandes, rafraîchir le jeu, etc.)
        document.addEventListener('keydown', (event) => {
            switch (event.key) {
                case 'ArrowUp':
                    this.game.currentLevel.player.movePlayer(Direction.UP);
                    break;
                case 'ArrowDown':
                    this.game.currentLevel.player.movePlayer(Direction.DOWN);
                    break;
                case 'ArrowLeft':
                    this.game.currentLevel.player.movePlayer(Direction.LEFT);
                    break;
                case 'ArrowRight':
                    this.game.currentLevel.player.movePlayer(Direction.RIGHT);
                    break;
            }
            this.game.checkCollision();
            this.game.display.update();
        });
    }
}
// Créer une instance de Sokoban et lancer le jeu
const sokoban = new Sokoban();
sokoban.main();
