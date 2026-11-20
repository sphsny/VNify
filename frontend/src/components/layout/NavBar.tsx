import { NavLink } from 'react-router-dom'
import icon from '@/assets/icon.svg'
import { ModeToggle } from './ModeToggle'

const PAGES = [
  { to: '/reader', label: 'Reader' },
  { to: '/library', label: 'Library' },
  { to: '/import', label: 'Import' },
  { to: '/settings', label: 'Settings' },
]

// 3 sections: [VNify icon] [page routes] [light/dark mode toggle]
// left and right section use flex-1 so page links are centered

// https://www.geeksforgeeks.org/reactjs/link-and-navlink-components-in-react-router-dom/
// NavLink keeps track of the active route/page

export function NavBar() {
  return (
    <header className="shrink-0 border-b border-border">
      <nav className="flex h-16 items-center gap-6 px-12">
        {/* left: icon (currently place holder from https://www.magnific.com/icon/book_9427901#fromView=search&page=1&position=14&uuid=a492a714-cf0d-43d3-9953-58287c6d8056) */}
        <div className="flex min-w-0 flex-1 items-center gap-2">
          <img src={icon} alt="" className="size-8 shrink-0" />
          <span className="truncate text-xl font-semibold">VNify</span>
        </div>

        {/* centre: page links */}
        <ul className="flex shrink-0 items-center gap-4">
          {PAGES.map((page) => (
            <li key={page.to}>
              <NavLink
                to={page.to}
                className={({ isActive }) =>
                  isActive
                    ? 'block px-4 py-2 uppercase tracking-wider bg-primary text-primary-foreground'
                    : 'block px-4 py-2 uppercase tracking-wider text-muted-foreground hover:bg-muted'
                }
              >
                {page.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* right: dark/light mode */}
        <div className="flex min-w-0 flex-1 justify-end">
          <ModeToggle />
        </div>
      </nav>
    </header>
  )
}
