import { GrowthBook } from "@growthbook/growthbook-react";
import Router from "next/router";
import { useEffect } from "react";
import { browserName } from "react-device-detect";

import userMock from "../mocks/user.json";
import { User } from "../models/User";

const FEATURES_ENDPOINT =
  "http://localhost:3100/api/features/key_prod_7e110c2423e1b502";

const growthbook = new GrowthBook({
  trackingCallback: (experiment, result) => {
    console.log({
      experimentId: experiment.key,
      variationId: result.variationId,
    });
  },
});

const useGrowthbook = () => {
  const user: User = userMock;

  useEffect(() => {
    fetch(FEATURES_ENDPOINT)
      .then((res) => res.json())
      .then((json) => {
        growthbook.setFeatures(json.features);
      });

    growthbook.setAttributes({
      id: user.id,
      deviceId: browserName,
      loggedIn: true,
      role: user.role,
      browser: navigator.userAgent,
      url: Router.pathname,
    });
  }, [user]);

  return { growthbook };
};

export default useGrowthbook;
