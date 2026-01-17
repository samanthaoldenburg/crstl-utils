// Error with context
export class CFError extends Error {
  public context: Record<string, unknown>

  constructor(message: string, context: Record<string, unknown> = {}) {
    if (context.cause) {
      super(message, {cause: context.cause})
    } else {
      super(message)
    }

    this.context = context
  }
}

export class CFResourceNotFoundError extends CFError {}
