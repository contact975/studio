import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Visa & Work Permit Chiang Mai | IC Accounting',
  description: 'Professional Visa and Work Permit services in Chiang Mai. Non-B Visa, Work Permit, LTR & SMART Visa. English-speaking team, 100% accuracy.',
  alternates: { canonical: 'https://icaccservice.com/visa-work-permit' },
  openGraph: {
    title: 'Visa & Work Permit Chiang Mai | IC Accounting',
    description: 'Professional Visa and Work Permit services in Chiang Mai. English-speaking team.',
    url: 'https://icaccservice.com/visa-work-permit',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}