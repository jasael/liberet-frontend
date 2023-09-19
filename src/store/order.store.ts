import { TProduct, TPromotions } from "@/interfaces/product.interface";
import { create } from "zustand";

export type TProductOrder = {
  id: number;
  productId: number;
  name: string;
  quantity: number;
  price: number;
  discount: number;
  total: number;
};

export type Order = TProductOrder[];

type OrderStore = {
  order: Order;
  promotions: TPromotions;
  setOrder: (order: TProduct) => void;
  trashOrder: () => void;
};

const useOrderStore = create<OrderStore>((set, get) => ({
  order: [],
  promotions: [],
  setOrder: async (product: TProduct) => {
    const order = get().order;
    const promotions = get().promotions;
    const productOrderExist = order.some(
      (productOrder) => productOrder.productId === product.id
    );

    if (!promotions.length) {
      const response = await fetch("http://localhost:3001/promotions");
      const data = await response.json();

      set((prev) => ({
        ...prev,
        promotions: data,
      }));
    }

    const discountPercentageTotal = product.promotions.find(
      (promotion) => promotion.id === 1
    ) || { discount: 0 };

    const discount = discountPercentageTotal
      ? product.price * (discountPercentageTotal.discount / 100)
      : 0;

    if (productOrderExist) {
      set((prev) => ({
        order: prev.order.map((productOrder) => {
          return productOrder.productId === product.id
            ? {
                ...productOrder,
                quantity: productOrder.quantity + 1,
                total: productOrder.total + product.price,
                discount:
                  (productOrder.total + product.price) *
                  (discountPercentageTotal.discount / 100),
              }
            : productOrder;
        }),
      }));
    } else {
      const newProductOrder: TProductOrder = {
        id: order.length + 1,
        productId: product.id,
        name: product.name,
        quantity: 1,
        price: product.price,
        discount,
        total: discount > 0 ? product.price - discount : product.price,
      };

      set((prev) => {
        return {
          order: [...prev.order, newProductOrder],
        };
      });
    }
  },
  trashOrder: () => {
    set({ order: [] });
  },
}));

export default useOrderStore;
