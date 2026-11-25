# Reader Architecture (subject to change)

## VN Text Box features via [VN Dev Wiki](https://vndev.wiki/Textbox)

### ADV/NVL
- ADV 'adventure format' -> textbox in lower third of screen and dialogue gets revealed sentence-by-sentence
- NVL 'novel format' -> textbox covers the majority of the screen and dialogue gets revealed from top to bottom

### Text presentation
- each line appears one by one
- revealed from left to right, like being "written"
- automatic linewrapping

**name plate area**
- usually where the character's name is displayed, will be used for chapter/title

**click-to-continue (CTC) indicator**
- appears in a corner of the textbox
- confirms to the reader that there is no more text left in the passage (that consists of multiple sentences and can span over multiple text boxes)
- reader should click to continue to the next line

### Quick menu
- small menu on textbox that allows to take actions and access menus, in VNify this will be at the top of the screen and actions will be indicated with icons

**common actions**
- skip* text button -> potentially
- autoplay** toggle button -> included
- view backlog*** button -> included
- hide textbox button -> no
- quick save/quick load buttons -> bookmarks
- button that opens the options menu -> toolbar
- button that opens the save/load menu -> library
- textbox window options -> settings

*skipping allows to speed up parts of the text/can also be toggled when a key is held down
**common feature that makes text advance automatically
***shows multiple previous lines of text, typically with a scrollbar

## VNify features

### Formats
- ADV/NVL text box formats for reading text (adjust in settings)
- backlog/scrolling format:
    - includes all text starting from the current position
    - can be progressed back and fourth
    - active line focused, past/future text dimmed

### Features (Icon Bar)

- Layout -> unlocks the text box for dragging/resizing
- Reading Mode -> hides navbar + sidebars
- Pin -> pins selected line/graphic
- Backlog -> switches from text box format to the scrolling format
- Bookmark -> saves current position, sync with left sidebar
- Highlight -> save current paragraph, sync with right sidebar
- Note -> opens text area and saves note related to current paragraph, sync with right sidebar
- Auto-mode -> auto-advance toggle
- Sound -> advancing sound toggle

### Customisation & Settings

**Text flow**
ADV/NVL selector

**Text box**
The text box is freely adjustable/draggable from the Reader UI through [pointer events](https://developer.mozilla.org/en-US/docs/Web/API/Element/setPointerCapture) and is located inside the viewport stage:
- position
- size

The rest of the settings are adjustable through the settings page:

**Reader Background**
- colour
- image (allow custom upload)
- opacity

**Text Box Contents**
- background on/off, colour, opacity
- border on/off, thickness, colour, radius
- chapter tag on/off
- CTC on/off, font, colour, background, opacity
- ADV/NVL format, amount of sentences

**Text**
- font
- size
- thickness
- colour
- shadow
- letter spacing
- line spacing

**Progression**
- reveal animation on/off + speed ([CSS animation](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Animations/Using))
- auto-advance on/off + delay
- advancing sound on/off + selection
- backlog active line location for scrolling (top/middle/bottom)

**Presets**
- popular VNs

## Reader Architecture

1. Reader appearance: CSS + React through [Context](https://react.dev/reference/react/createContext)
2. Reader text logic: backend
3. Reader location: React useState(), passed to ReaderStage and Sidebars

### 1. Reader appearance

- custom CSS properties in index.css/.vn-* and applied as inline html
- default settings and logic in settings.ts
- user-side adjustable settings on SettingsPage.tsx
- <TextBox> in ReaderPage.tsx/SettingsPage.tsx preview, renders the same live text box
- TextBoxProvider.tsx updates the settings as shared app context and applies the custom CSS to TextBoxContext.ts
- RevealText.tsx for text reveal logic + animations in index.css
- sceneImage.ts storing the uploaded background png/jpeg in IndexedDB

### 2. Text logic and interaction

Placeholder/introduction text is stored in the frontend under placeholder.ts.

Otherwise, text splitting happens in the backend, where:
- a **paragraph** is the split text from the processed source.
- a **sentence** is the current displayed paragraph, and gets saved when the bookmark, note or highlight feature is used. The backlog lists multiple sentences.
- a **segment** is the current paragraph broken into smaller sentences, that gets revealed through animation and upon interaction. It prevents the current sentence to be revealed at once, and sets natural breaks at e.g. commas. The CTC indicator appears only on the last segment of a paragraph (which can stretch across multiple textlines/textboxes).

Text is stored in IndexedDB and includes metadata (title, author, ...), table of contents (id, title) and sentences (id, chapterId, segments).

### 3. Reader state
The reader state keeps track of the current text progression, recording text position (sentence + segment) and animation state.

### Interaction
- text box format: click, Enter, Space, arrow keys (first press on a still-animating line completes line instead of skipping it) -> in ReaderPage.tsx
- backlog format: same + scrolling wheel
- features: stored by ID so it jumps to the sentence when accessed in the side bars/library

### Storage
- appearance settings -> localStorage (one JSON object)
- reading position + saved sentences -> IndexedDB (db.ts)
- source text -> process in backend, store in IndexedDB (db.ts)