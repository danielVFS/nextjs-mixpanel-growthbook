import styles from "../../styles/Products.module.css";
import Image from "next/image";
import { useEffect } from "react";
import { MixpanelTracking } from "../../services/mixpanel";

export interface Product {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
}

const products: Product[] = [
  {
    id: 1,
    name: "Jacketa Polo",
    description: "Jacketa muito boa",
    image: "https://picsum.photos/200",
    price: 120,
  },
  {
    id: 2,
    name: "Blusa Branca",
    description: "Blusa branca linha",
    image: "https://picsum.photos/200",
    price: 130,
  },
  {
    id: 3,
    name: "Tênis Misuno",
    description: "Tênis para corrida",
    image: "https://picsum.photos/200",
    price: 130,
  },
];

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
        <h1>Loja de Roupas</h1>
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
