import App from './App'
import { mountTranslatedPage } from './mountTranslatedPage'

mountTranslatedPage((initialLanguageFailed) => <App initialLanguageFailed={initialLanguageFailed} />)
