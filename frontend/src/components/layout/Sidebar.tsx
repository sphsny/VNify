import { useState } from 'react'
import type { ReactNode } from 'react'

// each section has a title + a scrollable content body
export interface SidebarSection {
  title: ReactNode
  content?: ReactNode
}

// default properties
interface SidebarProps {
  side: 'left' | 'right' // left or right
  sections: SidebarSection[] // title and content
}

// max width 16rem when open, scales with the window via clamp
// https://dev.to/rowsanali/how-to-use-tailwind-css-with-the-clamp-function-for-responsive-designs-2pn
const OPEN_WIDTH = 'w-[clamp(9rem,20vw,16rem)]'

// expandable sidebar for each side
// state either open/closed, animated with transition-width class
// split into two sections (min-h-0 + flex-1) where each one has its own scroll section
export function Sidebar({ side, sections }: SidebarProps) {
  const [open, setOpen] = useState(true)

  return (
    <aside
      className={[
        // animation
        'flex shrink-0 flex-col overflow-hidden transition-[width] duration-200',
        side === 'left' ? 'border-r border-border' : 'border-l border-border',
        open ? OPEN_WIDTH : 'w-14',
      ].join(' ')}
    >
      {sections.map((section, i) => {
        if (!open && i > 0) return null
        return (
          <section
            key={i}
            className={[
              'flex min-h-0 flex-1 flex-col',
              // separator between sections
              i > 0 ? 'border-t-2 border-border' : '',
            ].join(' ')}
          >
            {/* first header */}
            <div className="flex h-12 shrink-0 items-center justify-between border-b border-border px-2">
              {open && <div className="min-w-0 truncate px-2 text-base">꒰ {section.title} ꒱</div>}

              {/* one collapse button per sidebar in the top header */}
              {/* maybe enable closing/opening upon hovering? */}
              {i === 0 && (
                <button
                  type="button"
                  onClick={() => setOpen(!open)}  
                  aria-expanded={open}
                  aria-label={open ? 'Collapse sidebar' : 'Expand sidebar'}
                  className="size-10 shrink-0 hover:bg-muted"
                >
                  {/* collapse 'buttons', maybe replace with icons */}
                  {side === 'left' ? (open ? '‹' : '›') : open ? '›' : '‹'}
                </button>
              )}
            </div>

            {/* fill left over of section and allow to scroll in it */}
            {open && (
              <div
                className={[
                  OPEN_WIDTH,
                  'min-h-0 flex-1 overflow-y-auto p-4', // scroll container
                  side === 'right' ? 'self-end' : '', // fixes animation bug where wrapped text would be shown when expanding the panel
                ].join(' ')}
              >
                {section.content}
              </div>
            )}
          </section>
        )
      })}
    </aside>
  )
}
