import { MovableTile ,Direction } from './MovableTile';
import { TileType } from './Tile';
import { Hole } from './Hole';

export class Rock extends MovableTile {
  protected isInHole: boolean;

  constructor(x: number, y: number) {
    super(x, y, TileType.Rock, 'grey', 'square');
    this.isInHole = false;
  }

  /**
   * Indique si le rocher est praticable (walkable)
   * @returns false car un rocher n'est jamais praticable
   */
  public isWalkable(): boolean {
    return false;
  }

  /**
   * Déplace le rocher avec d'autres rochers dans une direction donnée si possible
   * @param direction - La direction du déplacement (haut, bas, gauche, droite)
   */
  public moveWithOtherRocks(direction: Direction): void {
    if (this.canPushAllRocks(direction)) {
      this.pushAllRocks(direction);
    }
  }

  /**
   * Vérifie si tous les rochers peuvent être poussés dans une direction donnée
   * @param direction - La direction du déplacement (haut, bas, gauche, droite)
   * @returns true si tous les rochers peuvent être poussés, sinon false
   */
  public canPushAllRocks(direction: Direction): boolean {
    // Implémenter la logique de vérification pour savoir si tous les rochers peuvent être poussés
    return true; // Placeholder
  }

  /**
   * Pousse tous les rochers dans une direction donnée
   * @param direction - La direction du déplacement (haut, bas, gauche, droite)
   */
  public pushAllRocks(direction: Direction): void {
    // Implémenter la logique pour pousser tous les rochers
  }

  /**
   * Vérifie si le rocher est dans un trou et met à jour son état
   * @param holes - La liste des trous du niveau
   */
  public checkIfInHole(holes: Hole[]): void {
    for (const hole of holes) {
      if (hole.hasSamePosition(this)) {
        this.isInHole = true;
        break;
      }
    }
  }
}
