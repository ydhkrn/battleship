import translations from "../../app/translations"
import styles from "./styles.module.less"

function ErrorFallback() {
  return (
    <div className={styles.errorFallback}>
      {translations.textErrorMessage}
      <br />
      {translations.textClick}&nbsp;
      <button onClick={() => window.location.reload()}>
        {translations.textReload.toLowerCase()}
      </button>
    </div>
  )
}

export default ErrorFallback
