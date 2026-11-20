import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'

// toggles the dark class in index.html
// @custom-variant dark + .dark token block in index.css
// https://tailwindcss.com/docs/dark-mode#toggling-dark-mode-manually

type Mode = 'dark' | 'light' // dark or light

export const MODE_KEY = 'vnify-mode'

// dark is the default: only an explicit 'light' choice leaves dark mode
// (the docs default to the OS preference instead, see note below)
function storedMode(): Mode {
  return localStorage.getItem(MODE_KEY) === 'light' ? 'light' : 'dark'
}

export function ModeToggle() {
  // read localStorage once
  const [mode, setMode] = useState<Mode>(storedMode)
  const isDark = mode === 'dark'

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark)
    localStorage.setItem(MODE_KEY, mode)
  }, [mode, isDark])

  return (
    <Button
      variant="ghost"
      size="icon-lg"
      onClick={() => setMode(isDark ? 'light' : 'dark')}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {/* icons from lucide */}
      {isDark ? <Sun /> : <Moon />}
    </Button>
  )
}
