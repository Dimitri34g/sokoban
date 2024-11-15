je veux qu'on réfléchisse ensemble sur la gameloop il me semble qu'on utilise pas les méthode implémenter nécessaire comme movePlayer isWithinBounds getRockAtPosition getTileTypeAtPosition pushRock pullRock moveWithOtherRocks canPushAllRocks pushAllRocks checkIfInHole getRockAtPosition reverse addMove undoMove canUndo undoLastMove

/\*\*

- pour la gestion du movePlayer je veux
- le moveplayer sera appelé par addEventListener dans sokoban par rapport au touche clavier haut bas gauche droite
- on va d'abord vérifier si la prochain position avec getNextPosition est dans les limites de la grille avec isWithinBounds et si la position est libre avec isPositionFree
- si c'est le cas on va appeler la méthode move du joueur avec la direction donnée
- et on va mettre à jour l'affichage avec display.draw(this)
- sinon on va appeller la méthode getTileTypeAtPosition pour récupérer le type de la tuile à la position donnée
- et si c'est un trou et que Isfilled est false on ne fera rien sinon on va appeler la méthode move du joueur avec la direction donnée
- si c'est un obstacle on ne fera rien
- et si c'est un rocher on va vérifier si il est traversable avec isWalkable true et si c'est le cas on va appeler la méthode move du joueur avec la direction donnée
- sinon si la touche shift est appuyée on va appeler la méthode pullrock avec la direction donnée
- sinon on va appeler la méthode pushrock avec la direction donnée
- et on va mettre à jour l'affichage avec display.draw(this)
  \*/

/\*\*

- méthode de gestion de mouvement d'un rocher
- on va d'abord vérifier si le rocher est traversable avec isWalkable si oui on fait rien
-
- \*/

/\*\*

- pour gestion des mouvements d'un rocher qui pousse un aurte rocher
- on va d'abord vérifier si le rocher à la position donnée est traversable avec isWalkable si oui on fait rien
- sinon on va appeler la méthode pushRock avec le rocher et la direction donnée
  \*/

/\*\*

- il nous faut une méthode pour vérifier en boucle si il y a un rocher pour les push en cascade
  \*/

très bien avec c'est dernière misa à jour redonne moi la
Refactorisation de la Classe Game
Dans Game, nous avons simplifié la logique de mouvement en utilisant une boucle de jeu qui prend en compte l'état des touches Ctrl et Shift :

isCtrlPressed et isShiftPressed seront des paramètres dans la méthode handlePlayerMovement.
La logique des interactions est déplacée dans une méthode qui gère les déplacements du joueur et ses interactions avec les différentes tuiles.
Code Modifié de Game
typescript
Copier le code
public handlePlayerMovement(direction: Direction, isCtrlPressed: boolean, isShiftPressed: boolean): void {
const nextPosition = this.player.getNextPosition(direction);

if (this.isWithinBounds(nextPosition)) {
const tileType = this.getTileTypeAtPosition(nextPosition);

    if (this.isPositionFree(nextPosition)) {
      this.player.move(direction);
    } else {
      switch (tileType) {
        case TileType.Hole:
          const hole = this.holes.find(h => h.hasSamePosition(nextPosition));
          if (hole && !hole.isFilled) {
            // Do nothing if the hole is empty
          } else {
            this.player.move(direction);
          }
          break;

        case TileType.Obstacle:
          // Do nothing for obstacles
          break;

        case TileType.Rock:
          const rock = this.getRockAtPosition(nextPosition);
          if (rock) {
            if (rock.isWalkable()) {
              this.player.move(direction);
            } else if (isShiftPressed) {
              this.playerPullRock(rock, direction);
            } else if (isCtrlPressed) {
              this.playerPushRocksInCascade(rock, direction);
            } else {
              this.playerPushRock(rock, direction);
            }
          }
          break;

        default:
          console.log("Déplacement invalide");
      }
    }

    this.display.draw(this); // Mise à jour de l'affichage

} else {
console.log("Déplacement invalide : hors des limites");
}
}

par contre on va juste la renommer la methode handlePlayerMovement en gameLoop

donc cette méthode sera notre méthode principale de jeu elle gérera donc notre déplacement de joueur dans son environement et ses intéractions en terme de fin de boucle on suppimera les rock avec removeWalkableRocks on draw et on vérifie si le niveau est terminé
