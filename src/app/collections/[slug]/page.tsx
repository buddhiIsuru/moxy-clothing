import { notFound, redirect } from "next/navigation";
import { collectionService } from "@/services/collection.service";

interface CollectionRouteProps {
  params: Promise<{ slug: string }>;
}

export default async function CollectionRoutePage({ params }: CollectionRouteProps) {
  const { slug } = await params;
  const collection = await collectionService.getCollectionBySlug(slug);

  if (!collection) notFound();

  redirect(`/${collection.slug}`);
}
