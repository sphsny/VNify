import { useEffect, useState } from 'react'
import { PageLayout } from '@/components/layout/PageLayout'
import { TextBoxSettings } from '@/components/reader/TextBoxSettings'
import { getMessage } from '@/api/client'

export function SettingsPage() {
  const [message, setMessage] = useState<string | null>(null)

  // sprint 1 checkpoint (FastAPI proxy)
  useEffect(() => {
    let ignore = false
    getMessage()
      .then((data) => {
        if (!ignore) setMessage(data.msg)
      })
      .catch(() => {
        if (!ignore) setMessage('Backend not reachable')
      })
    return () => {
      ignore = true
    }
  }, [])

  return (
    <PageLayout
      left={[
        {
          title: 'Themes',
          content: (
            <div className="space-y-4 text-sm text-muted-foreground">
              <section className="space-y-2">
                <h3 className="text-base font-medium text-primary">── # Saved Themes ──</h3>
              </section>

              <section className="space-y-2">
                <h3 className="text-base font-bold text-primary">── # Preset themes ──</h3>

              </section>
            </div>
          ),
        },
        {
          title: 'Profile',
          content: <p className="text-muted-foreground">User data</p>,
        },
      ]}
    >
      {/* display text box settings component from TextBoxSettings.tsx */}
      <TextBoxSettings />
      {/* sprint 1 checkpoint, will be moved */}
      <p className="mx-auto max-w-5xl px-6 pb-2 text-xs text-muted-foreground">backend: {message ?? 'loading…'}</p>
    </PageLayout>
  )
}
