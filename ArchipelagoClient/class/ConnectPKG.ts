import { ARCHIPELAGO_SUPPORTED_VERSION, Version } from "./Version";

export type ConnectPKG = {
  cmd: string,
  password: string,
  game: string,
  name: string,
  uuid: string,
  version: Version,
  items_handling: number,
  tags: Array<string>,
  slot_data: Boolean,
};

export function make_connect_pkg(password: string = "", name: string = ""): string{
    const pkg: ConnectPKG = {
      "cmd": "Connect",
      "password": password,
      "game": "",
      "name": name,
      "uuid": window.crypto.randomUUID(),
      "version": ARCHIPELAGO_SUPPORTED_VERSION,
      "items_handling": 0,
      "tags": ["Tracker", "GlobalTracker"],
      "slot_data": false,
    };
    return JSON.stringify([pkg]);
}
