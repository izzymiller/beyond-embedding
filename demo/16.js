import React, {useState, useEffect} from "react"
import { LookerEmbedSDK } from "@looker/embed-sdk";
import {InputDateRange} from "@looker/components"

export default function Embed() {
    const [dashboardEmbedded, setDashboardEmbedded] = useState(false);
    useEffect(() => {
      createUrlAndEmbedDashboard();
    }, []);

    let createUrlAndEmbedDashboard = async () => {
      const embed_url = await sdk.ok(
        sdk.create_embed_url_as_me({
          target_url: `https://dat.dev.looker.com/embed/dashboards-next/8?embed_domain=${document.location.origin}&sdk=2`
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
      setSelectedDate(dateRange);
      updateFilters(dateRange);
    };

    return (
      <div id="EmbedContainer">
      <InputDateRange
        onChange={handleChange}
        defaultValue={selectedDate}
        value={selectedDate}
      />
    </div>
    );
  }