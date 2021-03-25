import React from "react"
import { MDXProvider } from "@mdx-js/react"
import Content from "../demo/hello.md"

export default function Page() {
  return (
    <div>
      <center>
        <iframe src="https://master.dev.looker.com/embed/dashboards-next/5027" width={"1000"} height={"450"} />
      </center>
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
