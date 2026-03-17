import { Version } from "./Version";

export type RoomInfo = {
  cmd: string,
  version: Version,
  generator_version: Version,
  tags: Array<string>,
  password: Boolean,
  permissions: {[id: string]: string},
  hint_cost: Number,
  location_check_points: Number,
  games: Array<string>,
  datapackage_checksums: {[id: string]: Number},
  seed_name: string,
  time: Number
};
