import Drawer from "./Drawer.js";
import { Game } from "./Game.js";
import { Level } from "./Level.js";

export class Display {
  private drawer: Drawer;
  private game: Game;
  constructor(width: number, height: number, scale: number = 10, game: Game) {
    this.drawer = new Drawer(width, height, scale);
    this.game = game;
  }

  /**
   * Rafraîchit le score affiché sur la page.
   */
  public refreshScore(): void {
    let score: HTMLElement | null = document.getElementById("score");
    if (score != null) score.innerHTML = "0";
  }

  /**
   * Met à jour l'affichage du jeu.
   */
  public update(): void {
    console.log("Affichage mis à jour");
    this.drawer.clear();
    this.draw(this.game);
  }
  /**
   * Rendu du niveau actuel.
   * @param level - Le niveau à rendre à l'écran.
   */
  public render(level: Level): void {
    console.log("Rendu du niveau");
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
  public draw(game: Game): void {
    this.render(game.currentLevel);
  }
}
