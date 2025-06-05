import type React from "react"

export function renderMarkdownToReact(markdown: string): React.ReactNode {
  // Simple markdown to React converter
  const lines = markdown.split("\n")
  const elements: React.ReactNode[] = []

  let currentIndex = 0

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]

    if (line.startsWith("# ")) {
      elements.push(
        <h1 key={currentIndex++} className="text-2xl font-bold mb-4 mt-6">
          {line.substring(2)}
        </h1>,
      )
    } else if (line.startsWith("## ")) {
      elements.push(
        <h2 key={currentIndex++} className="text-xl font-semibold mb-3 mt-5">
          {line.substring(3)}
        </h2>,
      )
    } else if (line.startsWith("### ")) {
      elements.push(
        <h3 key={currentIndex++} className="text-lg font-medium mb-2 mt-4">
          {line.substring(4)}
        </h3>,
      )
    } else if (line.startsWith("- ")) {
      elements.push(
        <li key={currentIndex++} className="ml-4 mb-1">
          {line.substring(2)}
        </li>,
      )
    } else if (line.startsWith("**") && line.endsWith("**")) {
      elements.push(
        <p key={currentIndex++} className="font-semibold mb-2">
          {line.substring(2, line.length - 2)}
        </p>,
      )
    } else if (line.trim() !== "") {
      elements.push(
        <p key={currentIndex++} className="mb-2">
          {line}
        </p>,
      )
    } else {
      elements.push(<br key={currentIndex++} />)
    }
  }

  return <div className="prose max-w-none">{elements}</div>
}
