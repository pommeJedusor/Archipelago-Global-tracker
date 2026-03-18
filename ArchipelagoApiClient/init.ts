import { ArchipelagoApiClient } from "./ArchipelagoApiClient";

export function init(client: ArchipelagoApiClient, address: string = "ws://localhost:8765"){
  client.socket = new WebSocket(address)

  client.socket.addEventListener("message", (event) => {
    const players = JSON.parse(event.data);
    client.players = players
    client.setClient([client])
    console.log(players)
  });
}
