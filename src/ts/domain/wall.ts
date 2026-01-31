import { CFScene, SequenceAnimationImplementation } from "./scene";
import { CFScenePlaceable } from "./scene-placeable";

export class CFWall implements CFScenePlaceable {
  // TODO: remove scene
  constructor (public readonly document: WallDocument) { }

  public documentType: keyof Scene.Metadata.Embedded = 'Wall';

  get id(): string | null { return this.document.id }
  get x(): number { return this.document.c[0] }
  get y(): number { return this.document.c[1] }

  private get coordinates(): Wall.Coordinates { return this.document.c }

  async moveAlongGrid(
    scene: CFScene,
    gridMove: Vector2,
    _sequenceImplementation: SequenceAnimationImplementation
  ): Promise<WallDocument.UpdateData> {
    const newPos1 = scene.calculateGridMovement({x: this.coordinates[0], y: this.coordinates[1]}, gridMove)
    const newPos2 = scene.calculateGridMovement({x: this.coordinates[2], y: this.coordinates[3]}, gridMove)

    const newCoordinates: Wall.Coordinates = [newPos1.x, newPos1.y, newPos2.x, newPos2.y]

    return {_id: this.id, c: newCoordinates}
  }
}
