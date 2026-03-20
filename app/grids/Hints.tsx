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

function HintRow({hint, players}: {hint: Hint, players: Array<Player>}) {
  console.log(players)
  console.log(hint.finding_player)
  return (
    <>
      <div className="bg-light-green h-[24px] px-2 col-span-9">{players[hint.finding_player - 1].name}</div>
      <div className="bg-light-green h-[24px] px-2 col-span-9">{hint.receiving_player}</div>
      <div className="bg-light-green h-[24px] px-2 col-span-16">{hint.item}</div>
      <div className="bg-light-green h-[24px] px-2 col-span-27">{hint.location}</div>
      <div className="bg-light-green h-[24px] px-2 col-span-11">{players[hint.finding_player - 1].game}</div>
      <div className="bg-light-green h-[24px] px-2 col-span-24">{hint.entrance || "Vanilla"}</div>
      <div className="bg-light-green h-[24px] text-center col-span-4">{hint.found ? "✔" : ""}</div>
    </>
  )
}

export default function Hints({client}: {client: ArchipelagoApiClient}) {
  const hints = client.players?.map((player)=>player.hints || []).flat(1) || []
  const numberHint = hints.length || 0;
  const numberRow = numberHint + 1;
  const gapNumber = numberHint;
  const div_style = {maxHeight: `${numberRow * ROW_SIZE + gapNumber * GAP_SIZE}px`};
  const players = client.players as Array<Player>

  let hint_rows = []
  for (const hint of hints){
    hint_rows.push(<HintRow hint={hint} players={players} key={(hint.location, hint.finding_player)} />)
  }

  return (
    <div style={div_style} className={"bg-light-brown h-min resize-y overflow-auto grid grid-cols-100 gap-[2px]"}>
      <GridHeadersRow />
      {hint_rows}
    </div>
  )
}
