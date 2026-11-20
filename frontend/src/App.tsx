import { Navigate, Route, Routes } from 'react-router-dom'
import { AppShell } from '@/components/layout/AppShell'
import { ImportPage } from '@/pages/ImportPage'
import { LibraryPage } from '@/pages/LibraryPage'
import { ReaderPage } from '@/pages/ReaderPage'
import { SettingsPage } from '@/pages/SettingsPage'

// SPA set up: only inner content gets updated on the page
// https://youtu.be/Ip65MmyG00k
// routes to the pages, default route to library
export default function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route index element={<Navigate to="/library" replace />} />

        <Route path="/reader" element={<ReaderPage />} />
        <Route path="/library" element={<LibraryPage />} />
        <Route path="/import" element={<ImportPage />} />
        <Route path="/settings" element={<SettingsPage />} />

        <Route path="*" element={<Navigate to="/library" replace />} />
      </Route>
    </Routes>
  )
}
