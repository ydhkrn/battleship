import styles from "./styles.module.less"

function ErrorFallback() {
  return (
    <div className={styles.errorFallback}>
      Sorry! Some error occurred!
      <br />
      Please click&nbsp;
      <button onClick={() => window.location.reload()}>reload</button>
    </div>
  )
}

export default ErrorFallback
