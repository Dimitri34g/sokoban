export class Position {
    public x: number;
    public y: number;
  
    /**
     * Constructeur pour initialiser la position avec des coordonnées x et y.
     * @param x - La coordonnée x de la position.
     * @param y - La coordonnée y de la position.
     */
    constructor(x: number, y: number) {
      this.x = x;
      this.y = y;
    }
  
    /**
     * Met à jour la position avec de nouvelles coordonnées.
     * @param x - La nouvelle coordonnée x.
     * @param y - La nouvelle coordonnée y.
     */
    public setPosition(x: number, y: number): void {
      this.x = x;
      this.y = y;
    }
  
    /**
     * Retourne les coordonnées actuelles de la position.
     * @returns Un objet contenant les coordonnées x et y.
     */
    public getPosition(): { x: number; y: number } {
      return { x: this.x, y: this.y };
    }
  
    /**
     * Vérifie si la position actuelle est identique à une autre position.
     * @param other - Une autre instance de Position pour comparer.
     * @returns `true` si les positions sont identiques, sinon `false`.
     */
    public hasSamePosition(other: Position): boolean {
      return this.x === other.x && this.y === other.y;
    }
  }
  