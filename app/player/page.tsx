"use client"

import { useEffect, useState } from "react";
import { init } from "@/ArchipelagoApiClient/init";
import { ArchipelagoApiClient } from "@/ArchipelagoApiClient/ArchipelagoApiClient";
import Hints from "../grids/Hints";

export default function Home() {
  const [player, setPlayer] = useState<number|undefined>(undefined);
  const [client, setClient] = useState([new ArchipelagoApiClient()]);
  client[0].setClient = setClient;

  useEffect(() => {
    init(client[0]);
    const address_parameter = window.location.href.split("?")[1]?.split("&").map((parameter)=>parameter.split("=")).filter((parameter)=>parameter[0]=="player")[0];
    if (address_parameter != undefined) setPlayer(parseInt(address_parameter[1]));
  }, [])

  return (
    <div className="bg-dark-brown text-black min-h-screen">
      <Hints client={client[0]} player={player}/>
    </div>
  );
}
