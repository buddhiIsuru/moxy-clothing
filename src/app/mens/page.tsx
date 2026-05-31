import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { collectionService } from "@/services/collection.service";
import { CollectionPage } from "@/features/collections/components/CollectionPage";

export const metadata: Metadata = {
  title: "Men's Collection | MOXY",
  description: "Explore quiet luxury and structured essentials at MOXY. Outerwear, tailoring, knitwear, and accessories cut for daily ceremony.",
  keywords: ["mens luxury tailoring", "designer menswear", "moxy men", "cashmere coats"],
};

export default async function MensPage() {
  const collection = await collectionService.getCollectionBySlug("mens");

  if (!collection) {
    notFound();
  }

  return <CollectionPage collection={collection} />;
}
