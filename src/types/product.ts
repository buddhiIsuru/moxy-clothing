import { StaticImageData } from "next/image";

export interface Product {
  soldOut?: boolean;
  originalPrice?: number | false;
  id: string;
  slug?: string;
  name: string;
  price: number;
  imageUrl: string | StaticImageData;
  hoverImageUrl?: string | StaticImageData;
  images?: (string | StaticImageData)[];
  category: string;
  collectionSlug?: "mens" | "womens" | "kids";
  badge?: "New" | "Sale" | "Limited";
  colors?: string[];
  season?: string;
  description?: string;
  details?: string[];
  sizes?: string[];
  rating?: number;
  reviewsCount?: number;
}

export interface Collection {
  id: string;
  title: string;
  description: string;
  slug: string;
  eyebrow?: string;
  categories?: string[];
  products: Product[];
}
