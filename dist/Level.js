import { Position } from './Position.js';
export class Level {
    constructor(rocks, holes, player, width, height) {
        this.rocks = rocks;
        this.holes = holes;
        this.player = player;
        this.width = width;
        this.height = height;
    }
    /**
     * Initialise le niveau en plaçant les rochers, les trous et le joueur à des positions aléatoires.
     */
    initializeLevel() {
        const occupiedPositions = new Set();
        const generateRandomPosition = (minX, maxX, minY, maxY) => {
            let x, y;
            do {
                x = Math.floor(Math.random() * (maxX - minX + 1)) + minX;
                y = Math.floor(Math.random() * (maxY - minY + 1)) + minY;
            } while (occupiedPositions.has(`${x},${y}`));
            occupiedPositions.add(`${x},${y}`);
            return new Position(x, y);
        };
        const playerPosition = generateRandomPosition(0, this.width - 1, 0, this.height - 1);
        this.player.setPosition(playerPosition.x, playerPosition.y);
        this.rocks.forEach((rock) => {
            const rockPosition = generateRandomPosition(1, this.width - 2, 1, this.height - 2);
            rock.setPosition(rockPosition.x, rockPosition.y);
        });
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
    isCompleted() {
        return this.holes.every(hole => hole.isFilled());
    }
}
