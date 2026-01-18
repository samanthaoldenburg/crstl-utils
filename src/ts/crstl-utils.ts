import { CFTokenFactory } from "./factories/token-factory"
import { CFSceneFactory } from "./factories/scene-factory"

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

  constructor (private readonly game: ReadyGame) {
    this.tokenFactory = new CFTokenFactory(this.game)
    this.sceneFactory = new CFSceneFactory(this.game)
  }
}
