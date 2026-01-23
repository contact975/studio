import { Header } from '@/components/landing/header';
import { HeroSection } from '@/components/landing/hero-section';
import { ClientsSection } from '@/components/landing/clients-section';
import { ServicesSection } from '@/components/landing/services-section';
import { WhyUsSection } from '@/components/landing/why-us-section';
import { TestimonialsSection } from '@/components/landing/testimonials-section';
import { FaqSection } from '@/components/landing/faq-section';
import { Footer } from '@/components/landing/footer';

export default function Home() {
  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <ClientsSection />
        <ServicesSection />
        <WhyUsSection />
        <TestimonialsSection />
        <FaqSection />
      </main>
      <Footer />
    </div>
  );
}
