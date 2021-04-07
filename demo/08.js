import React, {useState, useEffect} from "react"
import { LookerEmbedSDK } from "@looker/embed-sdk";
import { ComponentsProvider, Heading, Box } from "@looker/components";

export default function App() {
  return (
    <div id="App">
      <ComponentsProvider>
        <Heading p={10} m={10} color="key" fontWeight="bold">Looker Embed Demo App</Heading>
      </ComponentsProvider>
    </div>
  );
}