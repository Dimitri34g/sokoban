import { Level } from './Level';

export class LevelManager {
  private levelsData: Level[];
  private levelsFilePath: string = './levels.json';
  private saveFilePath: string = './save.json';

  constructor() {
    this.levelsData = [];
  }

  /**
   * Charge les niveaux à partir d'un fichier JSON
   */
  public loadLevelsFromJSON(): void {
    // Utiliser une requête HTTP pour charger les données JSON (adapté pour TypeScript dans un environnement navigateur)
    fetch(this.levelsFilePath)
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
    // Utiliser l'API fetch pour sauvegarder la progression dans un fichier JSON (adapté pour TypeScript dans un environnement navigateur)
    fetch(this.saveFilePath, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(level)
    })
    .then(() => {
      console.log('Progression sauvegardée avec succès');
    })
    .catch(error => {
      console.error('Erreur lors de la sauvegarde de la progression :', error);
    });
  }

  /**
   * Charge un niveau sauvegardé spécifique
   * @returns Une promesse qui se résout avec le niveau sauvegardé, ou null s'il n'y a aucune sauvegarde
   */
  public loadSavedLevel(): Promise<Level | null> {
    return fetch(this.saveFilePath)
      .then(response => response.json())
      .then((savedLevel: any) => {
        return new Level(savedLevel.grid, savedLevel.holes, savedLevel.rocks, savedLevel.obstacles);
      })
      .catch(error => {
        console.error('Erreur lors du chargement de la sauvegarde :', error);
        return null;
      });
  }
}
