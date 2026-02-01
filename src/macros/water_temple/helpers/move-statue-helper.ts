import { SequenceAnimationImplementation } from "../../../ts/domain/scene"
import { CFScenePlaceable } from "../../../ts/domain/scene-placeable"

export const statueMovement: SequenceAnimationImplementation = (
  _placeable: CFScenePlaceable,
  animationSection: AnimationSection,
  pos: Vector2
) => {
  return animationSection.moveTowards(pos).moveSpeed(3);
}
