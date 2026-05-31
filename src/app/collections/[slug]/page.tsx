import { notFound, redirect } from "next/navigation";
import { COLLECTIONS } from "@/constants";

interface CollectionRouteProps {
  params: Promise<{ slug: string }>;
}

export default async function CollectionRoutePage({ params }: CollectionRouteProps) {
  const { slug } = await params;
  const collection = COLLECTIONS.find((item) => item.slug === slug);

  if (!collection) notFound();

  redirect(`/${collection.slug}`);
}
