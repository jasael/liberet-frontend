"use client";

import useOrderStore, { Order } from "@/store/order.store";
import Button from "./components/Button";
import styles from "./index.module.css";
import { useMemo } from "react";
const Aside = () => {
  const order = useOrderStore((state) => state.order);
  const total = useMemo(() => {
    return order.reduce((acc, productOrder) => {
      return acc + productOrder.total;
    }, 0);
  }, [order]);
  const discount = useMemo(() => {
    return order.reduce((acc, productOrder) => {
      return acc + productOrder.discount;
    }, 0);
  }, [order]);

  const trashOrder = useOrderStore((state) => state.trashOrder);

  return (
    <aside className={styles.container_order}>
      <AsideHeader trashOrder={trashOrder} />

      <div className={styles.divider} />

      <AsideContent order={order} />

      <div className={styles.divider} />

      <AsideFooter total={total} discount={discount} trashOrder={trashOrder} />
    </aside>
  );
};

export default Aside;

const AsideHeader = ({ trashOrder }: { trashOrder: () => void }) => {
  return (
    <Button color="danger" onClick={trashOrder}>
      Descartar
    </Button>
  );
};

const AsideContent = ({ order }: { order: Order }) => {
  return (
    <div className={styles.order}>
      {order.length > 0 &&
        order.map((productOrder) => (
          <div key={productOrder.id} className={styles.product_order_card}>
            <h2 className={styles.product_order_card_title}>
              {productOrder.name}
            </h2>
            <div className={styles.between}>
              <p className={styles.label}>
                {productOrder.quantity} x ${productOrder.price}
              </p>
              <p className={styles.quantity}>${productOrder.total}</p>
            </div>
            <div className={styles.between}>
              <p className={styles.label}>Descuento</p>
              <p className={styles.quantity}>${productOrder.discount}</p>
            </div>
            <div className={styles.between}>
              <p className={styles.label}>Total</p>
              <p className={styles.quantity}>${productOrder.total}</p>
            </div>
          </div>
        ))}
    </div>
  );
};

const AsideFooter = ({
  total,
  discount,
  trashOrder,
}: {
  total: number;
  discount: number;
  trashOrder: () => void;
}) => {
  return (
    <div className={styles.container_order_footer}>
      <div className={styles.between}>
        <p className={styles.label}>Total Descuento</p>
        <p className={styles.quantity}>-${discount}</p>
      </div>
      <div className={styles.between}>
        <p className={styles.label}>Total</p>
        <p className={styles.quantity}>${total}</p>
      </div>

      <Button color="warning" onClick={trashOrder}>
        Pagar
      </Button>
    </div>
  );
};
