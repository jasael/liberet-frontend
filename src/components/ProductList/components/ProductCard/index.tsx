"use client";
import useOrderStore from "@/store/order.store";
import styles from "./index.module.css";
import { TProduct } from "@/interfaces/product.interface";

interface ProductCardProps {
  product: TProduct;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const setProductOrder = useOrderStore((state) => state.setOrder);
  const handleClick = (product: TProduct) => {
    setProductOrder(product);
  };
  return (
    <div
      key={product.id}
      className={styles.product_card}
      onClick={() => handleClick(product)}
    >
      <h2 className={styles.product_card_title}>{product.name}</h2>
      <p className={styles.product_card_price}>${product.price}</p>
    </div>
  );
};

export default ProductCard;
