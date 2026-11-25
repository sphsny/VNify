import { useState } from 'react'
import type { ReactNode } from 'react'
import { Play, RotateCcw, UploadIcon, X } from 'lucide-react'
import { TextBox } from './TextBox'
import { Button, buttonVariants } from '@/components/ui/button'
import { useTextBox } from '@/context/TextBoxContext' // customised live textbox
import { cn } from '@/lib/utils' // shadcnui
import { FONTS, FONT_KEYS, prefersReducedMotion } from '@/reader/settings' // fonts and animation settings
import { SCENE_IMAGE_TYPES } from '@/reader/sceneImage' // image
import type { TextBoxSettings as Settings } from '@/reader/settings' // textbox settings
import { PLACEHOLDER_CHAPTER, PLACEHOLDER_SENTENCES, visibleLines } from '@/reader/placeholder' // placeholder text

// textbox customisation settings except for size/layout

// each setting as a row with their label and hint, two col layout on wide screens
function Row({
  label,
  hint,
  wide,
  children,
}: {
  label: string
  hint?: string
  wide?: boolean
  children: ReactNode
}) {
  return (
    <label
      className={cn(
        'flex items-center justify-between border-b gap-4 py-1.5',
        wide && 'lg:col-span-2',
      )}
    >
      <span className="flex min-w-0 flex-col">
        <span className="text-sm">{label}</span>
        {hint && <span className="text-xs text-muted-foreground">{hint}</span>}
      </span>
      {/* the setting selector */}
      <span className="flex shrink-0 items-center gap-3">{children}</span>
    </label>
  )
}

// reusable slider
function Slider({
  value,
  min,
  max,
  step,
  onChange,
}: {
  value: number
  min: number
  max: number
  step: number
  onChange: (value: number) => void
}) {
  return (
    <>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="h-2 w-52 cursor-pointer accent-primary"
      />
    </>
  )
}

// reusable toggle
function Toggle({ checked, onChange }: { checked: boolean; onChange: (checked: boolean) => void }) {
  return (
    <input
      type="checkbox"
      checked={checked}
      onChange={(event) => onChange(event.target.checked)}
      className="size-7 cursor-pointer accent-primary"
    />
  )
}

// colour picker
function Colour({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return (
    <>
      <input
        type="color"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-9 w-16 cursor-pointer bg-background"
      />
    </>
  )
}
// setting section for components
function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="space-y-2">
      {/* title */}
      <h3 className="text-base font-bold bg-primary text-primary-foreground pl-4">[ {title} ]</h3>
      {/* the settings for each section, two columns on large screens */}
      <div className="grid gap-x-10 lg:grid-cols-2">{children}</div>
    </section>
  )
}

