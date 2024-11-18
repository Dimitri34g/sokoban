import { Tile } from './Tile.js';
import { Position } from './Position.js';
export var Direction;
(function (Direction) {
    Direction["UP"] = "UP";
    Direction["DOWN"] = "DOWN";
    Direction["LEFT"] = "LEFT";
    Direction["RIGHT"] = "RIGHT";
})(Direction || (Direction = {}));
export class MovableTile extends Tile {
    /**
     * Déplace la tuile dans une direction donnée.
     * @param direction - La direction dans laquelle la tuile doit être déplacée.
     */
    move(direction) {
        const nextPosition = this.getNextPosition(direction);
        this.setPosition(nextPosition.x, nextPosition.y);
    }
    /**
     * Retourne la prochaine position en fonction de la direction donnée.
     * @param direction - La direction dans laquelle la tuile doit se déplacer.
     * @returns La prochaine position de la tuile.
     */
    getNextPosition(direction) {
        let { x, y } = this.getPosition();
        switch (direction) {
            case Direction.UP:
                y -= 1;
                break;
            case Direction.DOWN:
                y += 1;
                break;
            case Direction.LEFT:
                x -= 1;
                break;
            case Direction.RIGHT:
                x += 1;
                break;
        }
        return new Position(x, y);
    }
}
