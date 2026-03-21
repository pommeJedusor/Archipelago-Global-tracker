import { ArchipelagoApiClient } from "./ArchipelagoApiClient";

export function init(client: ArchipelagoApiClient){
  const address_parameter = location.href.split("?")[1]?.split("&").map((parameter)=>parameter.split("=")).filter((parameter)=>parameter[0]=="address")[0];
  const address = address_parameter == undefined ? "ws://localhost:8765" : address_parameter[1];

  client.socket = new WebSocket(address)
  client.socket.addEventListener("message", (event) => {
    const message_type = event.data.slice(0, event.data.indexOf(" "));
    const message_content = event.data.slice(event.data.indexOf(" ") + 1);
    if (message_type == "players"){
      client.players = JSON.parse(message_content)
      client.setClient([client])

      // get the datapackage's hash for every game in the archipelago room
      const games = new Set(client.players.map((player)=>player.game))
      for (const game of games){
        client.socket?.send(`hash ${game}`)
      }
    }
    else if (message_type == "hash_datapackage"){
      const hash: string = message_content.slice(0, message_content.indexOf(" "));
      const game: string = message_content.slice(message_content.indexOf(" ") + 1);
      if (JSON.parse(localStorage.getItem(`${game}`) || "{}").hash != hash){
        client.socket?.send(`${game}`)
      }else {
        const datapackage = JSON.parse(localStorage.getItem(`${game}`) as string);
        client.load_datapackage(datapackage);
        client.setClient([client])
      }
    }
    else if (message_type == "datapackage"){
      console.log(message_type)
      console.log(JSON.parse(message_content))
      const datapackage = JSON.parse(message_content)
      localStorage.setItem(`${datapackage.game}`, message_content)
      client.load_datapackage(datapackage);
      client.setClient([client])
    }
  });
}
