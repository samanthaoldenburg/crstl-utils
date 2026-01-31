import { CFScenePlaceable, DocumentUpdateData } from "./scene-placeable"

export type SequenceAnimationImplementation =  (
  placeable: CFScenePlaceable,
  animationSection: AnimationSection,
  pos: Vector2
) => CoreMethods

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
