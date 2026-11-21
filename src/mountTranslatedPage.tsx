import { StrictMode, type ReactNode } from 'react'
import { createRoot } from 'react-dom/client'
import { initializeTranslations } from './i18n/config'
import './index.css'
export function mountTranslatedPage(renderPage: (initialLanguageFailed: boolean, root: HTMLElement) => ReactNode) {
  const root = document.getElementById('root')
  if (!root) throw new Error('Missing portfolio root element')

  const startupStatus = document.getElementById('startup-status')
  if (startupStatus) startupStatus.hidden = false

  function showFallback() {
    document.documentElement.lang = 'en'
    if (startupStatus) startupStatus.textContent = 'The full portfolio could not load. You can still get in touch using the links below.'
  }

  void initializeTranslations().then((result) => {
    if (!result) {
      showFallback()
      return
    }

    createRoot(root).render(
      <StrictMode>
        {renderPage(result.usedFallback, root)}
      </StrictMode>,
    )
  }).catch(showFallback)
}
