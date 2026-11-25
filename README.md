# VNify -  a visual novel style web reader

VNify is a **web-based reader interface**, that allows desktop readers to enhance their digital reading experience.  
Imported **text sources are split into sentences, displayed in a clean, customisable interface, and stored in a library**.  
Additionally, interactive in-built functions such as **navigation, progress saving, highlighting, annotating, pinning and a context-based dictionary** are accessible within the reader interface.

## Project Vision

**For** digital readers who frequently read books, articles, blog posts and other longer text formats in their web browser

**Whose** attention is interfered by changing layouts, styles and visual clutter, whose sources and progress gets lost, and whose reading is interrupted by using additional external applications to store notes or use a dictionary

**The** VNify web application

**Is** a customisable web reader inspired by the Japanese visual novel genre

**That** automatically splits imported sources into sentences, saves them in a library, and allows users to read text in a customisable interface that saves progress and adds interactive functions such as highlighting, note taking and an in-built dictionary

**Different** from existing web-based solutions that offer limited functionality and solve only parts of the problems introduced by digital reading

**VNify** combines all of the existing solutions into one platform that focuses on improving accessibility, motivation and cognitive engagement

## Contribution

This final-year dissertation investigates whether an implemented web reader interface can improve the problems introduced by digital environments, such as interrupted attention, shallow processing and disorientation, and increase reading motivation, engagement, comprehension and speed.

The project contributes to existing literature that explores the effects of digital reading, particularly in regards to web reading, and combines existing solutions into one reader interface, that focuses on the potential of customisation and interactive features, and introduces sentenced based reading that is inspired by the Japanese 'visual novel' game genre. The application builds upon established findings to justify its design choices, and uses Codesign for its development.

The final deliverable is a fully working hosted web application, that allows a user to upload different text sources, read them in a customisable interface, and use in-built interactive functions. The web application is developed using common web application frameworks and follows professional considerations and documentation throughout.

## Tech Stack
    
**Frontend**
[![React][React.js]][React-url] [![TypeScript][TypeScript]][TypeScript-url] [![Vite][Vite]][Vite-url]

**Backend**
[![Python][Python]][Python-url] [![FastAPI][FastAPI]][FastAPI-url]

**Storage**
[![IndexedDB][IndexedDB]][IndexedDB-url]

**Testing & Tooling**
[![Vitest][Vitest]][Vitest-url] [![Pytest][Pytest]][Pytest-url] [![GitHub Actions][GitHubActions]][GitHubActions-url]

<!-- Frontend -->
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://react.dev/

[TypeScript]: https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white
[TypeScript-url]: https://www.typescriptlang.org/

[Vite]: https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white
[Vite-url]: https://vite.dev/

<!-- Backend -->
[Python]: https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white
[Python-url]: https://www.python.org/

[FastAPI]: https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white
[FastAPI-url]: https://fastapi.tiangolo.com/

<!-- Storage -->
[IndexedDB]: https://img.shields.io/badge/IndexedDB-4479A1?style=for-the-badge&logo=googlechrome&logoColor=white
[IndexedDB-url]: https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API

<!-- Testing & Tooling -->
[Vitest]: https://img.shields.io/badge/Vitest-6E9F18?style=for-the-badge&logo=vitest&logoColor=white
[Vitest-url]: https://vitest.dev/

[Pytest]: https://img.shields.io/badge/Pytest-0A9EDC?style=for-the-badge&logo=pytest&logoColor=white
[Pytest-url]: https://docs.pytest.org/

[GitHubActions]: https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=githubactions&logoColor=white
[GitHubActions-url]: https://github.com/features/actions

## Folder Structure
Created using `tree` command and adjusted to keep most relevant files (e.g. dependencies are excluded).
```bash
├── README.md
├── backend
│   ├── README.md
│   ├── app
│   └── tests
├── docs
│   ├── Learning-Log.md
│   ├── Reader.md
│   ├── Sprints.md
│   ├── System-Design.md
│   └── Tech-Stack.md
└── frontend
    ├── README.md
    ├── index.html
    ├── public
    ├── src
    │   ├── App.tsx
    │   ├── api
    │   │   └── client.ts
    │   ├── assets
    │   │   ├── icon.svg
    │   ├── components
    │   │   ├── layout
    │   │   │   ├── AppShell.tsx
    │   │   │   ├── ModeToggle.tsx
    │   │   │   ├── NavBar.tsx
    │   │   │   ├── PageLayout.tsx
    │   │   │   └── Sidebar.tsx
    │   │   ├── reader
    │   │   │   ├── RevealText.tsx
    │   │   │   ├── TextBox.tsx
    │   │   │   └── TextBoxSettings.tsx
    │   │   └── ui
    │   │       ├── button.tsx
    │   │       └── card.tsx
    │   ├── context
    │   │   ├── TextBoxContext.ts
    │   │   └── TextBoxProvider.tsx
    │   ├── db.ts
    │   ├── index.css
    │   ├── main.tsx
    │   ├── pages
    │   │   ├── ImportPage.tsx
    │   │   ├── LibraryPage.tsx
    │   │   ├── ReaderPage.tsx
    │   │   └── SettingsPage.tsx
    │   └── reader
    │       ├── autoMode.ts
    │       ├── placeholder.ts
    │       ├── progressSound.ts
    │       ├── sceneImage.ts
    │       └── settings.ts
    └── vite.config.ts
```

---
Developed at University of Plymouth  
Supervised by Amir Aly
