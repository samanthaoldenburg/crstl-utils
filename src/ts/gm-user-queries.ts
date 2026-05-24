/**
 * File that contains all the custom queries I use to trigger powerful actions
 * from my player's screen.
 */

import { CrstlUtils } from "./crstl-utils";

export class CFGmUserQueries {
  constructor(private readonly crstlUtils: CrstlUtils) {}

  public queries = {
    "update-journal-entry-page-ownership": this.updateJournalEntryPageOwnership
  }

  // Make Journal Entry Page observable to a player
  updateJournalEntryPageOwnership(
    queryData: {
      playerUuid: string,
      journalEntryUuid: string,
      journalPageUuid: string,
      ownershipLevel: CONST.DOCUMENT_OWNERSHIP_LEVELS,
    }
  ) {
    const player = this.crstlUtils.readyGame.users.get(queryData.playerUuid);

    if (!player) return console.warn("Player is GM");

    const journal = this.crstlUtils.readyGame.journal.get(queryData.journalEntryUuid);

    if (!journal) return console.error("Journal entry cannot be found");

    const journalPage: JournalEntryPage | undefined = journal.pages.get(queryData.journalPageUuid);

    if (!journalPage) return console.error("Journal page cannot be found");

    const ownership = journalPage.ownership;
    ownership[player.id] = queryData.ownershipLevel;

    journalPage.update({ownership});
  }
}

