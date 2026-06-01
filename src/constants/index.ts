import { NavLink, Product, BrandPolicy, Collection } from "@/types";
import banner1 from "@/assets/Banner/Cotton-cover-LK_1.webp";
import banner2 from "@/assets/Banner/Timeless_56_Web_Banner_b3d08786-2a61-4fb2-ba8e-07ccdbd2dc70.webp";
import banner3 from "@/assets/Banner/Lavenra_Web_Banner_168f93d0-58da-4225-9672-d693a7ebfa84.webp";
import banner4 from "@/assets/Banner/Evening-Cover-LK1_1_7a198065-e922-401c-8c12-6048ee48e5ac.webp";
import banner5 from "@/assets/Banner/Denim-Cover-LK-1.webp";
import timeless1 from "@/assets/03BWEB_16122137-4fb0-4599-b483-0872fb4a4830.webp";
import timeless2 from "@/assets/26_9d4bd9ee-7d5f-4ef7-b0ac-f82de1db6d3f.webp";
import timeless3 from "@/assets/Timeless0609_ebd045bc-e083-4871-8668-11939692feb5.webp";

export const NAV_LINKS: NavLink[] = [
  { label: "Men", href: "/mens" },
  { label: "Women", href: "/womens" },
  { label: "Kids", href: "/kids" },
  { label: "About", href: "/about" },
];

export const BRAND_POLICIES: BrandPolicy[] = [
  {
    title: "SHIPPING",
    description: "Complimentary express worldwide delivery on all orders. Packaged in our signature moxy gift boxes, crafted from FSC-certified sustainable materials.",
  },
  {
    title: "RETURNS",
    description: "We offer a seamless 30-day return policy. Our couriers will collect the package directly from your preferred address at your convenience, free of charge.",
  },
  {
    title: "CARE",
    description: "Every MOXY garment is constructed to endure. Access our dedicated restoration concierge for complimentary seasonal dry cleaning, repair, and preservation.",
  },
];

export const HERO_VIDEO_URL = "https://assets.mixkit.co/videos/preview/mixkit-model-posing-in-a-futuristic-silver-suit-41857-large.mp4";
export const SECONDARY_VIDEO_URL = "https://assets.mixkit.co/videos/preview/mixkit-fashion-woman-with-silver-makeup-40409-large.mp4";

export const HERO_SLIDES = [
  {
    eyebrow: "New Season",
    title: "The MOXY Universe",
    description: "Avant-garde silhouettes, timeless tailoring, and refined materials shaped for a modern luxury wardrobe.",
    imageUrl: banner1,
  },
  {
    eyebrow: "Timeless Edit",
    title: "Quiet Form, Lasting Presence",
    description: "Sculptural essentials in soft neutrals, crafted with elegant restraint and everyday permanence.",
    imageUrl: banner2,
  },
  {
    eyebrow: "Atelier Notes",
    title: "Constructed To Endure",
    description: "Premium textures, clean lines, and considered details made to move beautifully across seasons.",
    imageUrl: banner3,
  },
  {
    eyebrow: "Atelier Notes",
    title: "Constructed To Endure",
    description: "Premium textures, clean lines, and considered details made to move beautifully across seasons.",
    imageUrl: banner4,
  },
  {
    eyebrow: "Atelier Notes",
    title: "Constructed To Endure",
    description: "Premium textures, clean lines, and considered details made to move beautifully across seasons.",
    imageUrl: banner5,
  },
];

export const ESSENTIAL_OUTERWEAR = {
  category: "CLASSIC",
  title: "Womens Collection",
  description: "A definitive collection of tailored overcoats, sculptural blazers, and weather-resistant capes. Engineered with high-shoulder silhouettes and premium double-faced Italian cashmere.",
  imageUrl: timeless1,
  hoverImageUrl: timeless2,
  linkText: "View Collection",
  linkHref: "/womens",
};

export const THE_UNIFORM = {
  category: "THE EDIT",
  title: "Mens Collection",
  description: "Modern formalwear redefined for the contemporary vanguard. Sculpted slim-fit charcoal tailoring constructed from high-twist merino wool, designed for seamless transitions from day to night.",
  imageUrl: banner2,
  hoverImageUrl: banner1,
  linkText: "View Collection",
  linkHref: "/mens",
};

