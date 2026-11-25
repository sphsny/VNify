import type { TextBoxSettings } from './settings'

// sample introductory text running without the backend
export const PLACEHOLDER_CHAPTER = 'Introduction'

// will be adjusted
export const PLACEHOLDER_SENTENCES = [
  'Welcome to VNify, a visual-novel inspired web reader that accepts text, URL, and EPUB & PDF files. To progress with the text, simply click or press enter/space.',
  'To import and read a text source, navigate to the import and library pages. Text is automatically split into clean sentences, and a table of content is created.',
  'The text you are currently reading is located inside a text box. To change the text box position and size, use the left-most icon on the toolbar that is located above.',
  'To further customise the reading interface, navigate to the settings page. There you can change the font, text size, colours, behaviour and more.',
  'The toolbar includes interactive features in the following order:',
]

// the lines visible in the textbox 
// ADV -> display line-by-line, NVL -> display longer paragraph revealing lines from top to bottom
export function visibleLines(
  sentences: string[], // sentences
  index: number, // position
  settings: Pick<TextBoxSettings, 'flow' | 'maxLines'>, // adv/nvl mode and max lines shown for pre-rendering
): string[] {
  if (settings.flow === 'adv') return [sentences[index]] // current sentence in textbox
  return sentences.slice(Math.max(0, index - settings.maxLines + 1), index + 1) // sentences using max lines for nvl mode
}
