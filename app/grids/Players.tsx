import { ArchipelagoApiClient, Player } from "@/ArchipelagoApiClient/ArchipelagoApiClient";

const ROW_SIZE = 24; // px
const GAP_SIZE = 2; // px

function number_to_two_digit_number(x: number){
  const x_string = x.toString();
  return "0".repeat(2 - x_string.length) + x_string
}

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
  const last_activity = player.last_activity == undefined ? "N/A" : `${Math.floor(minutes_elapsed / 60)}:${number_to_two_digit_number(minutes_elapsed % 60)}`;
  const percentage_check = ((player.checks?.length || 0) / player.location_number * 100).toFixed(2)

  return (
    <>
      <div className="bg-light-green h-[24px] font-bold px-2 col-span-5"><a className="text-red-700 hover:underline" href="">{player.slot}</a></div>
      <div className="bg-light-green h-[24px] px-2 col-span-20">{player.name}</div>
      <div className="bg-light-green h-[24px] px-2 col-span-25">{player.game || "unknown"}</div>
      <div className="bg-light-green h-[24px] px-2 col-span-18">{player.game_state}</div>
      <div className="bg-light-green h-[24px] text-center col-span-12">{player.checks?.length || 0}/{player.location_number}</div>
      <div className="bg-light-green h-[24px] text-center col-span-8">{percentage_check}</div>
      <div className="bg-light-green h-[24px] text-center col-span-12">{last_activity}</div>
    </>
  )
}

function TotalRow({client}: {client: ArchipelagoApiClient}){
  const number_of_players = client.players?.length
  const number_of_goal_completed = client.players?.filter((player)=>player.game_state == "Goal Completed").length
  const number_of_checks = client.players?.map((player)=>player.checks?.length || 0).reduce((x, y)=>x + y, 0)
  const number_of_locations = client.players?.map((player)=>player.location_number).reduce((x, y)=>x + y, 0)
  const percentage_check = client.players == undefined ? "N/A" : (number_of_checks as number / (number_of_locations as number) * 100).toFixed(2)
  const minutes_elapseds = client.players?.filter((player)=>player.last_activity != undefined).map((player)=>Math.floor((Date.now() / 1000 - (player.last_activity as number)) / 60))
  const last_activity = minutes_elapseds == undefined ? "N/A" : `${Math.floor(Math.min(...minutes_elapseds) / 60)}:${number_to_two_digit_number(Math.min(...minutes_elapseds) % 60)}`;

  return (
    <>
      <p className="bg-light-green h-[24px] px-2 col-span-25 text-right">Total</p>
      <p className="bg-light-green h-[24px] px-2 col-span-25">All Games</p>
      <p className="bg-light-green h-[24px] px-2 col-span-18">{client.players == undefined ? "N/A" : `${number_of_goal_completed}/${number_of_players} Complete`}</p>
      <p className="bg-light-green h-[24px] text-center col-span-12">{number_of_checks}/{number_of_locations}</p>
      <p className="bg-light-green h-[24px] text-center col-span-8">{percentage_check}</p>
      <p className="bg-light-green h-[24px] text-center col-span-12">{last_activity}</p>
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
      <TotalRow client={client} />
    </div>
  )
}
