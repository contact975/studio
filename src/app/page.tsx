'use client';

import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Header } from '@/components/landing/header';
import { HeroSection } from '@/components/landing/hero-section';
import { ServicesSection } from '@/components/landing/services-section';
import { WhyUsSection } from '@/components/landing/why-us-section';
import { TestimonialsSection } from '@/components/landing/testimonials-section';
import { FaqSection } from '@/components/landing/faq-section';
import { Footer } from '@/components/landing/footer';
import { ClientsSection } from '@/components/landing/clients-section';
import { PromoCarousel } from '@/components/landing/promo-carousel';

export default function Home() {
  useEffect(() => {
    // Optimized AOS settings for performance
    AOS.init({
      duration: 600, // Faster animations feel snappier
      once: true, // Only animate once
      offset: 50, // Trigger sooner
      disable: 'mobile', // Disable animations on small screens if they still lag, or keep it light
    });
  }, []);
  
  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <ClientsSection />
        <ServicesSection />
        <div data-aos="fade-up">
          <PromoCarousel />
        </div>
        <WhyUsSection />
        <TestimonialsSection />
        <FaqSection />
      </main>
      <Footer />
    </div>
  );
}
