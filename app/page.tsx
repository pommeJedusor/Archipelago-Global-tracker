"use client"

import { useEffect, useState } from "react";
import Players from "./grids/Players";
import { init } from "@/ArchipelagoApiClient/init";
import { ArchipelagoApiClient } from "@/ArchipelagoApiClient/ArchipelagoApiClient";

export default function Home() {
  const [client, setClient] = useState([new ArchipelagoApiClient()]);
  client[0].setClient = setClient;

  useEffect(() => {
    init(client[0]);
  }, [])

  return (
    <div className="bg-dark-brown text-black h-screen">
      <Players client={client[0]}/>
    </div>
  );
}