// the entire textbox applied customisation settings
export function TextBoxSettings() {
  const { settings, update, reset, sceneImage } = useTextBox()
  const [replay, setReplay] = useState(0)
  const [previewDone, setPreviewDone] = useState(false)
  const previewComplete = previewDone || !settings.reveal || prefersReducedMotion()

  const displayedLine = PLACEHOLDER_SENTENCES.length - 5

  return (
    <div className="mx-auto max-w-5xl px-6">
      {/* textbox is pinned using sticky, so changes can be previewed (while main containing settings can be scrolled) */}
      <div className="sticky top-0 z-10 space-y-3 border-b border-border bg-background pt-6 pb-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-primary">Textbox Preview</h3>
          <div className="flex gap-2">
            {/* animation replay button */}
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                setReplay(replay + 1)
                setPreviewDone(false)
              }}
            >
              <Play /> Replay
            </Button>
            {/* reset settings to default button */}
            <Button size="sm"
            variant="ghost"
            onClick={reset}>
              <RotateCcw /> Reset all {/* lucide rotate icon */}
            </Button>
          </div>
        </div>

        {/* reader background */}
        <div className="vn-bg h-56 p-4">
          {/* live textbox preview to preview settings, changes render on change and and update the style */}
          <TextBox
            chapter={settings.showChapter ? PLACEHOLDER_CHAPTER : undefined}
            lines={visibleLines(PLACEHOLDER_SENTENCES, displayedLine, settings)}
            complete={previewComplete}
            showIndicator={settings.showIndicator}
            reveal={settings.reveal}
            revealKey={replay}
            onRevealed={() => setPreviewDone(true)}
            className="h-full"
          />
        </div>
      </div>

      <div className="space-y-6 pt-6">

        {/* text box section */}
        <Section title="Text Box">

          {/* chapter tag settings */}
          <Row label="Chapter tag" hint="chapter name on the top left">
            <Toggle checked={settings.showChapter} onChange={(showChapter) => update({ showChapter })} />
          </Row>

          <Row label="Chapter tag text colour">
            <Colour value={settings.chapterColour} onChange={(chapterColour) => update({ chapterColour })} />
          </Row>

          <Row label="Chapter tag background">
            <Colour
              value={settings.chapterBackgroundColour}
              onChange={(chapterBackgroundColour) => update({ chapterBackgroundColour })}
            />
          </Row>

          <Row label="Chapter tag opacity">
            <Slider
              value={settings.chapterBackgroundOpacity}
              min={0}
              max={1}
              step={0.02}
              onChange={(chapterBackgroundOpacity) => update({ chapterBackgroundOpacity })}
            />
          </Row>

          {/* click-to-continue indicator */}
          <Row label="CTC indicator" hint="indicator that a line has finished in the bottom right corner">
            <Toggle checked={settings.showIndicator} onChange={(showIndicator) => update({ showIndicator })} />
          </Row>

          {/* textbox border settings */}
          <Row label="Border">
            <Toggle checked={settings.border} onChange={(border) => update({ border })} />
          </Row>
          <Row label="Border thickness">
            <Slider
              value={settings.borderWidth}
              min={0}
              max={8}
              step={1}
              onChange={(borderWidth) => update({ borderWidth })}
            />
          </Row>

          <Row label="Border colour">
            <Colour value={settings.borderColor} onChange={(borderColor) => update({ borderColor })} />
          </Row>

          <Row label="Border radius">
            <Slider
              value={settings.borderRadius}
              min={0}
              max={40}
              step={1}
              onChange={(borderRadius) => update({ borderRadius })}
            />
          </Row>

          <Row label="Background">
            <Toggle checked={settings.background} onChange={(background) => update({ background })} />
          </Row>

          <Row label="Background colour">
            <Colour value={settings.backgroundColor} onChange={(backgroundColor) => update({ backgroundColor })} />
          </Row>

          <Row label="Background opacity">
            <Slider
              value={settings.backgroundOpacity}
              min={0}
              max={1}
              step={0.02}
              onChange={(backgroundOpacity) => update({ backgroundOpacity })}
            />
          </Row>
        </Section>

        <Section title="Background">
          <Row label="Reader Background">
            <Toggle checked={settings.sceneBackground} onChange={(sceneBackground) => update({ sceneBackground })} />
          </Row>

          <Row label="Background colour">
            <Colour value={settings.sceneBackgroundColor} onChange={(sceneBackgroundColor) => update({ sceneBackgroundColor })} />
          </Row>

          <Row label="Background opacity" hint="tints the image when there is one">
            <Slider
              value={settings.sceneBackgroundOpacity}
              min={0}
              max={1}
              step={0.02}
              onChange={(sceneBackgroundOpacity) => update({ sceneBackgroundOpacity })}
            />
          </Row>

          {/* https://uploadcn.dev/docs/components/upload */}
          <Row label="Background image" hint="jpg/png, stored on this device only" wide>
            <label className={cn(buttonVariants({ size: 'sm', variant: 'outline' }), 'cursor-pointer')}>
              <UploadIcon />
              {sceneImage.url ? 'Replace image' : 'Upload image'}
              <input
                type="file"
                accept={SCENE_IMAGE_TYPES.join(',')}
                className="sr-only"
                onChange={(event) => {
                  const file = event.target.files?.[0]
                  if (file) void sceneImage.set(file)
                  event.target.value = ''
                }}
              />
            </label>
            {sceneImage.url && (
              <Button size="sm" variant="ghost" onClick={() => void sceneImage.clear()}>
                <X /> Remove image
              </Button>
            )}
          </Row>
        </Section>

        {/* text section with min/max values chosen in slider */}
        <Section title="Text">
          {/* font selection, fonts defined in settings.ts/imported in index.css */}
          <div className="space-y-2 border-b border-border/50 py-2 lg:col-span-2">
            <span className="block text-sm">Fonts</span>
            <div className="grid grid-cols-2 gap-1 md:grid-cols-3">
              {/* for each font, display them with their font in selectable buttons */}
              {FONT_KEYS.map((key) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => update({ font: key })}
                  style={{ fontFamily: FONTS[key].stack }}
                  className={cn(
                    'border px-2 py-1.5 text-left text-base',
                    settings.font === key // selected font
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-input hover:bg-muted',
                  )}
                >
                  {FONTS[key].label}
                </button>
              ))}
            </div>
          </div>

          {/* font size */}
          <Row label="Size">
            <Slider
              value={settings.fontSize}
              min={1.0}
              max={2.0}
              step={0.05}
              onChange={(fontSize) => update({ fontSize })}
            />
          </Row>

          {/* thickness */}
          <Row label="Thickness">
            <Slider
              value={settings.fontWeight}
              min={100}
              max={900}
              step={100}
              onChange={(fontWeight) => update({ fontWeight })}
            />
          </Row>

          {/* line spacing */}
          <Row label="Line spacing" hint="Vertical space">
            <Slider
              value={settings.lineHeight}
              min={1}
              max={2.5}
              step={0.05}
              onChange={(lineHeight) => update({ lineHeight })}
            />
          </Row>

          {/* letter spacing */}
          <Row label="Letter spacing" hint="Horizontal space">
            <Slider
              value={settings.letterSpacing}
              min={-0.10}
              max={0.15}
              step={0.01}
              onChange={(letterSpacing) => update({ letterSpacing })}
            />
          </Row>

          {/* font size */}
          <Row label="Text Colour">
            <Colour value={settings.textColor} onChange={(textColor) => update({ textColor })} />
          </Row>

          {/* shadow */}
          <Row label="Shadow">
            <Slider
              value={settings.textShadow}
              min={0}
              max={16}
              step={1}
              onChange={(textShadow) => update({ textShadow })}
            />
          </Row>

          {/* shadow colour */}
          <Row label="Shadow colour">
            <Colour value={settings.textShadowColor} onChange={(textShadowColor) => update({ textShadowColor })} />
          </Row>
        </Section>

        {/* text progress section */}
        <Section title="Progression">
          {/* animation */}
          <Row label="Reveal animation" hint="animates the text being written from left to right">
            <Toggle checked={settings.reveal} onChange={(reveal) => update({ reveal })} />
          </Row>

          {/* reveal speed */}
          <Row label="Reveal speed" hint="animation delay">
            <Slider
              value={settings.revealSpeed}
              min={0}
              max={80}
              step={1}
              onChange={(revealSpeed) => update({ revealSpeed })}
            />
          </Row>
        </Section>

        {/* text flow */}
        <Section title="Text Flow">

          {/* preset */}
          <Row label="Preset" hint="ADV displays the current sentence, NVL fills the screen with multiple sentences">
            <select
              value={settings.flow}
              onChange={(event) => update({ flow: event.target.value as Settings['flow'] })}
              className="border border-input bg-background px-2 py-1 text-sm"
            >
              <option value="adv">ADV</option>
              <option value="nvl">NVL</option>
            </select>
          </Row>

          {/* max sentences in NVL mode */}
          <Row label="Sentences shown (NVL mode)" hint="Min = 1, Max = 12">
            <Slider
              value={settings.maxLines}
              min={1}
              max={12} /* estimate */
              step={1}
              onChange={(maxLines) => update({ maxLines })}
            />
          </Row>
        </Section>
      </div>
    </div>
  )
}
