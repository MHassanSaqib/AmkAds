import Navbar from '@/components/nav/Navbar'
import HeroSection from '@/components/hero/HeroSection'
import StatsSection from '@/components/stats/StatsSection'
import ToolsSection from '@/components/tools/ToolsSection'
import ServicesSection from '@/components/services/ServicesSection'
import PortfolioSection from '@/components/portfolio/PortfolioSection'
import GroupSection from '@/components/group/GroupSection'
import ContactSection from '@/components/contact/ContactSection'
import Footer from '@/components/footer/Footer'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-brand-navy">
      <Navbar />
      <HeroSection />
      <StatsSection />
      <ServicesSection />
      <ToolsSection />
      <PortfolioSection />
      <GroupSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
