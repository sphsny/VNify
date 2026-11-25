### Sprint 1
- Tech Stack definition ✔
- Frontend workspace set up ✔
- Backend workspace set up ✔
- API vite proxy connection ✔

### Sprint 2
- UI prototype (frontend)
    - create wireframes ✔
    - page routing ✔
    - navbar + page layouts ✔
    - reader architecture & feature definition ✔
    - reader UI prototype ✔
        - ADV textbox + chapter box, progress button ✔
        - NVL mode
        - customisable settings + static preview on the settings page ✔
        - store textbox settings in localStorage ✔
        - save custom background image in IndexedDB ✔
    - basic interaction for reader ✔
        - click, enter, space, arrow keys
        - left-to-right animated reveal, progress to complete sentence ✔
        - auto mode, progress sound + settings

### Sprint 3
- Import page
    - accept txt and epub
    - adjust source metadata

- Text processing pipeline (backend)
    - source upload
    - text processing
    - display in reader UI

- TXT and EPUB support
    - extract meta data
    - establish table of contents
    - sentence splitting (correct formatting, clean text)
    - display adjustable preview in import page
    - extract graphics

### Sprint 4
- User functions (icon toolbar)
    - bar with interactive features, expandable
    - draggable/resizable textbox
    - backlog mode
    - bookmark, pin, highlight, note -> listed in sidebars through IndexedDB, click to jump to position in text

- Library
    - keep source in library through IndexedDB
    - access user saved data (bookmarks, notes etc.) through library

### Sprint 5
- New User guidance
    - adjust introduction text

- Customisation
    - create custom icons for app, icon bar, ctc
    - presets for themes
    - allow user to save themes
    - improvements from user prototype testing

- MVP complete, test with users, adjust

### Sprint 6
- PDF and URL support
- Edge & Corner Tests

### Sprint 7
- In-built dictionary implementation
    - allow to click on a word in the displayed text
    - return something ('dictionary' not defined yet) - is it an english dictionary for capturing meaning in context? does it support translation to other languages? where to even get a dictionary? is there an api?
    - save stored vocabulary in bottom right sidebar

### Sprint 8
- User authentication
- Cloud storage

### Sprint 9
- Chrome extension

### Sprint 10
- UAT & Fixes

### Sprint 11
- Buffer

### No Sprint
- Deploy