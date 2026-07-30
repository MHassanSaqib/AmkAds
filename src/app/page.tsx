import Navbar from '@/components/nav/Navbar'
import HeroSection from '@/components/hero/HeroSection'
import StatsSection from '@/components/stats/StatsSection'
import ServicesSection from '@/components/services/ServicesSection'
import PortfolioSection from '@/components/portfolio/PortfolioSection'
import GroupSection from '@/components/group/GroupSection'
import ContactSection from '@/components/contact/ContactSection'
import AboutSection from '@/components/about/AboutSection'
import Footer from '@/components/footer/Footer'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-brand-navy">
      <Navbar />
      <HeroSection />
      <StatsSection />
      <AboutSection />
      <ServicesSection />
      <PortfolioSection />
      <GroupSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
