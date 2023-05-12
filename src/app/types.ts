// TODO: enumerate "carrier" | "battleship" | "cruiser" | "submarine" | "destroyer";
export type ShipType = string

export type ShipPositions = Array<number[]>

export type ShipTypeData = {
  [x: ShipType]: { size: number; count: number }
}

export type ShipLayoutData = Array<{
  ship: ShipType
  positions: ShipPositions
}>

export type PlayerData = {
  shipTypes: ShipTypeData;
  layout: ShipLayoutData;
}

export enum FireStatus {
  notFired,
  hit,
  miss,
}