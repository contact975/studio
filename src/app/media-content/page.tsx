import { Header } from '@/components/landing/header';
import { Footer } from '@/components/landing/footer';
import { Camera } from 'lucide-react';

export default function MediaContentPage() {
  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <section className="bg-primary py-24 text-primary-foreground">
          <div className="container mx-auto px-6 text-center">
            <Camera className="h-16 w-16 mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold font-headline mb-6">บริการ Exclusive Media</h1>
            <p className="text-xl opacity-90 leading-relaxed max-w-2xl mx-auto">
              Coming Soon! We are preparing exciting services to help your brand shine online.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
