import React from "react"
import { MDXProvider } from "@mdx-js/react"
import Content from "../demo/agenda.md"

export default function Page() {
  return (
    <MDXProvider components={components}>
      <Content />
    </MDXProvider>
  )
}

const components = {
  h1: ({ children }) => (
    <h1 style={{ padding: "12px" }}>
      {children}
    </h1>
  ),
}
