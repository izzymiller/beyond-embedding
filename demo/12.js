function Embed() {
  const [dashboardEmbedded, setDashboardEmbedded] = useState(false);
  const [isOpen, setIsOpen] = useState(false); //

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
      .on("drillmenu:click", handleClick)
      .withClassName("embeddedDashboard")
      .build()
      .connect()
      .then((dashboard) => {
        setDashboardEmbedded(true);
      });
  };

  const handleClick = (event) => {
    //
    if (event.label === "Install Scenarios") {
      setIsOpen(true);
      return { cancel: true };
    } else {
      return { cancel: false };
    }
  };
  return (
    <div id="EmbedContainer">
      <Dialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        content="My neat dialog"
      />
    </div>
  );
}
