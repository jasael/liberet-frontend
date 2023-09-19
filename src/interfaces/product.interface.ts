export type TCategory = {
  id: number;
  name: string;
};

export type TPromotion = {
  id: number;
  name: string;
  priority: number;
  active: boolean;
  discount: number;
  quantity_items_purchased: number;
  quantity_items_paid: number;
  promotion_type: string;
  categoryFreeId: number;
  min_amount: number;
  products: [{ id: number }];
};

export type TPromotions = TPromotion[];

export type TProduct = {
  id: number;
  name: string;
  price: number;
  category: TCategory;
  promotions: TPromotions;
};

export type TProducts = TProduct[];
