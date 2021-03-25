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


function Embed() {
  const [dashboardEmbedded, setDashboardEmbedded] = useState(false);
  useEffect(() => {
    createUrlAndEmbedDashboard();
  }, []);

  let createUrlAndEmbedDashboard = async () => {
    const embed_url = await sdk.ok(
      sdk.create_embed_url_as_me({
        target_url: `https://dat.dev.looker.com/embed/dashboards-next/19
        ?embed_domain=${document.location.origin}
        &sdk=2`
      })
    );

    LookerEmbedSDK.init("https://dat.dev.looker.com");
    LookerEmbedSDK.createDashboardWithUrl(embed_url.url)
      .appendTo(document.getElementById("App"))
      .withClassName("embeddedDashboard")
      .build()
      .connect()
      .then((dashboard) => {
        setDashboardEmbedded(true);
      });
  };
  return <div id="EmbedContainer"></div>;
}
