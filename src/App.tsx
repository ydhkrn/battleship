import styles from "./App.module.less"
import Game from "./components/game/Game"

function App() {
  return (
    <div className={styles.app}>
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header> */}
      <Game />
    </div>
  )
}

export default App
