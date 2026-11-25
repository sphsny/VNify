import { createContext, useContext } from 'react'
import type { TextBoxSettings } from '@/reader/settings'
import type { SceneImage } from '@/reader/sceneImage'

// https://youtu.be/D66ej8uVeVU https://react.dev/reference/react/createContext#provider
// textbox context shared across application
// settings defined in reader/settings.ts
// applied from TextBoxProvider.tsx

export interface TextBoxStore {
  settings: TextBoxSettings // settings
  update: (patch: Partial<TextBoxSettings>) => void // on update
  reset: () => void // on reset
  sceneImage: SceneImage // the reader UI background image, kept in IndexedDB
}

// create context
export const TextBoxContext = createContext<TextBoxStore | null>(null) // default value null, react finds the matching provider in the react tree

// usecontext
export function useTextBox(): TextBoxStore {
  const store = useContext(TextBoxContext)
  if (store === null) {
    throw new Error('useTextBox must be used inside TextBoxProvider') // throw error when used somewhere else
  }
  return store
}
