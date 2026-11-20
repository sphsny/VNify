import { PageLayout } from '@/components/layout/PageLayout'

// layout: left, main, right
// each sidebar is split into two sections, each scrolling on its own
export function ReaderPage() {
  return (
    <PageLayout
      left={[
        {
          title: 'Table of Contents',
          content: <p className="text-muted-foreground">Chapters</p>,
        },
        {
          title: 'Bookmarks',
          content: <p className="text-muted-foreground">Saved positions</p>,
        },
      ]}
      right={[
        {
          title: 'Notes and Highlights',
          content: <p className="text-muted-foreground">Notes and Highlights</p>,
        },
        {
          title: 'Vocabulary',
          content: <p className="text-muted-foreground">Saved vocabulary</p>,
        },
      ]}
    >
      <div className="grid h-full place-items-center border">
        <p className="text-muted-foreground">Reader: Main</p>
      </div>
    </PageLayout>
  )
}
