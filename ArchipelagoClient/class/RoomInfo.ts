import { Version } from "./Version";

export type RoomInfo = {
  cmd: string,
  version: Version,
  generator_version: Version,
  tags: Array<string>,
  password: Boolean,
  permissions: {[id: string]: number},
  hint_cost: number,
  location_check_points: number,
  games: Array<string>,
  datapackage_checksums: {[id: string]: number},
  seed_name: string,
  time: number
};
