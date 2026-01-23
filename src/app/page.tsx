import { Header } from '@/components/landing/header';
import { HeroSection } from '@/components/landing/hero-section';
import { ServicesSection } from '@/components/landing/services-section';
import { WhyUsSection } from '@/components/landing/why-us-section';
import { Footer } from '@/components/landing/footer';

export default function Home() {
  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <ServicesSection />
        <WhyUsSection />
      </main>
      <Footer />
    </div>
  );
}
