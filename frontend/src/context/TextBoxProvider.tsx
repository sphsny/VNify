import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { TextBoxContext } from './TextBoxContext'
import { DEFAULT, applyTextBoxSettings, loadSettings, saveSettings } from '@/reader/settings'
import { useSceneImage } from '@/reader/sceneImage'
import type { TextBoxSettings } from '@/reader/settings'

// react context provider for the reader (exporting components/values)
// context is in TextBoxContext.ts, the values are from reader/settings.ts
export function TextBoxProvider({ children }: { children: ReactNode }) {
  // loadSettings once https://react.dev/reference/react/useState#avoiding-recreating-the-initial-state
  const [settings, setSettings] = useState(loadSettings)

  // react side effects https://dev.to/harini_magesh_fa40041cf8d/useeffect-in-react-1bd8
  // apply textboxsettings and save them to local storage
  useEffect(() => {
    applyTextBoxSettings(settings)
    saveSettings(settings)
  }, [settings])

  // on update, change the updated settings
  function update(patch: Partial<TextBoxSettings>) {
    setSettings({ ...settings, ...patch })
  }

  // on reset, set settings to default
  function reset() {
    setSettings(DEFAULT)
  }

  // load the stored background image
  const sceneImage = useSceneImage()

  return ( // use the textbox in reader and settings
    <TextBoxContext.Provider value={{ settings, update, reset, sceneImage }}>
      {children}
    </TextBoxContext.Provider>
  )
}