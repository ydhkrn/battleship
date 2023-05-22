import { Component, ReactNode } from "react"

export type AnyError = any
export type AnyErrorInfo = any

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: AnyError) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true }
  }

  componentDidCatch(error: AnyError, info: AnyErrorInfo) {
    // Example "componentStack":
    //   in ComponentThatThrows (created by App)
    //   in ErrorBoundary (created by App)
    //   in div (created by App)
    //   in App
    console.error("ErrorBoundary : ", error, info.componentStack)
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return this.props.fallback
    }

    return this.props.children
  }
}

export type ErrorBoundaryProps = {
  children?: ReactNode
  fallback?: ReactNode
}

export type ErrorBoundaryState = {
  hasError: boolean
}

export default ErrorBoundary
