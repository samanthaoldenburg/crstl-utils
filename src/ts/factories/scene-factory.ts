import { CFScene } from "../domain/scene";

export class CFSceneFactory {
  constructor(private readonly game: ReadyGame) {}

  /**
   * Build given Scene Document
   */
  buildFromScene(scene: Scene): CFScene {
    return new CFScene(scene);
  }

  /**
   * Build given UUID
   *
   * TODO: Make this more flexible
   */
  buildFromUuid(sceneUuid: string): CFScene | null {
    const scene = this.game.scenes.get(sceneUuid);

    if (scene === undefined || scene === null) { return null }

    return this.buildFromScene(scene);
  }
}
