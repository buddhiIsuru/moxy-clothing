import { BRAND_POLICIES } from "@/constants";
import { BrandPolicy } from "@/types";

export const serviceService = {
  async getBrandPolicies(): Promise<BrandPolicy[]> {
    return BRAND_POLICIES;
  }
};
