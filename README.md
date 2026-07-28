# AmkAds — OOH Advertising Agency Website

A modern, fully responsive **Next.js 14** (App Router) website for **AmkAds**, Pakistan's leading Out-of-Home (OOH) media and advertising agency.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v3
- **Icons**: Lucide React
- **Animations**: CSS Keyframes + IntersectionObserver
- **Fonts**: Google Fonts — Inter + Outfit (via `next/font`)

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with fonts + metadata
│   ├── page.tsx            # Home page
│   └── globals.css         # Tailwind + custom CSS
└── components/
    ├── nav/Navbar.tsx          # Sticky navbar + mobile menu
    ├── hero/HeroSection.tsx    # Hero with pillars + CTAs
    ├── stats/StatsSection.tsx  # Animated counters + city grid
    ├── services/ServicesSection.tsx  # 5 OOH service cards
    ├── tools/ToolsSection.tsx  # 4 proprietary tech tools
    ├── portfolio/PortfolioSection.tsx # Logo grid + ticker
    ├── group/GroupSection.tsx  # Ecosystem cards
    ├── contact/ContactSection.tsx # Contact form
    └── footer/Footer.tsx       # Footer with links + socials
```

## Color Theme

| Variable | Color | Hex |
|---|---|---|
| Primary | Electric Blue | `#2563EB` |
| Secondary | Energetic Amber | `#F97316` |
| Background | Dark Navy | `#0F172A` |
| Surface | Navy Light | `#1E293B` |

## © 2026 AmkAds. All rights reserved.
