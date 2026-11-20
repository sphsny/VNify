import { useEffect, useState } from 'react'
import { PageLayout } from '@/components/layout/PageLayout'
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
      <div className="grid h-full place-items-center border">
        <div className="text-center">
          <p className="text-muted-foreground">Settings: Main</p>
          <p className="mt-2 text-sm text-muted-foreground">
            {message ?? 'loading…'}
          </p>
        </div>
      </div>
    </PageLayout>
  )
}
