import { CFSceneSequencePlaceable } from "./scene-placeable";

export class CFToken implements CFSceneSequencePlaceable {
  // TODO: remove scene
  constructor (private readonly token: TokenDocument) {}

  public documentType: keyof Scene.Metadata.Embedded = 'Token';

  get id(): string | null { return this.token.id }
  get x(): number { return this.token.x }
  get y(): number { return this.token.y }
  get visibleItem() { return this.token }
}
