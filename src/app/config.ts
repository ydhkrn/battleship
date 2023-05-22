const appConfig = {
  rows: 10,
  columns: 10,
  playerId: {
    player1: "player1",
    player2: "player2",
  },
  audioName: {
    hit: "hit",
    miss: "miss",
    gameOver: "gameOver",
  },
  inGameNotificationTimeout: 1500, // 1 second
} as const

export default appConfig
