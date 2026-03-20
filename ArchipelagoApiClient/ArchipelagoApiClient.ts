export type Hint = {
  entrance: string,
  found: Boolean,
  item: number,
  item_flags: number,
  location: number,
  receiving_player: number,
  finding_player: number,
  status: number,
}

export type Player = {
  "checks"?: Array<number>,
  "game": string,
  "game_state"?: string,
  "hints"?: Array<Hint>
  "last_activity"?: number,
  "location_number": number,
  "name": string,
  "slot": number,
  "team": number,
}

export class ArchipelagoApiClient{
  players?: Array<Player>;
  socket?: WebSocket;
  setClient?: any;
}
