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
  inGameNotificationTimeout: 1500, // 1.5 second

  /**
   * @see https://www.w3.org/TR/html-aria/#docconformance
   */
  ariaRoles: {
    button: "button",
    section: "region",
    img: "img",
  },
} as const

export default appConfig
