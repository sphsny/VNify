import { PageLayout } from '@/components/layout/PageLayout'

// layout: left, main, right
export function LibraryPage() {
  return (
    <PageLayout
      left={[
        {
          title: 'Folders',
          content: <p className="text-muted-foreground">/literature<br></br>/academia</p>,
        },
        {
          title: 'Tags',
          content: <p className="text-muted-foreground">#fav<br></br>#uni</p>,
        },
      ]}
      right={[
        {
          title: 'Search',
          content: <p className="text-muted-foreground">Search author, notes, etc.</p>,
        },
        {
          title: 'Stats',
          content: <p className="text-muted-foreground">Imports, highlights, notes, etc.</p>,
        },
      ]}
    >
      <div className="grid h-full place-items-center border">
        <p className="text-muted-foreground">Library: Main</p>
      </div>
    </PageLayout>
  )
}
