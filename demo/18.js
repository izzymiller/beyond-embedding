import React, {useState, useEffect} from "react"
import { LookerEmbedSDK } from "@looker/embed-sdk";
import { ComponentsProvider, Heading, InputDateRange, Box } from "@looker/components";

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

function Embed() {
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

    const updateFilters = (newRange) => {
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