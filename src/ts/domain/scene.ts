import { CFScenePlaceable, DocumentUpdateData } from "./scene-placeable"

export type SequenceAnimationImplementation =  (
  placeable: CFScenePlaceable,
  animationSection: AnimationSection,
  pos: Vector2
) => CoreMethods

type EmbeddedDocumentUpdates = Record<keyof Scene.Metadata.Embedded, DocumentUpdateData[]>

export class CFScene {
  constructor(public scene: Scene) { }

  get gridSizeX(): number { return this.scene.grid.sizeX }
  get gridSizeY(): number { return this.scene.grid.sizeY }

  get gridSize(): Vector2 {
    return {x: this.scene.grid.sizeX, y: this.scene.grid.sizeY}
  }

  public getEmbeddedDocumentId(type: keyof Scene.Metadata.Embedded, uuid: string): string {
    return [
      'Scene',
      this.scene.id,
      type as string,
      uuid
    ].join('.');
  }

  public calculateGridMovement(position: Vector2, movement: Vector2): Vector2 {
    return {
      x: position.x + (this.gridSizeX * movement.x),
      y: position.y + (this.gridSizeY * movement.y)
    }
  }

  async moveItemsAlongGrid(
    items: CFScenePlaceable[],
    gridMovement: Vector2,
    sequenceAnimationImplementation?: SequenceAnimationImplementation 
  ): Promise<EmbeddedDocumentUpdates> {
    const embeddedDocumentUpdates: EmbeddedDocumentUpdates = {} as EmbeddedDocumentUpdates

    for (const item of items) {
      const documentUpdate = await this.moveItemAlongGrid(item, gridMovement, sequenceAnimationImplementation)

      if (embeddedDocumentUpdates[item.documentType]) {
        embeddedDocumentUpdates[item.documentType].push(documentUpdate)
      } else { embeddedDocumentUpdates[item.documentType] = [documentUpdate] }
    }

    for (const [embeddedType, updates] of Object.entries(embeddedDocumentUpdates)) {
      if (updates.length > 0) {
        if (updates.find(x => x._id)) {
          this.scene.updateEmbeddedDocuments(embeddedType as keyof Scene.Metadata.Embedded, updates)
        }
      }
    }

    return embeddedDocumentUpdates
  }

  async moveItemAlongGrid(
    item: CFScenePlaceable,
    gridMovement: Vector2,
    sequenceAnimationImplementation?: SequenceAnimationImplementation 
  ): Promise<DocumentUpdateData> {
    let sequenceImplementation: SequenceAnimationImplementation

    if (sequenceAnimationImplementation === undefined) {
      sequenceImplementation = CFScene.defaultMoveAnimation;
    } else {
      sequenceImplementation = sequenceAnimationImplementation 
    }

    return await item.moveAlongGrid(this, gridMovement, sequenceImplementation)
  }

  static defaultMoveAnimation: SequenceAnimationImplementation = (
    _placeable: CFScenePlaceable,
    animationSection: AnimationSection,
    pos: Vector2
  ) => {
    return animationSection.moveTowards(pos).moveSpeed(10);
  }
}
