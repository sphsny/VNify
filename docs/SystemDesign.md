Sprint 1 (13/11/2026)

# Tech Stack

The following technologies were chosen with performance, customisation and maintainability as priority.

## Frontend

- [React](https://react.dev/learn): UI library using components for dynamic, high performance applications
- [TypeScript](https://www.typescriptlang.org/docs/handbook/intro.html): programming language based on JavaScript with improved type safety
- [Vite](https://vite.dev/guide/): fast development server
- [Tailwind v4](https://tailwindcss.com/docs/installation/using-vite): CSS framework with built-in utility classes for customisation, animations, etc.
- [shadcn/ui](https://ui.shadcn.com/docs): collection of pre-built React components

## Backend
- [FastAPI](fastapi.tiangolo.com): web framework for building APIs with Python, very fast performance
- [UV](docs.astral.sh/uv): extremely fast Python package and project manager
- Python libraries for backend logic

## Database
- Local storage: IndexedDB + [Dexie.js](https://dexie.org/docs/Tutorial/Dexie-Cloud) wrapper
- External storage: [Supabase](https://supabase.com/docs/guides/getting-started/quickstarts/reactjs) handling database & auth

## Tools
- GitHub CI: automatic deploy, code tests and checks
- Netlify: frontend hosting
- ?: backend hosting

# Repository Set Up 

1. Frontend:
```
npm create vite@latest frontend -- --template react-ts
cd frontend
npm install
npm run dev
```
Checkpoint: Get started page displayed in localhost

1.2. Add Tailwind CSS & shadcn/ui

- Following this [Installation manual](https://ui.shadcn.com/docs/installation/vite)

Checkpoint: Display styled Button in App.tsx