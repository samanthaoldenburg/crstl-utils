import { CFTokenFactory } from "./factories/token-factory"
import { CFSceneFactory } from "./factories/scene-factory"
import { CFScene } from "./domain/scene"
import { CFWallFactory } from "./factories/wall-factory"

declare global {
  interface Window {
    CrstlUtils: any
  }
}
Hooks.once('init', () => {
  console.log('Hello world!')
  CrstlUtils.myTest()
})

Hooks.once('ready', () => {
  window.CrstlUtils = new CrstlUtils(game as ReadyGame)
})

/**
 * Main entrypoint to the utility. An instance of this class gets initialized when the game is ready.
 */
export class CrstlUtils {
  /**
   * Test that the plugin is loaded by logging to console
   */
  static myTest = (): void => {
    console.log('Howdy!')
  }

  public tokenFactory: CFTokenFactory;
  public sceneFactory: CFSceneFactory;
  public wallFactory: CFWallFactory;

  constructor (private readonly game: ReadyGame) {
    this.tokenFactory = new CFTokenFactory(this.game)
    this.wallFactory = new CFWallFactory(this.game)
    this.sceneFactory = new CFSceneFactory(this.game)
  }

  public currentScene(): CFScene {
    return this.sceneFactory.buildFromScene(this.game.scenes.current as Scene);
  }
}
