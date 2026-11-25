import { useState } from 'react'
import { PageLayout } from '@/components/layout/PageLayout'
import { TextBox } from '@/components/reader/TextBox'
import { useTextBox } from '@/context/TextBoxContext'
import { prefersReducedMotion } from '@/reader/settings'
import { PLACEHOLDER_CHAPTER, PLACEHOLDER_SENTENCES, visibleLines } from '@/reader/placeholder'

// layout: left, main, right
// each sidebar is split into two sections, each scrolling on its own
export function ReaderPage() {
  const { settings } = useTextBox()
  // reader state: current sentence and its reveal state
  const [index, setIndex] = useState(0)
  const [revealed, setRevealed] = useState(false)
  const atEnd = index === PLACEHOLDER_SENTENCES.length - 1
  const complete = revealed || !settings.reveal || prefersReducedMotion()

  // advance through text; if animation not finished, skip animation; else move on to the next line
  function advance() {
    if (!complete) {
      setRevealed(true)
      return
    }
    if (!atEnd) {
      setIndex(index + 1)
      setRevealed(false)
    }
  }

  // useEffect() for rest of key interactions

  // backlog with wheel event

  return (
    <PageLayout
    // left sidebar
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
      // right sidebar
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
      /* background container */
      scene
    >
      <div
        className="relative h-full cursor-pointer select-none"
        onClick={advance} /* advance text on click, don't show pointer */
      >
        <TextBox
          chapter={settings.showChapter ? PLACEHOLDER_CHAPTER : undefined} /* chapter tag */
          lines={visibleLines(PLACEHOLDER_SENTENCES, index, settings)} /* text rendered in textbox*/
          complete={complete} /* completed animation */
          showIndicator={settings.showIndicator && !atEnd} /* ctc */
          reveal={settings.reveal} /* text reveal */
          revealKey={index} /* text position */
          onRevealed={() => setRevealed(true)}
          className="fixed" /* fixed, so box is placed against viewport and not against main */
          style={{ /* textbox size and position */
            left: `${settings.frame.x}dvw`,
            top: `${settings.frame.y}dvh`,
            width: `${settings.frame.w}dvw`,
            height: `${settings.frame.h}dvh`,
          }}
        />
      </div>
    </PageLayout>
  )
}
