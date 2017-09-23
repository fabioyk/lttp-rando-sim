import { ItemLocation } from "./item-location";
import { Config } from "./config";
import { LightWorld } from "./chest-data-filling/light-world";
import { DarkWorld } from "./chest-data-filling/dark-world";


export class OverworldData {
  lwLocations: ItemLocation[];
  dwLocations: ItemLocation[];
  constructor(locations:string[], config:Config) {
    this.lwLocations = LightWorld.setup(locations, config);
    this.dwLocations = DarkWorld.setup(locations, config);
  }
}
