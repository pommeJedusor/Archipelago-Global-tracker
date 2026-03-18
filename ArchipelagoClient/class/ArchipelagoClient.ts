import { Connected } from "./Connected";
import { make_connect_pkg } from "./ConnectPKG";
import { Get } from "./Get";
import { RoomInfo } from "./RoomInfo";


export class ArchipelagoClient{

  socket?: WebSocket;

  player_name?: string = undefined;
  password?: string;

  is_password_needed?: Boolean;
  permissions?: {
      [id: string]: number;
  };
  hint_cost?: number;
  location_check_points?: number;
  games?: Array<string>;
  datapackage_checksums?: {
      [id: string]: number;
  };
  seed_name?: string;


  constructor(){
  }


  onRoomInfo(event: RoomInfo){
    //TODO add password required handling
    this.is_password_needed = event.password;
    this.permissions = event.permissions;
    this.hint_cost = event.hint_cost;
    this.location_check_points = event.location_check_points;
    this.games = event.games;
    //TODO add datapackage checksum check
    this.seed_name = event.seed_name;
    //TODO add datapackage handling
    const connect_pkg = make_connect_pkg("", "pomme");
    this.socket?.send(connect_pkg);
  }

  onConnected(event: Connected){
    const players = event.players;
    const get_pkg: string = JSON.stringify([{
      "cmd": "Get",
      "keys": players.map((x) => `_read_client_status_${x.team}_${x.slot}`)
    }]);
    this.socket?.send(get_pkg);
  }
}
