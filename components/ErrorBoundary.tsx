import { Component, ReactNode, ErrorInfo } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
  errorInfo?: ErrorInfo
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
    this.setState({
      error,
      errorInfo
    })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          padding: '20px',
          margin: '20px',
          border: '2px solid red',
          borderRadius: '8px',
          backgroundColor: '#ffe6e6',
          fontFamily: 'monospace'
        }}>
          <h1 style={{ color: 'red', marginBottom: '15px' }}>⚠️ React Error Caught!</h1>
          <div style={{ marginBottom: '15px' }}>
            <strong>Error:</strong>
            <pre style={{ 
              backgroundColor: '#f5f5f5', 
              padding: '10px', 
              borderRadius: '4px',
              overflow: 'auto',
              whiteSpace: 'pre-wrap'
            }}>
              {this.state.error && this.state.error.toString()}
            </pre>
          </div>
          {this.state.errorInfo && (
            <div>
              <strong>Component Stack:</strong>
              <pre style={{ 
                backgroundColor: '#f5f5f5', 
                padding: '10px', 
                borderRadius: '4px',
                overflow: 'auto',
                whiteSpace: 'pre-wrap',
                fontSize: '12px'
              }}>
                {this.state.errorInfo.componentStack}
              </pre>
            </div>
          )}
        </div>
      )
    }

    return this.props.children
  }
}