import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { collectionService } from "@/services/collection.service";
import { CollectionPage } from "@/features/collections/components/CollectionPage";

export const metadata: Metadata = {
  title: "Kids' Collection | MOXY",
  description: "Explore scaled down sophisticated luxury at MOXY. Organic cotton, alpaca wool, and fine linens designed for active play and everyday elegance.",
  keywords: ["kids luxury clothing", "designer kids wear", "moxy kids", "organic cotton kids"],
};

export default async function KidsPage() {
  const collection = await collectionService.getCollectionBySlug("kids");

  if (!collection) {
    notFound();
  }

  return <CollectionPage collection={collection} />;
}