export const PETITE_LUXURY = {
  category: "KIDS",
  title: "Kids Collection",
  description: "Sophisticated minimalism scaled down. Responsibly sourced organic cotton, baby alpaca wool, and soft linen in raw neutral palettes designed for active play and enduring elegance.",
  imageUrl: banner1,
  hoverImageUrl: banner2,
  linkText: "View Collection",
  linkHref: "/kids",
};

export const WOMEN_PRODUCTS: Product[] = [
  {
    id: "w1",
    name: "Moxy Sculptural Blazer",
    price: 450,
    category: "Tailoring",
    imageUrl: timeless1,
    hoverImageUrl: timeless2,
    images: [timeless1, timeless2, timeless3],
    description: "Constructed with strong padded shoulders and a sculpted, single-breasted silhouette, the Moxy Sculptural Blazer represents our tailoring masterclass. Cut from premium mid-weight wool twill, it strikes the perfect balance between architectural structure and comfortable ease.",
    details: [
      "Peak lapels; single-button closure.",
      "Structured padded shoulders.",
      "Dual flap pockets at waist; welt pocket at chest.",
      "Double back vent for ease of movement.",
      "Fully lined with custom silk satin.",
      "100% fine wool; lining: 100% silk.",
      "Dry clean only. Made in Italy."
    ],
    sizes: ["S", "M", "L", "XL"],
    rating: 4.8,
    reviewsCount: 24,
    originalPrice: false
  },
  {
    id: "w2",
    name: "Silk Evening Gown",
    price: 680,
    category: "Dresses",
    imageUrl: timeless2,
    hoverImageUrl: timeless3,
    images: [timeless2, timeless3, timeless1],
    description: "An elegant, floor-sweeping gown made from sandwashed silk charmeuse that drapes beautifully. Designed with a delicate cowl neckline, an open back, and fine adjustable shoulder straps, this evening gown exudes minimalist luxury and sophisticated charm.",
    details: [
      "Soft cowl neck outline.",
      "Low open back with cross-strap details.",
      "Slit detail at the side seam.",
      "Bias-cut silhouette for a body-skimming fit.",
      "Unlined for a fluid, weightless drape.",
      "100% heavy silk charmeuse.",
      "Dry clean only. Made in France."
    ],
    sizes: ["XS", "S", "M", "L"],
    rating: 4.6,
    reviewsCount: 15,
    originalPrice: 820
  },
  {
    id: "w3",
    name: "Beige Leather Tote",
    price: 290,
    category: "Accessories",
    imageUrl: timeless3,
    hoverImageUrl: timeless1,
    images: [timeless3, timeless1, timeless2],
    description: "Designed for day-to-day functionality without sacrificing elegant form. Crafted in Spain from supple grained calfskin leather, this spacious unstructured tote is detailed with hand-painted raw edges and a suede-lined interior featuring a detachable zip pouch.",
    details: [
      "Grained calfskin leather exterior.",
      "Durable suede-bonded interior lining.",
      "Double flat shoulder straps (24cm drop).",
      "Internal clasp closure.",
      "Includes a matching detachable zip pouch.",
      "Hand-painted leather edges.",
      "Dimensions: H 32cm x W 45cm x D 15cm."
    ],
    sizes: ["One Size"],
    rating: 4.9,
    reviewsCount: 42,
    originalPrice: false
  },
  {
    id: "w4",
    name: "Satin Slip Dress",
    price: 320,
    category: "Dresses",
    imageUrl: timeless1,
    hoverImageUrl: timeless2,
    images: [timeless1, timeless2, timeless3],
    description: "An effortless essential cut on the bias from luxurious heavy-weight double-faced satin. Designed with a clean V-neckline and a subtle flare at the hem, it is perfect for layering under structural blazers or wearing solo with strappy sandals.",
    details: [
      "Classic V-neckline front and back.",
      "Fine adjustable spaghetti straps.",
      "Subtle flared fishtail hem.",
      "Bias cut for natural stretch and fluid shape.",
      "Finished with premium French seams.",
      "82% Acetate, 18% Viscose.",
      "Dry clean or hand wash cold."
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    rating: 4.5,
    reviewsCount: 18,
    originalPrice: false
  },
  {
    id: "w5",
    name: "Satin Slip Dress",
    price: 320,
    category: "Dresses",
    imageUrl: timeless1,
    hoverImageUrl: timeless2,
    images: [timeless1, timeless2, timeless3],
    description: "An effortless essential cut on the bias from luxurious heavy-weight double-faced satin. Designed with a clean V-neckline and a subtle flare at the hem, it is perfect for layering under structural blazers or wearing solo with strappy sandals.",
    details: [
      "Classic V-neckline front and back.",
      "Fine adjustable spaghetti straps.",
      "Subtle flared fishtail hem.",
      "Bias cut for natural stretch and fluid shape.",
      "Finished with premium French seams.",
      "82% Acetate, 18% Viscose.",
      "Dry clean or hand wash cold."
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    rating: 4.5,
    reviewsCount: 18,
    originalPrice: false
  },
  {
    id: "w6",
    name: "Satin Slip Dress",
    price: 320,
    category: "Dresses",
    imageUrl: timeless1,
    hoverImageUrl: timeless2,
    images: [timeless1, timeless2, timeless3],
    description: "An effortless essential cut on the bias from luxurious heavy-weight double-faced satin. Designed with a clean V-neckline and a subtle flare at the hem, it is perfect for layering under structural blazers or wearing solo with strappy sandals.",
    details: [
      "Classic V-neckline front and back.",
      "Fine adjustable spaghetti straps.",
      "Subtle flared fishtail hem.",
      "Bias cut for natural stretch and fluid shape.",
      "Finished with premium French seams.",
      "82% Acetate, 18% Viscose.",
      "Dry clean or hand wash cold."
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    rating: 4.5,
    reviewsCount: 18,
    originalPrice: false
  },
];

export const MEN_PRODUCTS: Product[] = [
  {
    id: "m1",
    name: "Double-Breasted Wool Coat",
    price: 520,
    category: "Outerwear",
    imageUrl: timeless2,
    hoverImageUrl: timeless3,
    images: [timeless2, timeless3, timeless1],
    description: "This statement double-breasted overcoat is tailored from structured double-faced Italian virgin wool. Cut in an oversized, relaxed drape that fits comfortably over heavy knits, it features broad notch lapels, structured shoulders, and deep welt pockets.",
    details: [
      "Relaxed, slightly oversized fit.",
      "Double-breasted front button closure.",
      "Broad notch lapels; structured shoulders.",
      "Flap hand pockets; interior zip security pocket.",
      "Fully lined in breathable cupro.",
      "80% virgin wool, 20% polyamide; lining: 100% cupro.",
      "Dry clean only. Fabric sourced from Biella, Italy."
    ],
    sizes: ["M", "L", "XL", "XXL"],
    rating: 4.7,
    reviewsCount: 30,
    originalPrice: false
  },
  {
    id: "m2",
    name: "Ribbed Merino Crew",
    price: 180,
    category: "Knitwear",
    imageUrl: timeless3,
    hoverImageUrl: timeless1,
    images: [timeless3, timeless1, timeless2],
    description: "An everyday luxury staple, knitted from extra-fine 19.5-micron Australian merino wool. Designed in a medium-weight 7-gauge ribbed stitch, it offers superior warmth, breathability, and a plush, soft feel against the skin.",
    details: [
      "Standard fit with crew neck silhouette.",
      "Full-cardigan ribbed knit construction.",
      "Fully-fashioned armholes and shoulders.",
      "Ribbed collar, cuffs, and bottom hem.",
      "Naturally moisture-wicking and odor-resistant.",
      "100% extra-fine merino wool.",
      "Hand wash cold and dry flat."
    ],
    sizes: ["S", "M", "L", "XL"],
    rating: 4.4,
    reviewsCount: 12,
    originalPrice: false
  },
  {
    id: "m3",
    name: "Saffiano Leather Attache",
    price: 340,
    category: "Accessories",
    imageUrl: timeless1,
    hoverImageUrl: timeless2,
    images: [timeless1, timeless2, timeless3],
    description: "An elegant, minimalist briefcase crafted in Italy from cross-grained Saffiano calfskin, offering exceptional scratch and water resistance. Finished with silver-tone hardware, dynamic rolled handles, and a secure dual-zip closure.",
    details: [
      "Water-resistant Saffiano calfskin leather.",
      "Engraved silver-finish brass hardware.",
      "Double rolled leather top handles.",
      "Detachable, adjustable webbed shoulder strap.",
      "Padded interior laptop sleeve (fits up to 14\" laptop).",
      "Two interior slip pockets and one zip pocket.",
      "Dimensions: H 28cm x W 38cm x D 6cm."
    ],
    sizes: ["One Size"],
    rating: 4.8,
    reviewsCount: 9,
    originalPrice: false
  },
  {
    id: "m4",
    name: "Classic Charcoal Blazer",
    price: 450,
    category: "Tailoring",
    imageUrl: timeless2,
    hoverImageUrl: timeless3,
    images: [timeless2, timeless3, timeless1],
    description: "The cornerstone of a formal wardrobe, this single-breasted blazer is cut from high-twist merino wool hopsack, which naturally resists wrinkling. Featuring soft, unstructured shoulders for a modern, relaxed yet sophisticated drape.",
    details: [
      "Slim-fit silhouette with soft shoulders.",
      "Two-button closure; notch lapels.",
      "Patch pockets at hip; chest welt pocket.",
      "Unlined back panel for maximum breathability.",
      "Four functional buttons at cuffs.",
      "100% merino wool; sleeve lining: 100% cupro.",
      "Dry clean only."
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    rating: 4.6,
    reviewsCount: 16,
    originalPrice: false
  },
];

export const KIDS_PRODUCTS: Product[] = [
  {
    id: "k1",
    name: "Organic Cotton Sweater",
    price: 120,
    category: "Knitwear",
    imageUrl: timeless3,
    hoverImageUrl: timeless1,
    images: [timeless3, timeless1, timeless2],
    description: "Softness and sustainability combined. This cozy kid's sweater is knitted from 100% GOTS-certified organic cotton in a chunky seed stitch. Features a button closure at the shoulder for easy dressing.",
    details: [
      "Crewneck with ribbed trim.",
      "Coconut shell button closure at left shoulder (sizes up to 2T).",
      "Chunky seed-stitch knit construction.",
      "GOTS-certified organic cotton, dyed with non-toxic pigments.",
      "100% organic cotton.",
      "Machine wash warm, tumble dry low."
    ],
    sizes: ["2T", "3T", "4T", "5T"],
    rating: 4.9,
    reviewsCount: 33,
    originalPrice: false
  },
  {
    id: "k2",
    name: "Alpaca Blend Joggers",
    price: 95,
    category: "Pants",
    imageUrl: timeless1,
    hoverImageUrl: timeless2,
    images: [timeless1, timeless2, timeless3],
    description: "Wonderfully soft, light, and warm knit joggers crafted from a premium blend of baby alpaca wool and organic cotton. Designed with an adjustable drawstring waist and ribbed cuffs to lock in warmth.",
    details: [
      "Elasticated waistband with functional drawcord.",
      "Relaxed fit through the leg, tapering to ribbed cuffs.",
      "Hypoallergenic baby alpaca fiber blend.",
      "Provides lightweight insulation and high breathability.",
      "55% baby alpaca, 45% organic cotton.",
      "Hand wash cold, dry flat."
    ],
    sizes: ["2T", "3T", "4T", "5T"],
    rating: 4.7,
    reviewsCount: 14,
    originalPrice: false
  },
  {
    id: "k3",
    name: "Sherpa Shearling Jacket",
    price: 160,
    category: "Outerwear",
    imageUrl: timeless2,
    hoverImageUrl: timeless3,
    images: [timeless2, timeless3, timeless1],
    description: "Keep your little ones cozy in style. This vintage-inspired jacket features a warm faux-shearling exterior lined with ultra-soft organic cotton jersey. Detailed with durable canvas trim and large zip pulls.",
    details: [
      "Plush sherpa fleece exterior.",
      "Fully lined with soft 100% organic cotton jersey.",
      "Full-front zip closure with chin guard.",
      "Canvas-trimmed zip pockets at chest and waist.",
      "Elastic bindings at cuffs and hem to trap warmth.",
      "100% recycled polyester sherpa; lining: 100% cotton.",
      "Machine wash cold, air dry."
    ],
    sizes: ["3T", "4T", "5T", "6T"],
    rating: 4.8,
    reviewsCount: 20,
    originalPrice: false
  },
  {
    id: "k4",
    name: "Suede Ankle Boots",
    price: 110,
    category: "Footwear",
    imageUrl: timeless3,
    hoverImageUrl: timeless1,
    images: [timeless3, timeless1, timeless2],
    description: "Classic Chelsea boots styled for kids, crafted from water-resistant Spanish split suede. Equipped with elastic side panels, a pull tab at the heel, and a flexible crepe rubber sole for comfort and grip.",
    details: [
      "Spanish split suede upper, treated for water-resistance.",
      "Flexible elastic side gores; leather heel pull loop.",
      "Chrome-free leather lining and cushioned insole.",
      "Natural crepe rubber sole for shock absorption.",
      "Handcrafted in Spain.",
      "Wipe clean with suede brush."
    ],
    sizes: ["24", "25", "26", "27", "28", "29"],
    rating: 4.5,
    reviewsCount: 11,
    originalPrice: false
  },
];

export const COLLECTIONS: Collection[] = [
  {
    id: "womens",
    slug: "womens",
    title: "Women",
    eyebrow: "Summer Atelier 2026",
    description: "Tailored dresses, sculptural separates, and refined accessories for the modern wardrobe.",
    categories: ["All", ...Array.from(new Set(WOMEN_PRODUCTS.map((product) => product.category)))],
    products: WOMEN_PRODUCTS.map((product) => ({
      ...product,
      slug: product.slug ?? product.id,
      collectionSlug: "womens",
      badge: product.badge ?? (product.id === "w1" || product.id === "w2" ? "New" : undefined),
      colors: product.colors ?? ["#c8b89a", "#1a1a1a", "#f0e8dc"],
    })),
  },
  {
    id: "mens",
    slug: "mens",
    title: "Men",
    eyebrow: "The Uniform",
    description: "Outerwear, tailoring, knitwear, and quiet luxury essentials cut for daily ceremony.",
    categories: ["All", ...Array.from(new Set(MEN_PRODUCTS.map((product) => product.category)))],
    products: MEN_PRODUCTS.map((product) => ({
      ...product,
      slug: product.slug ?? product.id,
      collectionSlug: "mens",
      badge: product.badge ?? (product.id === "m1" || product.id === "m4" ? "New" : undefined),
      colors: product.colors ?? ["#1a1a1a", "#c8b89a", "#7a7269"],
    })),
  },
  {
    id: "kids",
    slug: "kids",
    title: "Kids",
    eyebrow: "Petite Line",
    description: "Soft organic textures and miniature classics made for comfort, movement, and polish.",
    categories: ["All", ...Array.from(new Set(KIDS_PRODUCTS.map((product) => product.category)))],
    products: KIDS_PRODUCTS.map((product) => ({
      ...product,
      slug: product.slug ?? product.id,
      collectionSlug: "kids",
      badge: product.badge ?? (product.id === "k1" || product.id === "k3" ? "New" : undefined),
      colors: product.colors ?? ["#f0e8dc", "#c8b89a", "#8bb8e8"],
    })),
  },
];

export const ALL_PRODUCTS: Product[] = COLLECTIONS.flatMap((collection) => collection.products);

export function getCollectionBySlug(slug: string) {
  return COLLECTIONS.find((collection) => collection.slug === slug);
}

export function getProductBySlugOrId(value: string) {
  return ALL_PRODUCTS.find((product) => product.slug === value || product.id === value);
}
