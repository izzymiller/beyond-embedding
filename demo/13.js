import React, {useState, useEffect} from "react"
import { LookerEmbedSDK } from "@looker/embed-sdk";
import { ComponentsProvider, Heading, Box } from "@looker/components";
import { Embed } from "./embed"


export default function App() {
  return (
    <div id="App">
      <ComponentsProvider>
        <Heading p={10} m={10}>Looker Embed Demo App</Heading>
        <Box flex>
          <Embed />
        </Box>
      </ComponentsProvider>
    </div>
  );
}