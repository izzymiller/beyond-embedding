import React, {useState, useEffect} from "react"
import { LookerEmbedSDK } from "@looker/embed-sdk";
import { ComponentsProvider, Heading, Span, Box } from "@looker/components";
import { Embed } from "../demo/embed_input_static"


export default function App() {
  return (
    <div id="App">
      <ComponentsProvider>
        <Heading p={10} m={10} color="key" fontWeight="bold">Looker Embed Demo App</Heading>
        <Box flex>
          <Embed />
        </Box>
      </ComponentsProvider>
    </div>
  );
}