import React, {useState, useEffect} from "react"
import { LookerEmbedSDK } from "@looker/embed-sdk";
import { ComponentsProvider, Heading, Span } from "@looker/components";

export default function App() {
  return (
    <div id="App">
      <ComponentsProvider>
        <Heading>Looker Embed Demo</Heading>
      </ComponentsProvider>
    </div>
  );
}