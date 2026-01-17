interface TokenMoveOptions {
  moveSpeed?: number
  moveTowards?: EasingOptionsWithTarget
}
export class CFToken {
  constructor (private readonly token: TokenDocument, private readonly scene: Scene) {}

  id(): string | null { return this.token.id }
  x(): number { return this.token.x }
  y(): number { return this.token.y }

  async moveGrid(gridX: number, gridY: number, options: TokenMoveOptions = {}) {
    const xTransform = gridX * this.scene.grid.sizeX;
    const yTransform = gridY * this.scene.grid.sizeY;

    const sequence = new Sequence()
      .animation()
      .on(this.token)
      .moveTowards(
        { x: this.x() + xTransform, y: this.y() + yTransform },
        options.moveTowards
      )

    if (options.moveSpeed) { sequence.moveSpeed(options.moveSpeed) }

    await sequence.play()
  }
}
