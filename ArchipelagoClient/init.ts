import { ArchipelagoClient } from "./class/ArchipelagoClient";
import { Connected } from "./class/Connected";
import { Event } from "./class/Event";
import { RoomInfo } from "./class/RoomInfo";

export function init(address: string = "ws://localhost:38281"){
  let archipelago_client = new ArchipelagoClient();
  archipelago_client.socket = new WebSocket(address);

  archipelago_client.socket.addEventListener("message", (event) => {
    const res: Event = JSON.parse(event.data)[0];
    console.log(res)
    switch (res.cmd){
      case "RoomInfo":
        archipelago_client.onRoomInfo(res as RoomInfo);
        break;
      case "Connected":
        archipelago_client.onConnected(res as Connected);
        break;
    }
  });
}
