import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import { MixpanelTracking } from "../services/mixpanel";

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    MixpanelTracking.getInstance().pageViewed();
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;
