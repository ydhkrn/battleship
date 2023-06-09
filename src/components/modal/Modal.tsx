import { PropsWithChildren } from "react"
import { createPortal } from "react-dom"
import styles from "./styles.module.less"
import classNames from "classnames"

function Modal(props: ModalProps) {
  return (
    <>
      {props.isVisible &&
        createPortal(
          <div className={classNames(styles.modal, props.className)}>
            <div
              className={classNames(
                styles.modalContent,
                props.contentClassName,
              )}
            >
              {props.children}
            </div>
          </div>,
          document.body,
        )}
    </>
  )
}

export type ModalProps = PropsWithChildren<{
  className?: string
  contentClassName?: string
  isVisible: boolean
}>

export default Modal
