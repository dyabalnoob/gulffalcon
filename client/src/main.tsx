import React from 'react'
import ReactDOM from 'react-dom/client'
import ErrorBoundary from '../../components/ErrorBoundary'
import { LanguageProvider } from '../../lib/contexts/language-context'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </ErrorBoundary>
  </React.StrictMode>,
)