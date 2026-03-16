const ROW_SIZE = 24; // px
const GAP_SIZE = 2; // px

function GridHeaders() {
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

function Player() {
  return (
    <>
      <div className="bg-light-green h-[24px] font-bold px-2 col-span-5"><a className="text-red-700 hover:underline" href="https://archipelago.gg/generic_tracker/gAubCVEOSoqzYTNMghvbRg/0/1">1</a></div>
      <div className="bg-light-green h-[24px] px-2 col-span-20">Ace</div>
      <div className="bg-light-green h-[24px] px-2 col-span-25">Ocarina of Time</div>
      <div className="bg-light-green h-[24px] px-2 col-span-18">Goal Completed</div>
      <div className="bg-light-green h-[24px] text-center col-span-12">889/889</div>
      <div className="bg-light-green h-[24px] text-center col-span-8">100.00</div>
      <div className="bg-light-green h-[24px] text-center col-span-12">10478:32</div>
    </>
  )
}

function Total(){
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

export default function Players() {
  const numberPlayer = 7;
  const numberRow = numberPlayer + 3; // count the headers as two
  const gapNumber = numberPlayer + 1;
  const div_style = {maxHeight: `${numberRow * ROW_SIZE + gapNumber * GAP_SIZE}px`};
  return (
    <div style={div_style} className={"bg-light-brown h-min resize-y overflow-scroll grid grid-cols-100 gap-[2px]"}>
      <GridHeaders />
      <Player />
      <Player />
      <Player />
      <Player />
      <Player />
      <Player />
      <Player />
      <Total />
    </div>
  )
}
