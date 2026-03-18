export type Player = {
  "checks"?: Array<number>,
  "game"?: string,
  "game_state": string,
  "last_activity"?: number,
  "name": string,
  "slot": number,
  "team": number,
}

export class ArchipelagoApiClient{
  players?: Array<Player>;
  socket?: WebSocket;
  setClient?: any;
}
