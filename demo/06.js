import React from "react"

export default function App() {
  return (
    <div id="App">
      <ComponentsProvider>
        <Heading>Looker Embed</Heading>
        <Embed />
      </ComponentsProvider>
    </div>
  );
}