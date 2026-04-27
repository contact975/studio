'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import AOS from 'aos';
import 'aos/dist/aos.css';

export function AOSProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    AOS.init({
      duration: 600, // Faster animation for perceived speed
      once: true,
      easing: 'ease-out-quad',
      offset: 60, // Smaller offset for mobile responsiveness
      disable: 'mobile', // Optionally disable on mobile if still too slow, but we'll try optimizing first
      startEvent: 'DOMContentLoaded',
    });
  }, []);

  useEffect(() => {
    // Small timeout to ensure DOM is ready after navigation
    const timer = setTimeout(() => {
      AOS.refresh();
    }, 100);
    return () => clearTimeout(timer);
  }, [pathname]);

  return <>{children}</>;
}
