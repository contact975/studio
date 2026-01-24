import { Header } from '@/components/landing/header';
import { Footer } from '@/components/landing/footer';

export default function MediaContentPage() {
  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <section className="animate-gradient text-white py-24 relative overflow-hidden">
            <div className="container mx-auto px-6 text-center">
                <h1 className="text-5xl font-bold font-headline mb-6">Innovative Accounting for Future Business</h1>
                <p className="text-xl opacity-90">ยกระดับธุรกิจของคุณด้วยระบบบัญชีดิจิทัลชั้นนำ</p>
            </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
