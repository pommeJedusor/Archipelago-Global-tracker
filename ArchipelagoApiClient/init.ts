import { ArchipelagoApiClient } from "./ArchipelagoApiClient";

export function init(client: ArchipelagoApiClient){
  const address_parameter = location.href.split("?")[1]?.split("&").map((parameter)=>parameter.split("=")).filter((parameter)=>parameter[0]=="address")[0];
  const address = address_parameter == undefined ? "ws://localhost:8765" : address_parameter[1];

  client.socket = new WebSocket(address)
  client.socket.addEventListener("message", (event) => {
    const players = JSON.parse(event.data);
    client.players = players
    client.setClient([client])
    console.log(players)
  });
}
