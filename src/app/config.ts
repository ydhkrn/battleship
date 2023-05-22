const appConfig = {
  rows: 10,
  columns: 10,
  playerId: {
    player1: "player1",
    player2: "player2",
  },
  inGameNotificationTimeout: 1000, // 1 second
} as const

export default appConfig
