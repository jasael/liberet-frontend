import ProductList from "@/components/ProductList";
import styles from "./page.module.css";
import Aside from "@/components/Aside";
import { TProducts, TPromotions } from "@/interfaces/product.interface";

async function getProducts(): Promise<TProducts> {
  const response = await fetch("http://localhost:3001/products", {
    cache: "no-store",
  });
  const data = await response.json();

  return data;
}

export default async function Home() {
  const products: TProducts = await getProducts();

  return (
    <div className={styles.container}>
      {/* Lista de productos */}
      <ProductList products={products} />
      <Aside />
    </div>
  );
}
