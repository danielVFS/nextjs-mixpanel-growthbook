import Image from "next/image";
import { useEffect } from "react";
import { IfFeatureEnabled } from "@growthbook/growthbook-react";

import styles from "../../styles/Products.module.css";
import { MixpanelTracking } from "../../services/mixpanel";
import productsMock from "../../mocks/products.json";
import { Product } from "../../models/Product";

const products: Product[] = productsMock;

const myLoader = () => {
  return "https://picsum.photos/200";
};

const Products: React.FC = () => {
  const handleClickProduct = (product: Product): any => {
    MixpanelTracking.getInstance().productClicked(product);
  };

  useEffect(() => {
    MixpanelTracking.getInstance().pageViewed();
  }, []);

  return (
    <>
      <div className={styles.container}>
        <IfFeatureEnabled feature="title-products-page">
          <h1>Loja de Roupas</h1>
        </IfFeatureEnabled>
        <div className={styles.productsList}>
          {products.map((product) => {
            return (
              <div
                key={product.id}
                className={styles.product}
                onClick={() => handleClickProduct(product)}
              >
                <p>{product.name}</p>
                <Image
                  loader={myLoader}
                  src="me.png"
                  alt="Picture of the author"
                  width={200}
                  height={200}
                />
                <p>{product.description}</p>
                <p>{product.price}</p>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Products;
