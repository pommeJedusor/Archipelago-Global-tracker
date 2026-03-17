import { ArchipelagoClient } from "./class/ArchipelagoClient";

export function init(address: string = "ws://localhost:38281"){
  let archipelago_client = new ArchipelagoClient();
  archipelago_client.socket = new WebSocket(address);

  archipelago_client.socket.addEventListener("message", (event) => {
    const res = JSON.parse(event.data)[0];
    console.log(res)
    switch (res.cmd){
      case "RoomInfo":
        archipelago_client.onRoomInfo(res);
        break;
      case "Connected":
        //TODO
        break;
    }
  });
}
