import { CFScene, SequenceAnimationImplementation } from "./scene";

export type DocumentUpdateData = WallDocument.UpdateData | TokenDocument.UpdateData
type TypeOfDocument = WallDocument | TokenDocument

/**
 * Interface for something placeable on a scene.
 */
export interface CFScenePlaceable {
  document: TypeOfDocument;
  documentType: keyof Scene.Metadata.Embedded;
  id: string | null;
  x: number;
  y: number;

  moveAlongGrid: (
    scene: CFScene,
    gridMove: Vector2,
    sequenceImplementation: SequenceAnimationImplementation
  ) => Promise<DocumentUpdateData>;
}


