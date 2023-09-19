import { TProducts } from "@/interfaces/product.interface";
import styles from "./index.module.css";
import ProductCard from "./components/ProductCard";

interface ProductListProps {
  products: TProducts;
}

const ProductList = ({ products }: ProductListProps) => {
  return (
    <main className={styles.product_list}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </main>
  );
};

export default ProductList;
