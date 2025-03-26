import Hero from '@/components/Hero'
import Services from '@/components/Services'
import WhyChooseUs from '@/components/WhyChooseUs'
import Testimonials from '@/components/Testimonials'
import CTASection from '@/components/CTASection'

export default function Home() {
  return (
    <div className="space-y-20">
      <Hero />
      <Services />
      <WhyChooseUs />
      <Testimonials />
      <CTASection />
    </div>
  )
}