import appConfig from "./config";

// TODO: enumerate "carrier" | "battleship" | "cruiser" | "submarine" | "destroyer";
export type ShipType = string

export type ShipPositions = number[][]

export type ShipData = { size: number; count: number }

export type PlayerShipTypesData = {
  [x: ShipType]: ShipData
}

export type ShipsLayoutData = {
  ship: ShipType
  positions: ShipPositions
}

export type PlayerShipsLayoutData = ShipsLayoutData[]

export type PlayerData = {
  shipTypes: PlayerShipTypesData;
  layout: PlayerShipsLayoutData;
}

export enum FireStatus {
  notFired,
  hit,
  miss,
}

export type Modify<T, R> = Omit<T, keyof R> & R;

export type Nullable<T> = T | null;

export type PlayerId = keyof typeof appConfig.playerId
