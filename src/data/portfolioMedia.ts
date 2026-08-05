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
    id: "gofy-multan-campaign",
    title: "Gofy Brand - Multan Campaign",
    brand: "GOFY",
    type: "BILLBOARD",
    location: "Bosan Road, Block C, Multan",
    imageSrc: "/portfolio/gofy-multan.jpg",
    description: "Oatmilk Cereal Bar campaign placed along Bosan Road, Multan."
  },
  {
    id: "gofy-multan-gulgasht",
    title: "Gofy Brand - Gulgasht Campaign",
    brand: "GOFY",
    type: "BILLBOARD",
    location: "Gulgasht Colony, Multan",
    imageSrc: "/portfolio/gofy-multan-gulgasht.jpg",
    description: "High-impact OOH display placement for Gofy Oatmilk Cereal Bar in Gulgasht Colony, Multan."
  },
  {
    id: "gofy-kpk-peshawar",
    title: "Gofy Brand - KPK Campaign (Peshawar)",
    brand: "GOFY",
    type: "BILLBOARD",
    location: "Peshawar, KPK",
    imageSrc: "/portfolio/gofy-kpk-peshawar.jpg",
    description: "Night-time OOH display placement for Gofy Oatmilk Cereal Bar in Peshawar, KPK."
  },
  {
    id: "gofy-kpk-saddar",
    title: "Gofy Brand - Saddar Road Campaign",
    brand: "GOFY",
    type: "OVERHEAD GANTRY",
    location: "Peshawar Cantt, KPK",
    imageSrc: "/portfolio/gofy-kpk-saddar.jpg",
    description: "Prime overhead billboard display for Gofy Oatmilk Cereal Bar along Saddar Road, Peshawar Cantt."
  },
  {
    id: "gofy-lahore-bhati",
    title: "Gofy Brand - Bhati Chowk Campaign",
    brand: "GOFY",
    type: "LARGE FORMAT BILLBOARD",
    location: "Bhati Chowk, Lahore",
    imageSrc: "/portfolio/gofy-lahore-bhati.jpg",
    description: "Prominent rooftop OOH display placement for Gofy Oatmilk Cereal Bar at Bhati Chowk, Lahore."
  },
  {
    id: "gofy-muridke-campaign",
    title: "Gofy Brand - Muridke Highway Campaign",
    brand: "GOFY",
    type: "HIGHWAY BILLBOARD",
    location: "Muridke, Punjab",
    imageSrc: "/portfolio/gofy-muridke.jpg",
    description: "High-visibility roadside billboard placement for Gofy Oatmilk Cereal Bar on GT Road, Muridke."
  },
  {
    id: "study-icon-peshawar",
    title: "Study ICON - Peshawar Campaign",
    brand: "Study ICON",
    type: "LARGE FORMAT BILLBOARD",
    location: "University Road, Peshawar, KPK",
    imageSrc: "/portfolio/study-icon-peshawar.jpg",
    description: "High-visibility billboard placement for Study ICON Study Abroad Consultants in Peshawar."
  },
  {
    id: "ieeep-fair-2026",
    title: "IEEEP Fair 2026 - Industrial Mega Exhibition",
    brand: "IEEEP Fair",
    type: "ILLUMINATED BILLBOARD",
    location: "Expo Center, Lahore",
    imageSrc: "/portfolio/ieeep-fair-2026.jpg",
    description: "Illuminated nighttime event billboard for IEEEP Fair Industrial Exhibition near Expo Center Lahore."
  },
  {
    id: "study-icon-johar-town",
    title: "Study ICON - Johar Town Campaign",
    brand: "Study ICON",
    type: "ILLUMINATED BILLBOARD",
    location: "Johar Town, Lahore",
    imageSrc: "/portfolio/study-icon-johar-town.jpg",
    description: "Night-time high-visibility billboard display for Study ICON Study Abroad Consultants in Johar Town, Lahore."
  }
];
