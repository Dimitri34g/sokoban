export class Level {
    /**
     * Constructeur pour initialiser un niveau avec des rochers, des trous et un joueur.
     * @param rocks - Liste des rochers du niveau.
     * @param holes - Liste des trous du niveau.
     * @param player - Le joueur du niveau.
     */
    constructor(rocks, holes, player) {
        this.rocks = rocks;
        this.holes = holes;
        this.player = player;
    }
    /**
     * Initialise le niveau en plaçant les rochers, les trous et le joueur aux positions de départ.
     */
    initializeLevel() {
        // Placer le joueur à sa position initiale
        this.player.setPosition(0, 0);
        // Placer chaque rocher à une position définie
        this.rocks.forEach((rock, index) => {
            const x = index + 1; // Exemple de logique de placement
            const y = index + 2;
            rock.setPosition(x, y);
        });
        // Placer chaque trou à une position définie
        this.holes.forEach((hole, index) => {
            const x = index + 3; // Exemple de logique de placement
            const y = index + 4;
            hole.setPosition(x, y);
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
