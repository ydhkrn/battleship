import type { GameState } from "../gameSlice"

const cellDataWithShipMock = {
  status: 0,
  ship: "destroyer",
}
const cellDataWithoutShipMock = {
  status: 0,
  ship: null,
}

const playerInitialStateMock = {
  boardData: [
    [
      {
        status: 0,
        ship: "destroyer",
      },
      {
        status: 0,
        ship: null,
      },
      {
        status: 0,
        ship: null,
      },
      {
        status: 0,
        ship: null,
      },
      {
        status: 0,
        ship: null,
      },
      {
        status: 0,
        ship: null,
      },
      {
        status: 0,
        ship: null,
      },
      {
        status: 0,
        ship: null,
      },
      {
        status: 0,
        ship: null,
      },
      {
        status: 0,
        ship: null,
      },
    ],
    [
      {
        status: 0,
        ship: "destroyer",
      },
      {
        status: 0,
        ship: null,
      },
      {
        status: 0,
        ship: null,
      },
      {
        status: 0,
        ship: null,
      },
      {
        status: 0,
        ship: null,
      },
      {
        status: 0,
        ship: null,
      },
      {
        status: 0,
        ship: null,
      },
      {
        status: 0,
        ship: null,
      },
      {
        status: 0,
        ship: null,
      },
      {
        status: 0,
        ship: null,
      },
    ],
    [
      {
        status: 0,
        ship: null,
      },
      {
        status: 0,
        ship: null,
      },
      {
        status: 0,
        ship: null,
      },
      {
        status: 0,
        ship: null,
      },
      {
        status: 0,
        ship: null,
      },
      {
        status: 0,
        ship: null,
      },
      {
        status: 0,
        ship: null,
      },
      {
        status: 0,
        ship: null,
      },
      {
        status: 0,
        ship: null,
      },
      {
        status: 0,
        ship: "carrier",
      },
    ],
    [
      {
        status: 0,
        ship: "submarine",
      },
      {
        status: 0,
        ship: "submarine",
      },
      {
        status: 0,
        ship: "submarine",
      },
      {
        status: 0,
        ship: null,
      },
      {
        status: 0,
        ship: null,
      },
      {
        status: 0,
        ship: null,
      },
      {
        status: 0,
        ship: null,
      },
      {
        status: 0,
        ship: null,
      },
      {
        status: 0,
        ship: null,
      },
      {
        status: 0,
        ship: "carrier",
      },
    ],
    [
      {
        status: 0,
        ship: null,
      },
      {
        status: 0,
        ship: null,
      },
      {
        status: 0,
        ship: null,
      },
      {
        status: 0,
        ship: null,
      },
      {
        status: 0,
        ship: null,
      },
      {
        status: 0,
        ship: null,
      },
      {
        status: 0,
        ship: null,
      },
      {
        status: 0,
        ship: null,
      },
      {
        status: 0,
        ship: null,
      },
      {
        status: 0,
        ship: "carrier",
      },
    ],
    [
      {
        status: 0,
        ship: null,
      },
      {
        status: 0,
        ship: null,
      },
      {
        status: 0,
        ship: "battleship",
      },
      {
        status: 0,
        ship: "battleship",
      },
      {
        status: 0,
        ship: "battleship",
      },
      {
        status: 0,
        ship: "battleship",
      },
      {
        status: 0,
        ship: null,
      },
      {
        status: 0,
        ship: null,
      },
      {
        status: 0,
        ship: null,
      },
      {
        status: 0,
        ship: "carrier",
      },
    ],
    [
      {
        status: 0,
        ship: null,
      },
      {
        status: 0,
        ship: null,
      },
      {
        status: 0,
        ship: null,
      },
      {
        status: 0,
        ship: null,
      },
      {
        status: 0,
        ship: null,
      },
      {
        status: 0,
        ship: null,
      },
      {
        status: 0,
        ship: null,
      },
      {
        status: 0,
        ship: null,
      },
      {
        status: 0,
        ship: null,
      },
      {
        status: 0,
        ship: "carrier",
      },
    ],
    [
      {
        status: 0,
        ship: null,
      },
      {
        status: 0,
        ship: null,
      },
      {
        status: 0,
        ship: null,
      },
      {
        status: 0,
        ship: null,
      },
      {
        status: 0,
        ship: null,
      },
      {
        status: 0,
        ship: null,
      },
      {
        status: 0,
        ship: null,
      },
      {
        status: 0,
        ship: null,
      },
      {
        status: 0,
        ship: null,
      },
      {
        status: 0,
        ship: null,
      },
    ],
    [
      {
        status: 0,
        ship: null,
      },
      {
        status: 0,
        ship: "cruiser",
      },
      {
        status: 0,
        ship: "cruiser",
      },
      {
        status: 0,
        ship: "cruiser",
      },
      {
        status: 0,
        ship: null,
      },
      {
        status: 0,
        ship: null,
      },
      {
        status: 0,
        ship: null,
      },
      {
        status: 0,
        ship: null,
      },
      {
        status: 0,
        ship: null,
      },
      {
        status: 0,
        ship: null,
      },
    ],
    [
      {
        status: 0,
        ship: null,
      },
      {
        status: 0,
        ship: null,
      },
      {
        status: 0,
        ship: null,
      },
      {
        status: 0,
        ship: null,
      },
      {
        status: 0,
        ship: null,
      },
      {
        status: 0,
        ship: null,
      },
      {
        status: 0,
        ship: null,
      },
      {
        status: 0,
        ship: null,
      },
      {
        status: 0,
        ship: null,
      },
      {
        status: 0,
        ship: null,
      },
    ],
  ],
  shipsStatus: [
    {
      shipType: "carrier",
      size: 5,
      count: 1,
      lives: 5,
    },
    {
      shipType: "battleship",
      size: 4,
      count: 1,
      lives: 4,
    },
    {
      shipType: "cruiser",
      size: 3,
      count: 1,
      lives: 3,
    },
    {
      shipType: "submarine",
      size: 3,
      count: 1,
      lives: 3,
    },
    {
      shipType: "destroyer",
      size: 2,
      count: 1,
      lives: 2,
    },
  ],
}

const initialStateMock = {
  attackingPlayer: "player1",
  player1: playerInitialStateMock,
  player2: playerInitialStateMock,
} as GameState

export {
  initialStateMock,
  playerInitialStateMock,
  cellDataWithShipMock,
  cellDataWithoutShipMock,
}
