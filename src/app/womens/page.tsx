import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { collectionService } from "@/services/collection.service";
import { CollectionPage } from "@/features/collections/components/CollectionPage";

export const metadata: Metadata = {
  title: "Women's Collection | MOXY",
  description: "Explore the Summer Atelier 2026. Tailored dresses, sculptural separates, and refined accessories for the modern luxury wardrobe.",
  keywords: ["womens luxury dresses", "sculptural tailoring", "moxy women", "designer evening wear"],
};

export default async function WomensPage() {
  const collection = await collectionService.getCollectionBySlug("womens");

  if (!collection) {
    notFound();
  }

  return <CollectionPage collection={collection} />;
}
