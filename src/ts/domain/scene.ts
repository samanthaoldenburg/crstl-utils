import { CFBaseScenePlaceable, CFSceneSequencePlaceable } from "./scene-placeable"

export type SequenceAnimationImplementation =  (
  placeable: CFSceneSequencePlaceable,
  animationSection: AnimationSection,
  pos: Vector2
) => CoreMethods

export class CFScene {
  constructor(private scene: Scene) { }

  get gridSizeX(): number { return this.scene.grid.sizeX }
  get gridSizeY(): number { return this.scene.grid.sizeY }

  moveAlongGrid(
    item: CFBaseScenePlaceable,
    gridX: number,
    gridY: number,
    sequenceImplementation?: SequenceAnimationImplementation 
  ): Promise<unknown> {
    const xTransform = gridX * this.gridSizeX;
    const yTransform = gridY * this.gridSizeY;
    const xPos = item.x + xTransform;
    const yPos = item.y + yTransform;

    const sequenceItem = item as CFSceneSequencePlaceable
    if (sequenceItem.visibleItem) {
      const animationSection = new Sequence().animation().on(sequenceItem.visibleItem)
      if (sequenceImplementation) {
        return sequenceImplementation(
          sequenceItem, animationSection, {x: xPos, y: yPos}
        ).play()
      } else {
        return CFScene.defaultMoveAnimation(
          sequenceItem, animationSection, {x: xPos, y: yPos}
        ).play()
      }
    } else {
      if (sequenceImplementation) {
        console.warn("Sequence given for non-visible item")
      }

      return this.scene.updateEmbeddedDocuments(
        item.documentType,
        [{_id: item.id, x: xPos, y: yPos}]
      )
    }
  }

  private static defaultMoveAnimation: SequenceAnimationImplementation = (_placeable: CFSceneSequencePlaceable, animationSection: AnimationSection, pos: Vector2) => {
    return animationSection.moveTowards(pos).moveSpeed(10);
  }
}
