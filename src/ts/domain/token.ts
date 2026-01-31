import { CFScene, SequenceAnimationImplementation } from "./scene";
import { CFScenePlaceable } from "./scene-placeable";

export class CFToken implements CFScenePlaceable {
  constructor (public readonly document: TokenDocument) {}

  public documentType: keyof Scene.Metadata.Embedded = 'Token';

  get id(): string | null { return this.document.id }
  get x(): number { return this.document.x }
  get y(): number { return this.document.y }
  get visibleItem() { return this.document }

  async moveAlongGrid(
    scene: CFScene,
    gridMove: Vector2,
    sequenceImplementation: SequenceAnimationImplementation
  ): Promise<TokenDocument.UpdateData> {
    const newPos = scene.calculateGridMovement({x: this.x, y: this.y}, gridMove)
    const animationSection = new Sequence().animation().on(this.document)

    sequenceImplementation(this, animationSection, newPos).play()

    return {} as TokenDocument.UpdateData;
  }
}
