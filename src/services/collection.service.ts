import { COLLECTIONS } from "@/constants";
import { Collection } from "@/types";

export const collectionService = {
  async getCollections(): Promise<Collection[]> {
    return COLLECTIONS;
  },
  async getCollectionBySlug(slug: string): Promise<Collection | undefined> {
    return COLLECTIONS.find((c) => c.slug === slug);
  }
};
