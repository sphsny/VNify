Sprint 2

## Frontend
Rendering speed and smoothness is the priority.
The UI is kept simple to reduce user confusion and distractions.
The Reader UI itself uses custom CSS for a VN style feel and to allow users to adapt it to their liking.

### components/layout/
- AppShell: static Navbar, only main content gets updated
- ModeToggle: dark/light mode toggle in the right corner of Navbar, updated in index.html
- NavBar: [icon/name][pages][mode toggle]
- PageLayout: [left sidebar][main][optimal right sidebar]
- Sidebar: left/right sidebars divided into 2 sections with title/content props each

### components/pages/
- routing through react-router-dom
- Reader:
- Library:
- Import:
- Settings:

### styles
- index.css: shadcn/ui global styles
- ui/ -> shadcn/ui components
- otherwise tailwindCSS classes/custom CSS
- lucide for icons/custom icons

## Backend
