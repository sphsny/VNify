import { PageLayout } from '@/components/layout/PageLayout'

// layout: left | main
export function ImportPage() {
  return (
    <PageLayout
      left={[
        {
          title: 'Instructions',
          content: (
            <div className="space-y-4 text-sm text-muted-foreground">
              <section className="space-y-2">
                <h3 className="text-base font-medium text-primary">── # How to upload ──</h3>
                <ol className="list-decimal space-y-1 pl-5 marker:text-primary">
                  <li>Upload your source</li>
                  <li>Check extracted content and adjust where needed</li>
                  <li>Read from library</li>
                </ol>
              </section>

              <section className="space-y-2">
                <h3 className="text-base font-bold text-primary">── # Supported types ──</h3>
                <ul className="list-disc space-y-1 pl-5 marker:text-primary">
                  <li>TEXT</li>
                  <li>URL</li>
                  <li>EPUB</li>
                  <li>PDF</li>
                </ul>
              </section>
            </div>
          ),
        },
        {
          title: 'How data is stored',
          content: <p className="text-sm text-muted-foreground">
            Uploaded text stays in your local browser.
            User data synced to the cloud gets mapped to your source without ever seeing its content.</p>,
        },
      ]}
    >
      <div className="grid h-full place-items-center border">
        <p className="text-muted-foreground">Import: Main</p>
      </div>
    </PageLayout>
  )
}
