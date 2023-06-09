import appConfig from "./config"

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
  shipTypes: PlayerShipTypesData
  layout: PlayerShipsLayoutData
}

export enum AttackResult {
  notFired,
  hit,
  miss,
}

export type PlayerId = keyof typeof appConfig.playerId

export type Modify<T, R> = Omit<T, keyof R> & R

export type Nullable<T> = T | null

export type ObjectLiteral<K extends string = string, V = unknown> = {
  [x in K]: V
}

export type ValueOf<T> = T[keyof T]

export type AnyFunction = (...args: any[]) => any
