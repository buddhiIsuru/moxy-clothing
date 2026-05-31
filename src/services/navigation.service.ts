import { NAV_LINKS, HERO_SLIDES } from "@/constants";
import { NavLink } from "@/types";

export interface FooterSection {
  title: string;
  links: { label: string; href: string }[];
}

export const navigationService = {
  async getNavLinks(): Promise<NavLink[]> {
    return NAV_LINKS;
  },
  async getHeroSlides(): Promise<any[]> {
    return HERO_SLIDES;
  },
  async getFooterSections(): Promise<FooterSection[]> {
    return [
      {
        title: "Brand",
        links: [
          { label: "The Story", href: "#story" },
          { label: "Our Philosophy", href: "#philosophy" },
          { label: "Journal", href: "#journal" },
          { label: "Careers", href: "#careers" },
        ],
      },
      {
        title: "Customer Care",
        links: [
          { label: "Shipping & Delivery", href: "#shipping" },
          { label: "Returns & Exchanges", href: "#returns" },
          { label: "Garment Care", href: "#care" },
          { label: "Sizing Concierge", href: "#size-guide" },
        ],
      },
      {
        title: "Socials",
        links: [
          { label: "Instagram", href: "https://instagram.com" },
          { label: "Pinterest", href: "https://pinterest.com" },
          { label: "YouTube", href: "https://youtube.com" },
          { label: "TikTok", href: "https://tiktok.com" },
        ],
      },
    ];
  }
};
