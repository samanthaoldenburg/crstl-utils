// import { CFToken } from '../domain/token'

import { CFError, CFResourceNotFoundError } from "../errors"
import { CFHelpers } from "../helpers"
import { CFToken } from "../domain/token"

// Decoded UUID gotten by clicking the "Copy UUID" button on the token document.

export class CFTokenFactory {
  constructor(private readonly game: ReadyGame) { console.log(this.game) }

  /**
   * Build a CFToken
   */
  buildFromToken(token: Token): CFToken {
    return new CFToken(token.document, token.scene)
  }

  /** '
   * C
   */
  buildFromTokenDocument(token: TokenDocument): CFToken {
    return new CFToken(token, token.parent as Scene)
  }

  /**
   * Create a CFToken given a UUID copied by clicking the button on the token's document
   *
   * This function works even if you're not currently on the scene with the token
   * @param documentUuid - Full token document ID
   *
   * @example
   * const tokenFactory = new CFTokenFactory(game);
   * const myToken = tokenFactory.fromDocumentUuid(
   *   'Scene.DZez8ZtkMG03KOOm.Token.CVI3r8M5RxNVJx61.Actor.iaQHKZChq3InEsjR'
   * );
   */
  buildFromDocumentUuid(documentUuid: string): CFToken {
    return this.buildFromResolvedTokenUuid(
      this.tokenUuidFromDocumentUuid(documentUuid)
    )
  }

  /**
   * Create a CFToken given a ResolvedUUID of a token within a scene
   */
  private buildFromResolvedTokenUuid(tokenResolvedUuid: foundry.utils.ResolvedUUID): CFToken {
    const sceneId = tokenResolvedUuid.primaryId

    if (sceneId === undefined) { throw new CFError("Invalid Token Resolved UUID", {tokenResolvedUuid}) }

    const scene = this.game.scenes.get(sceneId);

    if (scene === undefined || scene === null) { throw new CFResourceNotFoundError("Scene does not exist", {sceneId}) }

    const tokenId = tokenResolvedUuid.id
    const token = scene.tokens.get(tokenId)

    if (token === undefined || token === null) { throw new CFResourceNotFoundError("Token does not exist", {scene, tokenId}) }

    return new CFToken(token, scene)
  }

  /* Get a token UUID, given the UUID copied by clicking the button on the token's document.
   *
   * These tokens have the format of `'Scene.DZez8ZtkMG03KOOm.Token.CVI3r8M5RxNVJx61.Actor.iaQHKZChq3InEsjR'`
   */
  private tokenUuidFromDocumentUuid(documentUuid: string): foundry.utils.ResolvedUUID {
    const resolvedUuid = CFHelpers.parseUuid(documentUuid)

    if (resolvedUuid.primaryType !== 'Scene' || resolvedUuid.embedded[0] !== "Token") {
      throw new CFError("Invalid document UUID", {documentUuid, resolvedUuid})
    }

    return CFHelpers.parseUuid(
      [
        resolvedUuid.primaryType,
        resolvedUuid.primaryId,
        resolvedUuid.embedded[0],
        resolvedUuid.embedded[1]
      ].join('.')
    )
  }

  /*
  // Create a CFToken given a UUID copied by clicking the button on the token's document
  //
  // This function works even if you're not currently on the scene with the token
  // @param documentUuid - Full token document ID
  //
  // @example
  // const tokenFactory = new CFTokenFactory(game);
  // const myToken = tokenFactory.fromDocumentUuid(
  //   'Scene.DZez8ZtkMG03KOOm.Token.CVI3r8M5RxNVJx61.Actor.iaQHKZChq3InEsjR'
  // );
  buildFromDocumentUuid(documentUuid: string): CFToken {

  }

  safeBuildFromDocumentUuid(documentUuid: string): CFToken | undefined {
    const uuidComponents = documentUuid.split('.')
    const sceneId = uuidComponents[1]
    const tokenId = uuidComponents[3]
  }


  private decodeDocumentUuid(documentUuid: string): TokenDocumentUuid {
    const uuidComponents = documentUuid.split('.')
    
    
  }

  private getTokenUuid(uuid: string) {
    const resolvedUuid = parseUuid(uuid); 
  }

  private safeGetToken(sceneId: string, tokenId: string): Token | null {
    const

  }
  */
}
