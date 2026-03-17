import { make_connect_pkg } from "./ConnectPKG";
import { RoomInfo } from "./RoomInfo";


export class ArchipelagoClient{

  socket?: WebSocket;

  player_name?: string = undefined;
  password?: string;

  is_password_needed?: Boolean;
  permissions?: {
      [id: string]: string;
  };
  hint_cost?: Number;
  location_check_points?: Number;
  games?: Array<string>;
  datapackage_checksums?: {
      [id: string]: number;
  };
  seed_name?: string;


  constructor(){
  }


  onRoomInfo(event: RoomInfo){
    console.log(this)
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
}
