import Navbar from '@/components/nav/Navbar'
import AboutSection from '@/components/about/AboutSection'
import Footer from '@/components/footer/Footer'

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-brand-black flex flex-col pt-20">
      <Navbar />
      <div className="flex-grow">
        <AboutSection />
      </div>
      <Footer />
    </main>
  )
}
