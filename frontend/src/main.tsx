import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { TextBoxProvider } from '@/context/TextBoxProvider'
import { applyTextBoxSettings, loadSettings } from '@/reader/settings'

// apply textbox styles from default/local storage before react renders the DOM
applyTextBoxSettings(loadSettings())

// https://www.geeksforgeeks.org/reactjs/browserrouter-in-react/
// BrowserRouter -> routing without full page reloads
// routes defined in App.tsx
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <TextBoxProvider> {/* textbox context, shared by reader UI and settings page */}
        <App /> {/* the SPA appshell, navbar, layouts, pages, ... */}
      </TextBoxProvider>
    </BrowserRouter>
  </StrictMode>,
)
