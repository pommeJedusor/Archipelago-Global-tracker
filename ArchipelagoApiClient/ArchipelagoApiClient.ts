export type Datapackage = {
  item_id_to_name: {[id: number]: string},
  location_id_to_name: {[id: number]: string},
  game: string,
  hash: string
}

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

function inverse_dictionary(dic: {[id: string|number]: string|number}){
  let reverse_dic: {[id: string|number]: string|number} = {}
  for (const [key, value] of Object.entries(dic)){
    reverse_dic[value] = key;
  }
  return reverse_dic
}

export class ArchipelagoApiClient{
  players: Array<Player> = [];
  datapackages: {[id: string]: Datapackage} = {};
  socket?: WebSocket;
  setClient?: any;

  load_datapackage(datapackage: any){
    this.datapackages[datapackage.game] = {
      game: datapackage.game,
      hash: datapackage.hash,
      item_id_to_name: inverse_dictionary(datapackage.item_name_to_id),
      location_id_to_name: inverse_dictionary(datapackage.location_name_to_id),
    } as Datapackage;
  }
}
