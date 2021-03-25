import React from "react"

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
