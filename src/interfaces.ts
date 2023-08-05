export interface User {
  id: string;
  email: string;
  name: string;
  password: string;
  cart: Cart;
  orders: Order[];
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Category {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;

  products: Product[];
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  categoryId: string;
  category: Category;
  cartProducts: CartToProduct[];
  orderProducts: OrderToProduct[];
  toppings: Topping[];

  createdAt: Date;
  updatedAt: Date;
}

export interface Topping {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  productId: string;
  product: Product;
  cartToProductToppings: CartToProductTopping[];
  orderToProductToppings: OrderToProductTopping[];
}

export interface Cart {
  id: string;
  userId: string;
  user: User;
  cartProducts: CartToProduct[];
  subtotal: number;
}

export interface Order {
  id: string;
  userId: string;
  user: User;
  orderProducts: OrderToProduct[];
  subTotal: number;
  total: number;
  createdAt: Date;
}

export interface CartToProduct {
  id: string;
  cartId: string;
  cart: Cart;
  productId: string;
  product: Product;
  quantity: number;
  price: number;
  cartToProductToppings: CartToProductTopping[];
}

export interface OrderToProduct {
  id: string;
  orderId: string;
  order: Order;
  productId: string;
  product: Product;
  quantity: number;
  price: number;
  orderToProductTopping: OrderToProductTopping[];
}

export interface CartToProductTopping {
  id: string;
  cartToProdId: string;
  cartToProduct: CartToProduct;
  toppingId: string;
  topping: Topping;
  quantity: number;
}

export interface OrderToProductTopping {
  id: string;
  orderToProductId: string;
  orderToProduct: OrderToProduct;
  toppingId: string;
  topping: Topping;
  quantity: number;
}
