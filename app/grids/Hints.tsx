import { ArchipelagoApiClient, Hint } from "@/ArchipelagoApiClient/ArchipelagoApiClient";
import { Dispatch, SetStateAction, useState } from "react";

const ROW_SIZE = 24; // px
const GAP_SIZE = 2; // px

function GridHeadersRow({client, hints, setHints}: {client: ArchipelagoApiClient, hints: Array<Hint>, setHints: Dispatch<SetStateAction<Hint[]>>}) {
  function sortRows(getKey: ((a: Hint) => any)){
    const sorted_hints = hints.toSorted((a, b)=>compare_with_key(a, b, getKey))
    if (JSON.stringify(sorted_hints) == JSON.stringify(hints)){
      sorted_hints.reverse()
    }
    setHints(sorted_hints)
  }

  function compare_with_key(a: Hint, b: Hint, getKey: ((a: Hint) => any)){
    const value_a = getKey(a);
    const value_b = getKey(b);
    if (value_a < value_b)return -1
    if (value_a > value_b)return 1
    return 0
  }
  

  return (
    <div className="grid grid-cols-100 gap-[2px] sticky top-0 select-none">
      <div onClick={()=>sortRows((hint)=>client.players[hint.finding_player - 1].name.toUpperCase())} className="hover:cursor-pointer bg-light-brown min-h-fit h-full font-bold flex flex-col justify-center px-2 col-span-9"><p>Finder</p></div>
      <div onClick={()=>sortRows((hint)=>client.players[hint.receiving_player - 1].name.toUpperCase())} className="hover:cursor-pointer bg-light-brown min-h-fit h-full font-bold flex flex-col justify-center px-2 col-span-9"><p>Receiver</p></div>
      <div onClick={()=>sortRows((hint)=>client.datapackages[client.players[hint.receiving_player - 1].game].item_id_to_name[hint.item].toUpperCase())} className="hover:cursor-pointer bg-light-brown min-h-fit h-full font-bold flex flex-col justify-center px-2 col-span-16"><p>Item</p></div>
      <div onClick={()=>sortRows((hint)=>client.datapackages[client.players[hint.finding_player - 1].game].location_id_to_name[hint.location].toUpperCase())} className="hover:cursor-pointer bg-light-brown min-h-fit h-full font-bold flex flex-col justify-center px-2 col-span-27"><p>Location</p></div>
      <div onClick={()=>sortRows((hint)=>client.players[hint.finding_player - 1].game.toUpperCase())} className="hover:cursor-pointer bg-light-brown min-h-fit h-full font-bold flex flex-col justify-center px-2 col-span-11"><p>Game</p></div>
      <div onClick={()=>sortRows((hint)=>hint.entrance.toUpperCase() || "Vanilla".toUpperCase())} className="hover:cursor-pointer bg-light-brown min-h-fit h-full font-bold flex flex-col justify-center px-2 col-span-24"><p>Entrance</p></div>
      <div onClick={()=>sortRows((hint)=>hint.found)} className="hover:cursor-pointer bg-light-brown min-h-fit h-full font-bold flex flex-col justify-center text-center col-span-4"><p>Found</p></div>
    </div>
  )
}

function HintRow({hint, client}: {hint: Hint, client: ArchipelagoApiClient}) {
  const receiving_player = client.players[hint.receiving_player - 1].name;
  const sending_player_game = client.players[hint.finding_player - 1].game
  const receiving_player_game = client.players[hint.receiving_player - 1].game
  const sender_datapackage = client.datapackages[sending_player_game];
  const receiver_datapackage = client.datapackages[receiving_player_game];
  if (sender_datapackage == undefined || receiver_datapackage == undefined)return;
  const item = receiver_datapackage.item_id_to_name[hint.item];
  const location = sender_datapackage.location_id_to_name[hint.location];

  return (
    <div className="grid grid-cols-100 gap-[2px]">
      <div className="bg-light-green min-h-fit h-full px-2 col-span-9">{client.players[hint.finding_player - 1].name}</div>
      <div className="bg-light-green min-h-fit h-full px-2 col-span-9">{receiving_player}</div>
      <div className="bg-light-green min-h-fit h-full px-2 col-span-16">{item}</div>
      <div className="bg-light-green min-h-fit h-full px-2 col-span-27">{location}</div>
      <div className="bg-light-green min-h-fit h-full px-2 col-span-11">{client.players[hint.finding_player - 1].game}</div>
      <div className="bg-light-green min-h-fit h-full px-2 col-span-24">{hint.entrance || "Vanilla"}</div>
      <div className="bg-light-green min-h-fit h-full text-center col-span-4">{hint.found ? "✔" : ""}</div>
    </div>
  )
}

export default function Hints({client}: {client: ArchipelagoApiClient}) {
  const expected_hints = [...new Set(client.players?.map((player)=>player.hints || []).flat(1).map((hint)=>JSON.stringify(hint)) || [])].map((hint)=>JSON.parse(hint));
  const [hints, setHints] = useState<Array<Hint>>(expected_hints);
  if (hints.length != expected_hints.length){
    setHints(expected_hints);
  }
  const numberHint = hints.length || 0;
  const numberRow = numberHint + 1;
  const gapNumber = numberHint;
  const div_style = {maxHeight: `${numberRow * ROW_SIZE + gapNumber * GAP_SIZE}px`};


  let hint_rows = []
  for (let i=0;i<hints.length;i++){
    const hint = hints[i]
    hint_rows.push(<HintRow hint={hint} client={client} key={i} />)
  }

  return (
    <div style={div_style} className={"bg-light-brown h-[45vh] resize-y overflow-auto overflow-x-hidden flex flex-col gap-[2px] mx-2"}>
      <GridHeadersRow hints={hints} setHints={setHints} client={client} />
      {hint_rows}
    </div>
  )
}
