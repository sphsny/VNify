import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { Sidebar } from './Sidebar'
import type { SidebarSection } from './Sidebar'

// page layout properties:
// [left sidebar][main][right sidebar?] <- ?optimal
// each sidebar has two sections, at the top and bottom
interface PageLayoutProps {
  left: SidebarSection[]
  right?: SidebarSection[]
  scene?: boolean
  children: ReactNode
}

export function PageLayout({ left, right, scene, children }: PageLayoutProps) {
  return (
  /* vn scene background */
    <div className={cn('flex min-h-0 flex-1', scene && 'vn-bg')}>
      {/* left sidebar */}
      <Sidebar side="left" sections={left} />
      {/* main container, content added by each page */}
      <main className="min-w-0 flex-1 overflow-y-auto">{children}</main>
      {/* right sidebar */}
      {right && <Sidebar side="right" sections={right} />}
    </div>
  )
}
