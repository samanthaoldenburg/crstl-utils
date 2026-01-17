import { CFError } from "./errors"

export class CFHelpers {
  // Proxy to Foundry's parseUuid
  //
  // TODO: Replace invocation with undeprecated `foundry.utils.parseUuid` once
  // fvtt-types supports it.
  public static parseUuid(uuid: string): foundry.utils.ResolvedUUID {
    const resolvedUuid = parseUuid(uuid)

    if (resolvedUuid === null) { throw new CFError('Invalid input', {input: uuid}) }

    return resolvedUuid
  }
}
