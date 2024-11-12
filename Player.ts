import { MovableTile, Direction } from './MovableTile';
import { TileType } from './Tile';
import { Rock } from './Rock';

export class Player extends MovableTile {
  

  constructor(x: number, y: number) {
    super(x, y, TileType.Player, 'blue', 'triangle');
  }

  /**
   * Pousse un rocher dans une direction donnée
   * @param rock - Le rocher à pousser
   * @param direction - La direction dans laquelle pousser le rocher
   */
  public pushRock(rock: Rock, direction: Direction): void {
    // Implémenter la logique pour pousser le rocher
  }

  /**
   * Tire un rocher dans une direction donnée
   * @param rock - Le rocher à tirer
   * @param direction - La direction dans laquelle tirer le rocher
   */
  public pullRock(rock: Rock, direction: Direction): void {
    // Implémenter la logique pour tirer le rocher
  }

  /**
   * Indique si le joueur est praticable (walkable)
   * @returns false car le joueur n'est jamais praticable
   */
  public isWalkable(): boolean {
    return false;
  }
}
