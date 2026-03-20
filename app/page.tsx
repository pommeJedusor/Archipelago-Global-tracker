"use client"

import { useEffect, useState } from "react";
import Players from "./grids/Players";
import { init } from "@/ArchipelagoApiClient/init";
import { ArchipelagoApiClient } from "@/ArchipelagoApiClient/ArchipelagoApiClient";
import Hints from "./grids/Hints";

export default function Home() {
  const [client, setClient] = useState([new ArchipelagoApiClient()]);
  client[0].setClient = setClient;

  useEffect(() => {
    init(client[0]);
  }, [])

  return (
    <div className="bg-dark-brown text-black h-screen">
      <Hints client={client[0]}/>
    </div>
  );
}
