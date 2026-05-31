import { Product } from "./product";

export interface NavLink {
  label: string;
  href: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize: string;
}

export interface ToastInfo {
  message: string;
  visible: boolean;
  type?: "success" | "error";
}
