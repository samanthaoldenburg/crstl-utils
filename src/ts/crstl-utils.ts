import { CFTokenFactory } from "./factories/token-factory"

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

export class CrstlUtils {
  static myTest = (): void => {
    console.log('Howdy!')
  }

  public tokenFactory: CFTokenFactory;

  constructor (private readonly game: ReadyGame) {
    this.tokenFactory = new CFTokenFactory(this.game)
  }
}
