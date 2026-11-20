import type { ReactNode } from 'react'
import { Sidebar } from './Sidebar'
import type { SidebarSection } from './Sidebar'

// page layout properties:
// [left sidebar][main][right sidebar?] <- ?optimal
// each sidebar has two sections, at the top and bottom
interface PageLayoutProps {
  left: SidebarSection[]
  right?: SidebarSection[]
  children: ReactNode
}

// main panel expands when sidebars collapse, but textbox/backlog stays fixed
export function PageLayout({ left, right, children }: PageLayoutProps) {
  return (
    <div className="flex min-h-0 flex-1">
      <Sidebar side="left" sections={left} />

      <main className="min-w-0 flex-1 overflow-y-auto p-6">{children}</main>

      {right && <Sidebar side="right" sections={right} />}
    </div>
  )
}
