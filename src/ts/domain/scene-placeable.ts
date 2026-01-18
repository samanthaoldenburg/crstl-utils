/**
 * Interface for something placeable on a scene.
 */
export interface CFBaseScenePlaceable {
  documentType: keyof Scene.Metadata.Embedded;
  id: string | null;
  x: number;
  y: number;
}

export interface CFScenePlaceable extends CFBaseScenePlaceable {}

export interface CFSceneSequencePlaceable extends CFBaseScenePlaceable {
  visibleItem: VisibleFoundryTypes;
}

export const buildSequenceAnimation = (placeable: CFSceneSequencePlaceable): AnimationSection => {
  return new Sequence().animation().on(placeable.visibleItem);
}

