import React from "react"

export default function App() {
  //you can write javascript code here
  const x = "This is generated from a Javascript statement"
  return (
    <div id="App">
      This is a React App. Hi, Mom!
      <br />
      {/* And then you can reference it here! */}
      {x}
    </div>
  );
}