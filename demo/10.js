import React, {useState, useEffect} from "react"
import { LookerEmbedSDK } from "@looker/embed-sdk";
import { ComponentsProvider, Heading, Span, Box } from "@looker/components";
import { Embed } from "./embed"


export default function App() {
  return (
    <div id="App">
      <ComponentsProvider>
        <Heading>Looker Embed Demo</Heading>
        <Box >
          <Embed width="400px" height="400px"/>
        </Box>
      </ComponentsProvider>
    </div>
  );
}