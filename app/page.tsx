"use client"

import { useEffect } from "react";
import Players from "./grids/Players";
import { init } from "@/ArchipelagoClient/init";

export default function Home() {
  useEffect(() => {
    init();
  }, [])

  return (
    <div className="bg-dark-brown h-screen">
      <Players />
    </div>
  );
}
