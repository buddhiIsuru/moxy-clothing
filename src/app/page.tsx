import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/features/hero/HeroSection";
import { FeatureBanner, ProductRow } from "@/features/collections/ShowcaseSection";
import { CraftedForInfinity } from "@/features/brand/CraftedForInfinity";
import {
  ESSENTIAL_OUTERWEAR,
  THE_UNIFORM,
  PETITE_LUXURY,
  WOMEN_PRODUCTS,
  MEN_PRODUCTS,
  KIDS_PRODUCTS,
} from "@/constants";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-brand-bg text-brand-text overflow-hidden">
      <Navbar />

      <main className="flex-1">
        <br /> <br /> <br /> 
        <HeroSection />

        <FeatureBanner
          id="outerwear"
          category={ESSENTIAL_OUTERWEAR.category}
          title={ESSENTIAL_OUTERWEAR.title}
          description={ESSENTIAL_OUTERWEAR.description}
          imageUrl={ESSENTIAL_OUTERWEAR.imageUrl}
          hoverImageUrl={ESSENTIAL_OUTERWEAR.hoverImageUrl}
          linkText={ESSENTIAL_OUTERWEAR.linkText}
          linkHref={ESSENTIAL_OUTERWEAR.linkHref}
          reverse={false}
        />

        <ProductRow
          id="shop"
          subtitle="NEW ARRIVALS"
          title="Women's Collection"
          products={WOMEN_PRODUCTS}
        />

        <FeatureBanner
          id="uniform"
          category={THE_UNIFORM.category}
          title={THE_UNIFORM.title}
          description={THE_UNIFORM.description}
          imageUrl={THE_UNIFORM.imageUrl}
          hoverImageUrl={THE_UNIFORM.hoverImageUrl}
          linkText={THE_UNIFORM.linkText}
          linkHref={THE_UNIFORM.linkHref}
          reverse={true}
        />

        <ProductRow
          subtitle="THE CLASSICS"
          title="Men's Collection"
          products={MEN_PRODUCTS}
        />

        <FeatureBanner
          id="kids"
          category={PETITE_LUXURY.category}
          title={PETITE_LUXURY.title}
          description={PETITE_LUXURY.description}
          imageUrl={PETITE_LUXURY.imageUrl}
          hoverImageUrl={PETITE_LUXURY.hoverImageUrl}
          linkText={PETITE_LUXURY.linkText}
          linkHref={PETITE_LUXURY.linkHref}
          reverse={false}
        />

        <ProductRow
          subtitle="PETITE LINE"
          title="Kids Collection"
          products={KIDS_PRODUCTS}
        />

        <CraftedForInfinity />
      </main>

      <Footer />
    </div>
  );
}
