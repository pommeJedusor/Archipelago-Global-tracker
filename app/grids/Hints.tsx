import { ArchipelagoApiClient, Hint, Player } from "@/ArchipelagoApiClient/ArchipelagoApiClient";

const ROW_SIZE = 24; // px
const GAP_SIZE = 2; // px

function GridHeadersRow() {
  return (
    <>
      <div className="bg-light-brown h-[24px] font-bold flex flex-col justify-center px-2 col-span-9"><p>Finder</p></div>
      <div className="bg-light-brown h-[24px] font-bold flex flex-col justify-center px-2 col-span-9"><p>Receiver</p></div>
      <div className="bg-light-brown h-[24px] font-bold flex flex-col justify-center px-2 col-span-16"><p>Item</p></div>
      <div className="bg-light-brown h-[24px] font-bold flex flex-col justify-center px-2 col-span-27"><p>Location</p></div>
      <div className="bg-light-brown h-[24px] font-bold flex flex-col justify-center px-2 col-span-11"><p>Game</p></div>
      <div className="bg-light-brown h-[24px] font-bold flex flex-col justify-center px-2 col-span-24"><p>Entrance</p></div>
      <div className="bg-light-brown h-[24px] font-bold flex flex-col justify-center text-center col-span-4"><p>Found</p></div>
    </>
  )
}

function HintRow({hint, client}: {hint: Hint, client: ArchipelagoApiClient}) {
  const receiving_player = client.players[hint.receiving_player - 1].name;
  const sending_player_game = client.players[hint.finding_player - 1].game
  const receiving_player_game = client.players[hint.receiving_player - 1].game
  const sender_datapackage = client.datapackages[sending_player_game];
  const receiver_datapackage = client.datapackages[receiving_player_game];
  if (sender_datapackage == undefined || receiver_datapackage == undefined)return;
  console.log(hint.item)
  console.log(Object.entries(receiver_datapackage.item_name_to_id).filter((item)=>item[1] == hint.item)[0][0])
  const item = Object.entries(receiver_datapackage.item_name_to_id).filter((item)=>item[1] == hint.item)[0][0]
  const location = Object.entries(sender_datapackage.location_name_to_id).filter((location)=>location[1] == hint.location)[0][0]

  return (
    <>
      <div className="bg-light-green h-[24px] px-2 col-span-9">{client.players[hint.finding_player - 1].name}</div>
      <div className="bg-light-green h-[24px] px-2 col-span-9">{receiving_player}</div>
      <div className="bg-light-green h-[24px] px-2 col-span-16">{item}</div>
      <div className="bg-light-green h-[24px] px-2 col-span-27">{location}</div>
      <div className="bg-light-green h-[24px] px-2 col-span-11">{client.players[hint.finding_player - 1].game}</div>
      <div className="bg-light-green h-[24px] px-2 col-span-24">{hint.entrance || "Vanilla"}</div>
      <div className="bg-light-green h-[24px] text-center col-span-4">{hint.found ? "✔" : ""}</div>
    </>
  )
}

export default function Hints({client}: {client: ArchipelagoApiClient}) {
  const hints = client.players?.map((player)=>player.hints || []).flat(1) || []

  let hint_rows = []
  for (let i=0;i<hints.length;i++){
    const hint = hints[i]
    hint_rows.push(<HintRow hint={hint} client={client} key={i} />)
  }

  return (
    <div className={"bg-light-brown h-min max-h-[45vh] resize-y overflow-auto grid grid-cols-100 gap-[2px] mx-2 mb-4"}>
      <GridHeadersRow />
      {hint_rows}
    </div>
  )
}
