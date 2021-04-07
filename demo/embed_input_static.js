import React, {useState, useEffect} from "react"
import { LookerEmbedSDK } from "@looker/embed-sdk";
import {InputDateRange} from "@looker/components"

import { SDK } from "./pblsession";


const base_url = "https://dat.dev.looker.com:19999";
const token_endpoint =
  "https://us-central1-pbl-demo-2020-281322.cloudfunctions.net/retrieve-access-token-node-data-dev-looker";

let sdk = SDK({ base_url, token_endpoint });

export function Embed() {
    const [dashboardEmbedded, setDashboardEmbedded] = useState(false);
    useEffect(() => {
      createUrlAndEmbedDashboard();
    }, []);

    let createUrlAndEmbedDashboard = async () => {
      const embed_url = await sdk.ok(
        sdk.create_embed_url_as_me({
          target_url: `https://dat.dev.looker.com/embed/dashboards-next/1?embed_domain=${document.location.origin}&sdk=2`
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
    return(
      <div id="EmbedContainer">
        <InputDateRange/>
      </div>
    );
  }