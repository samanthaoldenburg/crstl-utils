import { CFTokenFactory } from "./factories/token-factory"
import { CFSceneFactory } from "./factories/scene-factory"
import { CFScene } from "./domain/scene"
import { CFWallFactory } from "./factories/wall-factory"
import { CFGmUserQueries } from "./gm-user-queries"

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
  const gmQueries = new CFGmUserQueries().queries;
  for (const queryName in gmQueries) {
    const fullQueryName = `crstl-utils.${queryName}` as keyof typeof CONFIG.queries;

    // It's very hard to type coerce this due to the typing around CONFIG.queries
    //
    // @ts-expect-error
    CONFIG.queries[fullQueryName] = (queryData: unknown) => {
      // We need to create a new query runner, as I think queries are somewhat
      // ran on the server side. Originally, we were going to use a query runner
      // defined in the window, but that seems to cause things to resolve to
      // undefined.
      const queryRunner = new CFGmUserQueries();
      const queryFunction = queryRunner.queries[queryName as keyof typeof queryRunner.queries];

      queryFunction(queryData)
    }
  }
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

  public get readyGame(): ReadyGame { return this.game; }

  public async executeMacroAsGm(macroName: string, macroArguments: unknown): Promise<void> {
    const macro = this.game.macros.getName(macroName);

    if (!macro) {
      return this.uiError(`Macro ${macroName} does not exist`);
    }

    const queryData = { macro: macro.id, scope: macroArguments };

    await this.executeQueryAsGm("advanced-macros.executeMacro", queryData);
  }

  public async executeQueryAsGm(queryName: string, scope: unknown) {
    // Use the Advanced Macro's query engine directly
    // This may need to be updated when Foundry updates
    const gmUser = this.game.users?.activeGM;

    if (!gmUser) {
      return this.uiWarn("GM isn't logged in. Cannot execute command.");
    }

    // It's very hard to type coerce this due to the typing around CONFIG.queries
    //
    // @ts-expect-error
    gmUser.query(queryName, scope, {timeout: 30000})
  }

  public currentScene(): CFScene {
    return this.sceneFactory.buildFromScene(this.game.scenes.current as Scene);
  }

  public uiWarn(message: string) {
    ui?.notifications?.warn(message);
  }

  public uiError(message: string) {
    ui?.notifications?.error(message);
  }
}
