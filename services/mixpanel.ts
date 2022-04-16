import mixpanel from "mixpanel-browser";
import TrackingEvents from "../enums/tracking-events.enum";
import { Product } from "../pages/models/Product";

export class MixpanelTracking {
  private static _instance: MixpanelTracking;

  public static getInstance(): MixpanelTracking {
    if (MixpanelTracking._instance == null) {
      return (MixpanelTracking._instance = new MixpanelTracking());
    }

    return this._instance;
  }

  public constructor() {
    if (MixpanelTracking._instance)
      throw new Error(
        "Error: Instance creation of MixpanelTracking not alowed. Use Mixpanel.getInstance() instead."
      );

    mixpanel.init(process.env.NEXT_PUBLIC_MIXPANEL_ID || "", {
      debug: true,
      ignore_dnt: true,
    });
  }

  protected track(name: string, data: object = {}): void {
    mixpanel.track(name, data);
  }

  public pageViewed(): void {
    this.track(TrackingEvents.PAGE_VIEWED);
  }

  public productClicked(product: Product): void {
    this.track(TrackingEvents.PRODUCT_CLICKED, {
      productId: product.id,
      productName: product.name,
      productPrice: product.price,
      productDescription: product.description,
    });
  }
}
