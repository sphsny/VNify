import { Outlet } from 'react-router-dom'
import { NavBar } from './NavBar'

// https://next.jqueryscript.net/next-js/pwa-boilerplate-native-app-template/#Understanding_the_Shell_Layout
// page frame height visible viewport, no page scrolling
// <Outlet /> as placeholder reading context from router
export function AppShell() {
  return (
    <div className="flex h-dvh flex-col overflow-hidden">
      <NavBar />
      <Outlet />
    </div>
  )
}
