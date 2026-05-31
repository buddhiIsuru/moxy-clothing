import { Metadata } from "next";
import { notFound } from "next/navigation";
import { productService } from "@/services/product.service";
import ProductDetailClient from "@/features/products/components/ProductDetailClient";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = await productService.getProductByIdOrSlug(id);

  if (!product) {
    return {
      title: "Product Not Found | MOXY",
    };
  }

  // Handle StaticImageData mapping to string for metadata image preview if needed
  const imagePreview = typeof product.imageUrl === "string" ? product.imageUrl : undefined;

  return {
    title: `${product.name} | MOXY`,
    description: product.description || `Explore ${product.name} at MOXY. Crafted for comfort, longevity, and modern polish.`,
    openGraph: {
      title: `${product.name} | MOXY`,
      description: product.description,
      images: imagePreview ? [{ url: imagePreview }] : undefined,
    }
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = await productService.getProductByIdOrSlug(id);

  if (!product) {
    notFound();
  }

  const allProducts = await productService.getProducts();
  const relatedProducts = allProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return <ProductDetailClient product={product} relatedProducts={relatedProducts} />;
}
