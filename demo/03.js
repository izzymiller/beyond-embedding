import React from "react"
import { MDXProvider } from "@mdx-js/react"
import Content from "../demo/hello.md"

export default function Page() {
  return (
    <div>
    </div>
  )
}

const components = {
  wrapper: Wrapper,
}

function Wrapper({ children }) {
  return (
    <div style={{ }}>
      {children}
    </div>
  )
}
