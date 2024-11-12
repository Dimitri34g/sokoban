export class Position {
    public x: number;
    public y: number;
  
    constructor(x: number, y: number) {
      this.x = x;
      this.y = y;
    }
  
    /**
     * Vérifie si deux positions sont identiques
     * @param other - La position à comparer avec la position actuelle
     * @returns true si les deux positions sont identiques, sinon false
     */
    public hasSamePosition(other: Position): boolean {
      return this.x === other.x && this.y === other.y;
    }
  
    /**
     * Vérifie si deux positions sont adjacentes
     * @param other - La position à comparer avec la position actuelle
     * @returns true si les deux positions sont adjacentes, sinon false
     */
    public isAdjacent(other: Position): boolean {
      const dx = Math.abs(this.x - other.x);
      const dy = Math.abs(this.y - other.y);
      return (dx === 1 && dy === 0) || (dx === 0 && dy === 1);
    }
  }
  