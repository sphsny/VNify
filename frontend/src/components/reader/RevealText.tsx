import { Fragment } from 'react'
import type { CSSProperties } from 'react'
import { cn } from '@/lib/utils'

// pure CSS animation https://www.cingopablo.com/experiments/letter-cascade
// left-to-right reveal, letter by letter (each letter has its own inline index via span)
// animation itself in index.css
// assumes strings and whitespaces (as in placeholder text)

interface RevealTextProps {
  text: string
  instant?: boolean /* skip the animation and show the whole line at once */
  onDone?: () => void /* called whne the last character has finished appearing */
}

export function RevealText({ text, instant, onDone }: RevealTextProps) {
  let position = 0
  const parts = text // split the text into parts
    .split(/(\s+)/) // keep whitespaces
    // map text by parts (sentence) and chars (each character) for left-to-right reveal animation
    .map((part) => ({ part, chars: [...part].map((char) => ({ char, index: position++ })) }))

  // line is finished when the last character's animation ends
  const lastIndex = position - 1

  return (
    <>
      <span aria-hidden="true" className={cn(instant && 'vn-instant')}> {/* no animation if instant true */}
        
        {parts.map(({ part, chars }, partIndex) => {
          // each char is in its own span
          const spans = chars.map(({ char, index }) => (
            <span
              key={index}
              className="vn-char"
              style={{ '--i': index } as CSSProperties}
              onAnimationEnd={index === lastIndex ? onDone : undefined}
            >
              {char}
            </span>
          ))

          return /\s/.test(part) ? ( // test that each part contains strings and whitespaces
            // return whitespaces
            <Fragment key={partIndex}>{spans}</Fragment>
          ) : ( // return each word belonging to each key, .vn-word ensures words are not split across two lines while revealing
            <span key={partIndex} className="vn-word"> 
              {spans} {/* each char (span) of a part (sentence) */}
            </span>
          )
        })}
      </span>
    </>
  )
}
