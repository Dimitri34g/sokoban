import { Move } from './Move.js';

export class MoveHistory {
  private moves: Move[];
  private maxUndo: number;

  constructor(maxUndo: number) {
    this.moves = [];
    this.maxUndo = maxUndo;
  }

  /**
   * Ajoute un mouvement à l'historique
   * @param move - Le mouvement à ajouter
   */
  public addMove(move: Move): void {
    if (this.moves.length >= this.maxUndo) {
      this.moves.shift(); // Supprimer le mouvement le plus ancien si la limite est atteinte
    }
    this.moves.push(move);
  }

  /**
   * Annule le dernier mouvement et le retourne
   * @returns Le dernier mouvement annulé
   */
  public undoMove(): Move | null {
    return this.moves.pop() || null;
  }

  /**
   * Vérifie s'il est possible d'annuler un mouvement
   * @returns true si un mouvement peut être annulé, sinon false
   */
  public canUndo(): boolean {
    return this.moves.length > 0;
  }
}
