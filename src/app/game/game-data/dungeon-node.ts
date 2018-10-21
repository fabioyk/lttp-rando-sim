import { DungeonNodeStatus } from "./dungeon-node-status.enum";
import { MapNode } from "./map-node";
import { Items } from "./items";
import { Config } from "./config";

export class DungeonNode {
  x: number;
  y: number;
  name: string;
  canOpen: Function;
  canGlitch: Function;
  content: string;
  errorMessage: string;
  mapNode:MapNode;
  _status:DungeonNodeStatus;
  accessibleSectionArray: number[];
  destinationSection: number;

  constructor(name:string, x:number, y:number, 
      status:DungeonNodeStatus, canOpen:Function, content:string, 
      errorMessage:string = '', accessibleSectionArray:number[] = [-1], 
      destinationSection:number = 0, canGlitch:Function = null, 
      public mirrorAccessibleSectionArray:number[] = [-1], public mirrorDestinationSection:number = 0) {
    this.name = name;
    this.x = x;
    this.y = y;
    this.canOpen = canOpen;
    this.content = content;
    this.errorMessage = errorMessage;
    this.mapNode = new MapNode();
    this.status = status;
    this.accessibleSectionArray = accessibleSectionArray;
    this.destinationSection = destinationSection;
    this.canGlitch = canGlitch;
  }

  get status() {
    return this._status;
  }
  set status(newStatus:DungeonNodeStatus) {
    this._status = newStatus;
    this.mapNode.status = newStatus.toString();
  }

  static noReqs(items:Items, config:Config) {
    return true;
  }

  static bossReqs = [
    function armosKnights(items:Items, config:Config) {
      return items.sword || items.hammer || items.hasBow()
        || items.boomerang || (items.hasMagicBars(4) && (items.fireRod || items.iceRod))
        || (items.hasMagicBars(2) && (items.byrna || items.somaria));
    },
    function lanmolas(items:Items, config:Config) {
      return items.sword || items.hammer || items.hasBow()
        || items.fireRod || items.iceRod || items.byrna || items.somaria;
    },
    function moldorm(items:Items, config:Config) {
      return items.sword || items.hammer;
    },
    function helmasaurKing(items:Items, config:Config) {
      return items.sword || items.hasBow();
    },
    function arrghus(items:Items, config:Config) {
      return items.hookshot && (items.hammer || items.sword ||
        (items.hasMagicBars(2) || items.hasBow()) && (items.fireRod || items.iceRod));
    },
    function mothula(items:Items, config:Config) {
      return items.sword || items.hammer
        || (items.hasMagicBars(2) && (items.fireRod || items.somaria || items.byrna))
        || (items.net && items.bottle && (items.boots || (items.sword && items.quake)));
    },
    function blind(items:Items, config:Config) {
      return items.sword || items.hammer || items.somaria || items.byrna;
    },
    function kholdstare(items:Items, config:Config) {
      return items.hasMeltyPower(config) && (items.hammer || items.sword
        || (items.hasMagicBars(3) && items.fireRod)
        || (items.hasMagicBars(2) && items.fireRod && items.bombos));
    },
    function vitreous(items:Items, config:Config) {
      return items.hammer || items.sword || items.hasBow();
    },
    function trinexx(items:Items, config:Config) {
      return items.fireRod && items.iceRod
        && (items.sword >= 3 || items.hammer
          || (items.hasMagicBars(2) && items.sword >= 2)
          || (items.hasMagicBars(4) && items.sword));
    },
  ];

  static glitchedBossReqs = [
    function armosKnights(items:Items, config:Config) {
      return items.fireRod || items.iceRod || items.byrna || items.somaria;
    },
    function lanmolas(items:Items, config:Config) {
      return true;
    },
    null,
    function helmasaurKing(items:Items, config:Config) {
      return items.sword || items.hasBow() || items.hammer;
    },
    function arrghus(items:Items, config:Config) {
      return items.hookshot && (items.fireRod || items.iceRod);
    },
    function mothula(items:Items, config:Config) {
      return items.fireRod || items.somaria || items.byrna;
    },
    null,
    function kholdstare(items:Items, config:Config) {
      return items.hasMeltyPower(config)
    },
    null,
    function trinexx(items:Items, config:Config) {
      return items.fireRod && items.iceRod
        && (items.sword >= 2
          || (items.sword && items.hasMagicBars(2)));
    }
  ];

  isDoable(items:Items, config:Config):number {
    if (this.canOpen && this.canOpen(items, config)) {
      return 2;
    } else if (this.canGlitch && this.canGlitch(items, config)) {
      return 1;
    } else {
      return 0;
    }
  }
}
