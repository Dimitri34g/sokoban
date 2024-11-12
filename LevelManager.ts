import { Level } from './Level';

export class LevelManager {
  private levelsData: Level[];

  constructor() {
    this.levelsData = [];
  }

  /**
   * Charge les niveaux à partir d'un fichier JSON
   * @param filePath - Le chemin du fichier JSON contenant les niveaux
   */
  public loadLevelsFromJSON(filePath: string): void {
    // Utiliser une requête HTTP pour charger les données JSON (adapté pour TypeScript dans un environnement navigateur)
    fetch(filePath)
      .then(response => response.json())
      .then(parsedLevels => {
        // Implémenter la logique de conversion des données JSON en instances de Level
        this.levelsData = parsedLevels.map((levelData: any) => new Level(levelData.grid, levelData.holes, levelData.rocks, levelData.obstacles));
      })
      .catch(error => {
        console.error('Erreur lors du chargement des niveaux :', error);
      });
  }

  /**
   * Charge un niveau spécifique
   * @param levelNumber - Le numéro du niveau à charger
   * @returns Le niveau spécifié
   */
  public loadLevel(levelNumber: number): Level {
    return this.levelsData[levelNumber];
  }

  /**
   * Sauvegarde la progression du niveau
   * @param level - Le niveau à sauvegarder
   */
  public saveProgress(level: Level): void {
    // Implémenter la logique de sauvegarde de la progression
  }

  /**
   * Charge un niveau sauvegardé spécifique
   * @returns Le niveau sauvegardé, ou null s'il n'y a aucune sauvegarde
   */
  public loadSavedLevel(): Level | null {
    // Implémenter la logique pour charger un niveau sauvegardé
    return null; // Placeholder
  }
}
