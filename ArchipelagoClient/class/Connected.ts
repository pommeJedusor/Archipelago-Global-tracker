import { NetworkPlayer } from "./NetworkPlayer";
import { NetworkSlot } from "./NetworkSlot";

export type Connected = {
  cmd: string,
  team: number,
  slot: number,
  players: Array<NetworkPlayer>,
  missing_locations: Array<number>,
  checked_locations: Array<number>,
  slot_info: {[id: number]: NetworkSlot},
  hint_points: number,
};
