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
    const [selectedDate, setSelectedDate] = useState({
      //
      from: new Date(),
      to: new Date()
    });
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

    const handleChange = (dateRange) => {
      //
      setSelectedDate(dateRange);
      updateFilters(dateRange);
    };

    const updateFilters = (newRange) => {
      //
      if (Object.keys(dashboard).length) {
        const oneDay = 24 * 60 * 60 * 1000;
        const diffDays = Math.round(
          Math.abs((newRange.from - newRange.to) / oneDay)
        );
        const stringToUse = `last ${diffDays} days`;
        dashboard.updateFilters({ "Created Date": stringToUse });
        dashboard.run();
      }
    };


    return(
      <div id="EmbedContainer">
      <InputDateRange
        onChange={handleChange}
        defaultValue={selectedDate}
        value={selectedDate}
      />
    </div>
    );
  }