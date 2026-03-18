import { ArchipelagoApiClient, Player } from "@/ArchipelagoApiClient/ArchipelagoApiClient";

const ROW_SIZE = 24; // px
const GAP_SIZE = 2; // px

function GridHeadersRow() {
  return (
    <>
      <div className="bg-light-brown h-[48px] font-bold flex flex-col justify-center px-2 col-span-5"><p>#</p></div>
      <div className="bg-light-brown h-[48px] font-bold flex flex-col justify-center px-2 col-span-20"><p>Name</p></div>
      <div className="bg-light-brown h-[48px] font-bold flex flex-col justify-center px-2 col-span-25"><p>Game</p></div>
      <div className="bg-light-brown h-[48px] font-bold flex flex-col justify-center px-2 col-span-18"><p>Status</p></div>
      <div className="bg-light-brown h-[48px] font-bold flex flex-col justify-center text-center col-span-12"><p>Checks</p></div>
      <div className="bg-light-brown h-[48px] font-bold flex flex-col justify-center text-center col-span-8"><p>%</p></div>
      <div className="bg-light-brown h-[48px] font-bold flex flex-col justify-center text-center col-span-12"><p>Last Activity</p></div>
    </>
  )
}

function PlayerRow({player}: {player: Player}) {
  const minutes_elapsed = player.last_activity == undefined ? 0 : Math.floor((Date.now() / 1000 - player.last_activity) / 60);
  const last_activity = player.last_activity == undefined ? "N/A" : `${Math.floor(minutes_elapsed / 60)}:${minutes_elapsed % 60}`;
  return (
    <>
      <div className="bg-light-green h-[24px] font-bold px-2 col-span-5"><a className="text-red-700 hover:underline" href="">{player.slot}</a></div>
      <div className="bg-light-green h-[24px] px-2 col-span-20">{player.name}</div>
      <div className="bg-light-green h-[24px] px-2 col-span-25">{player.game || "unknown"}</div>
      <div className="bg-light-green h-[24px] px-2 col-span-18">{player.game_state}</div>
      <div className="bg-light-green h-[24px] text-center col-span-12">{player.checks?.length || 0}/?</div>
      <div className="bg-light-green h-[24px] text-center col-span-8">{"N/A"}</div>
      <div className="bg-light-green h-[24px] text-center col-span-12">{last_activity}</div>
    </>
  )
}

function TotalRow(){
  return (
    <>
      <p className="bg-light-green h-[24px] px-2 col-span-25 text-right">Total</p>
      <p className="bg-light-green h-[24px] px-2 col-span-25">All Games</p>
      <p className="bg-light-green h-[24px] px-2 col-span-18">8/11 Complete</p>
      <p className="bg-light-green h-[24px] text-center col-span-12">3571/3571</p>
      <p className="bg-light-green h-[24px] text-center col-span-8">100.00</p>
      <p className="bg-light-green h-[24px] text-center col-span-12">10478:32</p>
    </>
  )
}

export default function Players({client}: {client: ArchipelagoApiClient}) {
  const numberPlayer = client.players?.length || 0;
  const numberRow = numberPlayer + 3; // count the headers as two
  const gapNumber = numberPlayer + 1;
  const div_style = {maxHeight: `${numberRow * ROW_SIZE + gapNumber * GAP_SIZE}px`};

  let players = []
  for (const player of client.players || []){
    players.push(<PlayerRow player={player} key={(player.team, player.slot)} />)
  }

  return (
    <div style={div_style} className={"bg-light-brown h-min resize-y overflow-scroll grid grid-cols-100 gap-[2px]"}>
      <GridHeadersRow />
      {players}
      <TotalRow />
    </div>
  )
}
