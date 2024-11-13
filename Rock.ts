import { MovableTile } from './MovableTile';
import { TileType } from './Tile';
import { Direction } from './MovableTile';
import { Hole } from './Hole';
import { Position } from './Position';
import { Game } from './Game';

export class Rock extends MovableTile {
  protected isInHole: boolean;
  private game: Game; // Référence à l'instance de Game

  constructor(x: number, y: number, game: Game) {
    super(x, y, TileType.Rock, 'grey', 'square');
    this.isInHole = false;
    this.game = game;
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
    let currentRock: Rock | null = this;
    while (currentRock) {
      const nextPosition = currentRock.getNextPosition(direction);
      if (!this.game.isPositionFree(nextPosition)) {
        return false;
      }
      currentRock = this.getRockAtPosition(nextPosition);
    }
    return true;
  }

  /**
   * Pousse tous les rochers dans une direction donnée
   * @param direction - La direction du déplacement (haut, bas, gauche, droite)
   */
  public pushAllRocks(direction: Direction): void {
    let rocksToPush: Rock[] = [];
    let currentRock: Rock | null = this;
    while (currentRock) {
      rocksToPush.push(currentRock);
      const nextPosition = currentRock.getNextPosition(direction);
      currentRock = this.getRockAtPosition(nextPosition);
    }
    for (let i = rocksToPush.length - 1; i >= 0; i--) {
      rocksToPush[i].move(direction);
    }
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

  /**
   * Récupère le rocher à une position donnée
   * @param position - La position à vérifier
   * @returns Le rocher à la position donnée, ou null s'il n'y en a pas
   */
  private getRockAtPosition(position: Position): Rock | null {
    return this.game.getRocks().find(rock => rock.hasSamePosition(position)) || null;
  }
}
