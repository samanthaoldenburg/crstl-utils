import { CrstlUtils } from "../../ts/crstl-utils"
import { CFScene } from "../../ts/domain/scene"
import { statueMovement } from "./helpers/move-statue-helper"

((crstlUtils: CrstlUtils) => {
  const westWallIds = [
    "Scene.jEO9rCEGnP819MgW.Wall.1Th4CRv97YjoEIJK",
    "Scene.jEO9rCEGnP819MgW.Wall.TQaX0h5yp7wq53Lz",
    "Scene.jEO9rCEGnP819MgW.Wall.WSxogepGPI93ylC6",
    "Scene.jEO9rCEGnP819MgW.Wall.B6bUyRRcgfeOLEWW"
  ]

  const northWallIds = [
    "Scene.jEO9rCEGnP819MgW.Wall.fe7P4D4KntArI6HU",
    "Scene.jEO9rCEGnP819MgW.Wall.uorbl7hlPzDmwD23",
    "Scene.jEO9rCEGnP819MgW.Wall.PUxNIefK00BxpQZQ",
    "Scene.jEO9rCEGnP819MgW.Wall.CJkAlA2aeRFQBSrG"
  ]

  const southWallIds = [
    "Scene.jEO9rCEGnP819MgW.Wall.bDfB0ECJd7fFLCNl",
    "Scene.jEO9rCEGnP819MgW.Wall.JSTM27AGSy3EwWIU",
    "Scene.jEO9rCEGnP819MgW.Wall.GuWh3IijLRM3g5ki",
    "Scene.jEO9rCEGnP819MgW.Wall.mZ1sursRLV7C7vXV"
  ]

  const westToken = crstlUtils.tokenFactory.buildFromDocumentUuid('Scene.jEO9rCEGnP819MgW.Token.qc0kcIyAywfkTFG1.Actor.Owdzbr4jc2N75nYz')
  const northToken = crstlUtils.tokenFactory.buildFromDocumentUuid('Scene.jEO9rCEGnP819MgW.Token.SBgQdfiWf55nwA7I.Actor.Owdzbr4jc2N75nYz')
  const southToken = crstlUtils.tokenFactory.buildFromDocumentUuid('Scene.jEO9rCEGnP819MgW.Token.pB7wYpsPdyfT4K8B.Actor.Owdzbr4jc2N75nYz')


  const westWalls = westWallIds.map(x => crstlUtils.wallFactory.buildFromDocumentUuid(x))
  const northWalls = northWallIds.map(x => crstlUtils.wallFactory.buildFromDocumentUuid(x))
  const southWalls = southWallIds.map(x => crstlUtils.wallFactory.buildFromDocumentUuid(x))
 
  const scene = crstlUtils.sceneFactory.buildFromUuid('jEO9rCEGnP819MgW') as CFScene;

  scene.moveItemsAlongGrid([westToken, ...westWalls], {x: -2, y: 0}, statueMovement)
  scene.moveItemsAlongGrid([northToken, ...northWalls], {x: 0, y: -2}, statueMovement)
  scene.moveItemsAlongGrid([southToken, ...southWalls], {x: 0, y: 2}, statueMovement)
})(window.CrstlUtils)
