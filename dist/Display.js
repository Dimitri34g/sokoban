import Drawer from "./Drawer.js";
export class Display {
    constructor(width, height, scale = 10, game) {
        this.drawer = new Drawer(width, height, scale);
        this.game = game;
    }
    /**
     * Rafraîchit le score affiché sur la page.
     */
    refreshScore() {
        let score = document.getElementById("score");
        if (score != null)
            score.innerHTML = "0";
    }
    /**
     * Met à jour l'affichage du jeu.
     */
    update() {
        console.log("Affichage mis à jour");
        this.drawer.clear(); // Efface le canvas avant de redessiner
        this.draw(this.game); // Redessine le jeu actuel
    }
    /**
     * Rendu du niveau actuel.
     * @param level - Le niveau à rendre à l'écran.
     */
    render(level) {
        console.log("Rendu du niveau");
        // Utiliser le drawer pour dessiner chaque élément du niveau
        level.rocks.forEach((rock) => {
            this.drawer.drawTile(rock);
        });
        level.holes.forEach((hole) => {
            this.drawer.drawTile(hole);
        });
        this.drawer.drawTile(level.player);
    }
    /**
     * Dessine le jeu complet.
     * @param game - L'instance du jeu à dessiner.
     */
    draw(game) {
        this.render(game.currentLevel);
    }
}
