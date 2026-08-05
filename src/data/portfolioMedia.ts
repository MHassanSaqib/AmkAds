export type PortfolioMediaType = {
  id: string;
  title: string;
  brand: string;
  type: string;
  imageSrc: string;
  description: string;
  location?: string;
};

export const portfolioMedia: PortfolioMediaType[] = [
  {
    id: "1",
    title: "Sufi Group - Mega Billboard",
    brand: "Sufi Group",
    type: "Billboard",
    imageSrc: "/logos/sufi.png", // Placeholder image, update with real asset
    description: "A prominent out-of-home advertising placement designed to maximize brand visibility."
  },
  {
    id: "2",
    title: "KIPS Education - Digital Campaign",
    brand: "KIPS Education",
    type: "Digital Screen",
    imageSrc: "/logos/kips.png",
    description: "Digital billboard showcasing latest educational programs to students across the city."
  },
  {
    id: "3",
    title: "Interwood - Transit Ad",
    brand: "Interwood",
    type: "Transit",
    imageSrc: "/logos/interwood.png",
    description: "High-impact transit branding covering multiple busy metropolitan routes."
  },
  {
    id: "4",
    title: "Fruitien - Summer Billboard",
    brand: "Fruitien",
    type: "Billboard",
    imageSrc: "/logos/fruitien.png",
    description: "Summer promotional campaign for FMCG beverages across major highways."
  },
  {
    id: "5",
    title: "Union Developers - Prime Location",
    brand: "Union Developers",
    type: "Digital Screen",
    imageSrc: "/logos/union.png",
    description: "Real estate digital campaign targeting premium investors."
  },
  {
    id: "6",
    title: "GOFY - Retail Launch",
    brand: "GOFY",
    type: "Billboard",
    imageSrc: "/logos/gofy.png",
    description: "Launch campaign for the latest FMCG product line."
  },
  {
    id: "gofy-multan-campaign",
    title: "Gofy Brand - Multan Campaign",
    brand: "GOFY",
    type: "BILLBOARD",
    location: "Bosan Road, Block C, Multan",
    imageSrc: "/portfolio/gofy-multan.jpg",
    description: "Oatmilk Cereal Bar campaign placed along Bosan Road, Multan."
  }
];
