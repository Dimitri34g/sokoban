import { Tile, TileType } from './Tile.js';
export default class Drawer {
    constructor(width, height, scale = 10) {
        this.scale = scale;
        const canvas = document.createElement('canvas');
        canvas.width = width * this.scale;
        canvas.height = height * this.scale;
        this.ctx = canvas.getContext('2d');
        document.body.appendChild(canvas);
    }
    /**
     * Efface le contenu du canvas.
     */
    clear() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    }
    /**
     * Dessine une tuile sur le canvas.
     * @param tile - La tuile à dessiner.
     */
    drawTile(tile) {
        const { x, y } = tile.getPosition();
        const color = tile.getColor();
        if (tile instanceof Tile) {
            switch (tile.type) {
                case TileType.Rock:
                case TileType.Hole:
                    this.drawRectangle(x, y, color);
                    break;
                case TileType.Player:
                    this.drawCircle(x, y, color);
                    break;
            }
        }
    }
    /**
     * Dessine un rectangle sur le canvas.
     * @param x - Coordonnée x du rectangle.
     * @param y - Coordonnée y du rectangle.
     * @param color - Couleur du rectangle.
     */
    drawRectangle(x, y, color) {
        this.ctx.beginPath();
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x * this.scale, y * this.scale, this.scale, this.scale);
    }
    /**
     * Dessine un cercle sur le canvas.
     * @param x - Coordonnée x du cercle.
     * @param y - Coordonnée y du cercle.
     * @param color - Couleur du cercle.
     */
    drawCircle(x, y, color) {
        this.ctx.beginPath();
        this.ctx.fillStyle = color;
        this.ctx.arc(x * this.scale + this.scale / 2, y * this.scale + this.scale / 2, this.scale / 2, 0, 2 * Math.PI);
        this.ctx.fill();
    }
}
