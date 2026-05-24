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

  public async executeMacroAsGm(macroName: string, macroArguments: unknown): Promise<void> {
    if (!game.macros) return;

    const macro = game.macros.getName(macroName);

    if (!macro) {
      return this.uiError(`Macro ${macroName} does not exist`);
    }

    // Use the Advanced Macro's query engine directly
    // This may need to be updated when Foundry updates
    const gmUser = game.users.activeGM;

    if (!gmUser) {
      return this.uiWarn("GM isn't logged in. Cannot execute command.");
    }

    const queryData = { macro: macro.id, scope: macroArguments };

    // It's very hard to type coerce this due to the typing around CONFIG.queries
    //
    // @ts-expect-error
    gmUser.query("advanced-macros.executeMacro", queryData, {timeout: 30000})
  }

  public currentScene(): CFScene {
    return this.sceneFactory.buildFromScene(this.game.scenes.current as Scene);
  }

  private uiWarn(message: string) {
    ui?.notifications?.warn(message);
  }

  private uiError(message: string) {
    ui?.notifications?.error(message);
  }
}
