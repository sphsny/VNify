// react context in context/TextBoxContext.ts
// css styles in index.css under .vn-*, styles applied without re-render

export type TextFlow = 'adv' | 'nvl' // adv/nvl presets (sentence-by-sentence, multiple lines)

// textbox position + size as percentages of the viewport for free dragging; doesn't move when sidebars collapse because not part of main
export interface TextBoxFrame {
  x: number
  y: number
  w: number
  h: number
}

export interface TextBoxSettings {
  // chapter tag in top left
  showChapter: boolean
  border: boolean
  chapterColour: string
  chapterBackgroundColour: string
  chapterBackgroundOpacity: number
  // textbox border
  borderWidth: number
  borderColor: string
  borderRadius: number
  // textbox background
  background: boolean
  backgroundColor: string
  backgroundOpacity: number
  // reader ui scene background
  sceneBackground: boolean
  sceneBackgroundColor: string
  sceneBackgroundOpacity: number
  // text
  font: FontKey
  fontSize: number
  fontWeight: number
  lineHeight: number
  letterSpacing: number
  textColor: string
  textShadow: number
  textShadowColor: string
  // click-to-continue indicator, shown once the line has finished
  showIndicator: boolean
  // left-to-right reveal
  reveal: boolean
  revealSpeed: number // ms between one character and the next
  // max sentences shown for NVL mode, needed because adv mode will go sentence-by-sentence, regardless of textbox size
  flow: TextFlow
  maxLines: number
  frame: TextBoxFrame
}

// default textbox settings white = ffffff black = 000000 dark grey = 121212
export const DEFAULT: TextBoxSettings = {
  showChapter: true,
  border: true,
  chapterColour: '#ffffff',
  chapterBackgroundColour: '#121212',
  chapterBackgroundOpacity: 1,
  borderWidth: 1,
  borderColor: '#ffffff',
  borderRadius: 0,
  background: true,
  backgroundColor: '#121212',
  backgroundOpacity: 0.8,

  sceneBackground: true,
  sceneBackgroundColor: '#121212',
  sceneBackgroundOpacity: 0.5,

  font: 'saira',
  fontSize: 1.25,
  fontWeight: 400,
  lineHeight: 1.5,
  letterSpacing: 0,
  textColor: '#ffffff',
  textShadow: 4,
  textShadowColor: '#000000',

  showIndicator: true,

  reveal: true,
  revealSpeed: 24,

  flow: 'adv',
  maxLines: 6,

  frame: { x: 24, y: 60, w: 52, h: 22 },
}

/* animation off when reduced motion is on */
export function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

const STORAGE_KEY = 'vnify-textbox' // local storage key

// fonts to choose from through @fontsource (imported in index.css)
// will be adjusted
export const FONTS = {
  arimo: { label: 'Arimo', stack: "'Arimo Variable', sans-serif" },
  shantell: { label: 'Shantell Sans', stack: "'Shantell Sans Variable', cursive" },
  saira: { label: 'Saira', stack: "'Saira Variable', sans-serif" },
  quicksand: { label: 'Quicksand', stack: "'Quicksand Variable', sans-serif" },
  maven: { label: 'Maven Pro', stack: "'Maven Pro Variable', sans-serif" },
} as const

// for fonts previews
export type FontKey = keyof typeof FONTS
export const FONT_KEYS = Object.keys(FONTS) as FontKey[]

// load settings from local storage, otherwise default settings, changed settings are partially updated
export function loadSettings(): TextBoxSettings {
  try {
    const raw = localStorage.getItem(STORAGE_KEY) // try to read settings from local storage
    if (!raw) return DEFAULT // apply default settings
    const saved = JSON.parse(raw) as Partial<TextBoxSettings> // apply partial changes
    return { ...DEFAULT, ...saved, frame: { ...DEFAULT.frame, ...saved.frame } }
  } catch {
    return DEFAULT // default callback
  }
}

// save settings to local storage
export function saveSettings(settings: TextBoxSettings) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
}

/* apply CSS styles on the html */
export function applyTextBoxSettings(settings: TextBoxSettings) {
  const style = document.documentElement.style
  const set = (name: string, value: string | number) => style.setProperty(name, String(value))

  set('--vn-font', (FONTS[settings.font] ?? FONTS[DEFAULT.font]).stack)
  set('--vn-font-size', `${settings.fontSize}rem`)
  set('--vn-font-weight', settings.fontWeight)
  set('--vn-line-height', settings.lineHeight)
  set('--vn-letter-spacing', `${settings.letterSpacing}em`)
  set('--vn-text-color', settings.textColor)
  set('--vn-text-shadow', settings.textShadow > 0 ? `0 0 ${settings.textShadow}px ${settings.textShadowColor}` : 'none')

  set('--vn-char-delay', `${settings.revealSpeed}ms`)

  set('--vn-chapter-color', settings.chapterColour)
  set('--vn-chapter-bg-color', settings.chapterBackgroundColour)
  set('--vn-chapter-bg-opacity', `${Math.round(settings.chapterBackgroundOpacity * 100)}%`)

  set('--vn-bg-color', settings.backgroundColor)
  set('--vn-bg-opacity', settings.background ? `${Math.round(settings.backgroundOpacity * 100)}%` : '0%')
  set('--vn-border-width', settings.border ? `${settings.borderWidth}px` : '0px')
  set('--vn-border-color', settings.borderColor)
  set('--vn-border-radius', `${settings.borderRadius}px`)

  set('--vn-scene-color', settings.sceneBackgroundColor)
  set('--vn-scene-opacity', settings.sceneBackground ? `${Math.round(settings.sceneBackgroundOpacity * 100)}%` : '0%')
}
