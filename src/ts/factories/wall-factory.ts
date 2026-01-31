// import { CFWall } from '../domain/wall'

import { CFError, CFResourceNotFoundError } from "../errors"
import { CFHelpers } from "../helpers"
import { CFWall } from "../domain/wall"

// Decoded UUID gotten by clicking the "Copy UUID" button on the wall document.

export class CFWallFactory {
  constructor(private readonly game: ReadyGame) {}

  /**
   * Build a CFWall given a Wall.
   *
   * @remarks
   * This is useful for `canvas.walls.controlled`, which returns `Wall[]`
   */
  buildFromWall(wall: Wall): CFWall {
    return new CFWall(wall.document)
  }

  /** 
   * Create a CFWall, given a wall document
   */
  buildFromWallDocument(wall: WallDocument): CFWall {
    return new CFWall(wall)
  }

  /**
   * Create a CFWall given a UUID copied by clicking the button on the wall's document
   *
   * This function works even if you're not currently on the scene with the wall
   * @param documentUuid - Full wall document ID
   *
   * @example
   * const wallFactory = new CFWallFactory(game);
   * const myWall = wallFactory.fromDocumentUuid(
   *   'Scene.DZez8ZtkMG03KOOm.Wall.CVI3r8M5RxNVJx61.Actor.iaQHKZChq3InEsjR'
   * );
   */
  buildFromDocumentUuid(documentUuid: string): CFWall {
    return this.buildFromResolvedWallUuid(
      this.wallUuidFromDocumentUuid(documentUuid)
    )
  }

  /**
   * Create a CFWall given a ResolvedUUID of a wall within a scene
   */
  private buildFromResolvedWallUuid(wallResolvedUuid: foundry.utils.ResolvedUUID): CFWall {
    const sceneId = wallResolvedUuid.primaryId

    if (sceneId === undefined) { throw new CFError("Invalid Wall Resolved UUID", {wallResolvedUuid}) }

    const scene = this.game.scenes.get(sceneId);

    if (scene === undefined || scene === null) { throw new CFResourceNotFoundError("Scene does not exist", {sceneId}) }

    const wallId = wallResolvedUuid.id
    const wall = scene.walls.get(wallId)

    if (wall === undefined || wall === null) { throw new CFResourceNotFoundError("Wall does not exist", {scene, wallId}) }

    return new CFWall(wall)
  }

  /* Get a wall UUID, given the UUID copied by clicking the button on the wall's document.
   *
   * These walls have the format of `'Scene.DZez8ZtkMG03KOOm.Wall.CVI3r8M5RxNVJx61.Actor.iaQHKZChq3InEsjR'`
   */
  private wallUuidFromDocumentUuid(documentUuid: string): foundry.utils.ResolvedUUID {
    const resolvedUuid = CFHelpers.parseUuid(documentUuid)

    if (resolvedUuid.primaryType !== 'Scene' || resolvedUuid.embedded[0] !== "Wall") {
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
  // Create a CFWall given a UUID copied by clicking the button on the wall's document
  //
  // This function works even if you're not currently on the scene with the wall
  // @param documentUuid - Full wall document ID
  //
  // @example
  // const wallFactory = new CFWallFactory(game);
  // const myWall = wallFactory.fromDocumentUuid(
  //   'Scene.DZez8ZtkMG03KOOm.Wall.CVI3r8M5RxNVJx61.Actor.iaQHKZChq3InEsjR'
  // );
  buildFromDocumentUuid(documentUuid: string): CFWall {

  }

  safeBuildFromDocumentUuid(documentUuid: string): CFWall | undefined {
    const uuidComponents = documentUuid.split('.')
    const sceneId = uuidComponents[1]
    const wallId = uuidComponents[3]
  }


  private decodeDocumentUuid(documentUuid: string): WallDocumentUuid {
    const uuidComponents = documentUuid.split('.')
    
    
  }

  private getWallUuid(uuid: string) {
    const resolvedUuid = parseUuid(uuid); 
  }

  private safeGetWall(sceneId: string, wallId: string): Wall | null {
    const

  }
  */
}
