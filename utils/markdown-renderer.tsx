import type React from "react"

export function renderMarkdownToReact(text: string): React.ReactNode[] {
  const lines = text.split("\n")
  const elements: React.ReactNode[] = []
  let key = 0

  const processInlineMarkdown = (text: string): React.ReactNode[] => {
    const parts: React.ReactNode[] = []
    const currentText = text
    let partKey = 0

    // Process **bold** text
    const boldRegex = /\*\*(.*?)\*\*/g
    let lastIndex = 0
    let match

    while ((match = boldRegex.exec(currentText)) !== null) {
      // Add text before the match
      if (match.index > lastIndex) {
        const beforeText = currentText.substring(lastIndex, match.index)
        if (beforeText) {
          parts.push(<span key={partKey++}>{beforeText}</span>)
        }
      }

      // Add the bold text
      parts.push(
        <strong key={partKey++} className="font-bold text-green-700 dark:text-green-300">
          {match[1]}
        </strong>,
      )

      lastIndex = match.index + match[0].length
    }

    // Add remaining text
    if (lastIndex < currentText.length) {
      const remainingText = currentText.substring(lastIndex)
      if (remainingText) {
        parts.push(<span key={partKey++}>{remainingText}</span>)
      }
    }

    // If no bold text was found, return the original text
    if (parts.length === 0) {
      parts.push(<span key={partKey++}>{currentText}</span>)
    }

    return parts
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]

    if (line.trim() === "") {
      elements.push(<br key={key++} />)
      continue
    }

    // Handle headers
    if (line.startsWith("# ")) {
      elements.push(
        <h1 key={key++} className="text-2xl font-bold mt-6 mb-4 text-green-700 dark:text-green-400">
          {processInlineMarkdown(line.substring(2))}
        </h1>,
      )
    } else if (line.startsWith("## ")) {
      elements.push(
        <h2 key={key++} className="text-xl font-bold mt-5 mb-3 text-green-600 dark:text-green-300">
          {processInlineMarkdown(line.substring(3))}
        </h2>,
      )
    } else if (line.startsWith("### ")) {
      elements.push(
        <h3 key={key++} className="text-lg font-semibold mt-4 mb-2 text-green-600 dark:text-green-300">
          {processInlineMarkdown(line.substring(4))}
        </h3>,
      )
    } else if (line.startsWith("- ")) {
      // Handle bullet points
      elements.push(
        <div key={key++} className="ml-4 mb-1 flex items-start">
          <span className="text-green-500 mr-2 mt-1">•</span>
          <span className="flex-1">{processInlineMarkdown(line.substring(2))}</span>
        </div>,
      )
    } else if (line.startsWith("* ")) {
      // Handle asterisk bullet points
      elements.push(
        <div key={key++} className="ml-4 mb-1 flex items-start">
          <span className="text-green-500 mr-2 mt-1">•</span>
          <span className="flex-1">{processInlineMarkdown(line.substring(2))}</span>
        </div>,
      )
    } else {
      // Regular paragraph
      elements.push(
        <p key={key++} className="mb-2 leading-relaxed">
          {processInlineMarkdown(line)}
        </p>,
      )
    }
  }

  return elements
}
