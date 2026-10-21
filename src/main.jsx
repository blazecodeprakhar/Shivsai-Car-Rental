import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Prevent saving/downloading images via right-click
document.addEventListener('contextmenu', (e) => {
  if (e.target.tagName === 'IMG' || e.target.closest('img')) {
    e.preventDefault()
  }
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
