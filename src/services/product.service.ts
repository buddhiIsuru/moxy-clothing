import {
  ALL_PRODUCTS,
  WOMEN_PRODUCTS,
  MEN_PRODUCTS,
  KIDS_PRODUCTS,
  ESSENTIAL_OUTERWEAR,
  THE_UNIFORM,
  PETITE_LUXURY,
} from "@/constants";
import { Product } from "@/types";

export const productService = {
  async getProducts(): Promise<Product[]> {
    return ALL_PRODUCTS;
  },
  async getProductByIdOrSlug(idOrSlug: string): Promise<Product | undefined> {
    return ALL_PRODUCTS.find((p) => p.id === idOrSlug || p.slug === idOrSlug);
  },
  async getWomenProducts(): Promise<Product[]> {
    return WOMEN_PRODUCTS;
  },
  async getMenProducts(): Promise<Product[]> {
    return MEN_PRODUCTS;
  },
  async getKidsProducts(): Promise<Product[]> {
    return KIDS_PRODUCTS;
  },
  async getEssentialOuterwear(): Promise<any> {
    return ESSENTIAL_OUTERWEAR;
  },
  async getTheUniform(): Promise<any> {
    return THE_UNIFORM;
  },
  async getPetiteLuxury(): Promise<any> {
    return PETITE_LUXURY;
  }
};
