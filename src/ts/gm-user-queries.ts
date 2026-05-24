/**
 * File that contains all the custom queries I use to trigger powerful actions
 * from my player's screen.
 */

type QueryFunction = (queryData: any) => void

export class CFGmUserQueries {
  public static queries: Record<string, QueryFunction> = {
    "updateJournalEntryPageOwnership": CFGmUserQueries.updateJournalEntryPageOwnership
  }

  // Make Journal Entry Page observable to a player
  static updateJournalEntryPageOwnership(
    queryData: {
      playerUuid: string,
      journalEntryUuid: string,
      journalPageUuid: string,
      ownershipLevel: CONST.DOCUMENT_OWNERSHIP_LEVELS,
    }
  ) {
    const readyGame = game as ReadyGame;

    const player = readyGame.users.get(queryData.playerUuid);

    if (!player) return console.warn("Player is GM");

    const journal = readyGame.journal.get(queryData.journalEntryUuid);

    if (!journal) return console.error("Journal entry cannot be found");

    const journalPage: JournalEntryPage | undefined = journal.pages.get(queryData.journalPageUuid);

    if (!journalPage) return console.error("Journal page cannot be found");

    const ownership = journalPage.ownership;
    ownership[player.id] = queryData.ownershipLevel;

    journalPage.update({ownership});
  }
}

