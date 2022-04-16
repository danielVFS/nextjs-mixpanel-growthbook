import type { AppProps } from "next/app";
import { useEffect } from "react";
import { GrowthBookProvider } from "@growthbook/growthbook-react";

import "../styles/globals.css";
import { MixpanelTracking } from "../services/mixpanel";
import useGrowthbook from "../services/useGrowthbook";

function MyApp({ Component, pageProps }: AppProps) {
  const { growthbook } = useGrowthbook();

  useEffect(() => {
    MixpanelTracking.getInstance().pageViewed();
  }, []);

  return (
    <GrowthBookProvider growthbook={growthbook}>
      <Component {...pageProps} />
    </GrowthBookProvider>
  );
}

export default MyApp;
