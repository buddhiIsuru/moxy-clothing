import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/features/home/components/HeroSection";
import { FeatureBanner, ProductRow } from "@/features/collections/components/ShowcaseSection";
import { CraftedForInfinity } from "@/features/home/components/CraftedForInfinity";
import { productService } from "@/services/product.service";

export default async function Home() {
  // Fetch data on the server side
  const essentialOuterwear = await productService.getEssentialOuterwear();
  const theUniform = await productService.getTheUniform();
  const petiteLuxury = await productService.getPetiteLuxury();

  const womenProducts = await productService.getWomenProducts();
  const menProducts = await productService.getMenProducts();
  const kidsProducts = await productService.getKidsProducts();

  return (
    <div className="flex flex-col min-h-screen bg-brand-bg text-brand-text overflow-hidden">
      <Navbar />

      <main className="flex-1">
        <br /> <br /> <br /> 
        <HeroSection />

        <FeatureBanner
          id="outerwear"
          category={essentialOuterwear.category}
          title={essentialOuterwear.title}
          description={essentialOuterwear.description}
          imageUrl={essentialOuterwear.imageUrl}
          hoverImageUrl={essentialOuterwear.hoverImageUrl}
          linkText={essentialOuterwear.linkText}
          linkHref={essentialOuterwear.linkHref}
          reverse={false}
        />

        <ProductRow
          id="shop"
          subtitle="NEW ARRIVALS"
          title="Women's Collection"
          products={womenProducts}
        />

        <FeatureBanner
          id="uniform"
          category={theUniform.category}
          title={theUniform.title}
          description={theUniform.description}
          imageUrl={theUniform.imageUrl}
          hoverImageUrl={theUniform.hoverImageUrl}
          linkText={theUniform.linkText}
          linkHref={theUniform.linkHref}
          reverse={true}
        />

        <ProductRow
          subtitle="THE CLASSICS"
          title="Men's Collection"
          products={menProducts}
        />

        <FeatureBanner
          id="kids"
          category={petiteLuxury.category}
          title={petiteLuxury.title}
          description={petiteLuxury.description}
          imageUrl={petiteLuxury.imageUrl}
          hoverImageUrl={petiteLuxury.hoverImageUrl}
          linkText={petiteLuxury.linkText}
          linkHref={petiteLuxury.linkHref}
          reverse={false}
        />

        <ProductRow
          subtitle="PETITE LINE"
          title="Kids Collection"
          products={kidsProducts}
        />

        <CraftedForInfinity />
      </main>

      <Footer />
    </div>
  );
}
