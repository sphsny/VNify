import { useRef } from 'react'
import type { CSSProperties } from 'react'
import { ChevronDown } from 'lucide-react'
import { RevealText } from './RevealText'
import { cn } from '@/lib/utils'

// live textbox and static preview on the settings page
// custom style properties from .vn-* in index.css, applied by applyTextBoxSettings()
interface TextBoxProps {
  chapter?: string /* chapter tag in the top left, hidden when absent */
  lines: string[] /* text sentences */
  complete?: boolean /* animation reveal */
  showIndicator?: boolean /* CTC indicator when sentence finished */
  className?: string /* applied classes */
  style?: CSSProperties /* the frame: where the box sits in the viewport */
  reveal?: boolean /* animate the current line left to right */
  revealKey?: string | number /* change this to replay the animation */
  onRevealed?: () => void /* the current line has finished appearing */
}

/* applied settings */
export function TextBox({
  chapter,
  lines,
  complete = true,
  showIndicator = true,
  className,
  style,
  reveal = false,
  revealKey,
  onRevealed,
}: TextBoxProps) {
  const textRef = useRef<HTMLDivElement>(null) // useRef react hook

  {/* text render using useRef hook https://karan51ngh.medium.com/the-ultimate-guide-to-reacts-useref-hook-in-typescript-3789471519bf */}
  return (
    // textbox
    <div className={cn('vn-textbox flex flex-col', className)} style={style}>
      {/* chapter tag */}
      {chapter && <span className="vn-chapter">{chapter}</span>}

      {/* hold text reference as div */}
      <div ref={textRef} className="vn-text min-h-0 flex-1 overflow-hidden px-6 py-5"> {/* scrolling disabled (overflow) */}
        {/* map lines by index */}
        {lines.map((line, index) => {
          // get current line https://react.dev/learn/rendering-lists#where-to-get-your-key
          const current = index === lines.length - 1 // total lines - 1 for animation
          return ( // if not current and past
            <p key={index} className={cn(!current && 'vn-past')}> 
              {current && reveal ? (
                // animate/display current line
                <RevealText key={revealKey} text={line} instant={complete} onDone={onRevealed} />
              ) : (
                line // display past lines
              )}
            </p>
          )
        })}
      </div>

      {/* show CTC icon upon complete */}
      {showIndicator && complete && (
        <span className="vn-ctc" aria-hidden="true">
          <ChevronDown className="size-4" /> {/* ChevronDown symbol, downturned ^ */}
        </span>
      )}
    </div>
  )
}
