import Link from "next/link";
import { Facebook, MessageCircle, MapPin, Phone, Mail } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  return (
    <footer id="contact" className="bg-primary text-primary-foreground py-12 md:py-16">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Left Column: Contact Info */}
          <div className="space-y-8">
            <Link href="/" className="font-bold text-2xl text-primary-foreground font-headline">
              IC Accounting & Service
            </Link>
            
            <div className="space-y-4 text-base">
               <h3 className="font-headline text-xl font-bold text-primary-foreground">ติดต่อเรา (Contact Us)</h3>
              <div className="flex items-start gap-4">
                <MapPin className="h-5 w-5 text-primary-foreground/80 mt-1 flex-shrink-0" />
                <p className="text-primary-foreground/80">80/142 ต.สันปู่เลย อ.ดอยสะเก็ด เชียงใหม่ 50220</p>
              </div>
              <div className="flex items-center gap-4">
                <Phone className="h-5 w-5 text-primary-foreground/80 flex-shrink-0" />
                <a href="tel:0957161422" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">095-716-1422</a>
              </div>
              <div className="flex items-center gap-4">
                <Mail className="h-5 w-5 text-primary-foreground/80 flex-shrink-0" />
                <a href="mailto:contact@icaccservice.com" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">contact@icaccservice.com</a>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-3 text-primary-foreground">ติดตามเรา (Follow Us)</h4>
              <div className="flex space-x-3">
                <Link href="https://www.facebook.com/icaccservice" target="_blank" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors" prefetch={false}>
                  <Facebook className="h-6 w-6" />
                  <span className="sr-only">Facebook</span>
                </Link>
                <Link href="https://line.me/R/ti/p/@374jshvh" target="_blank" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors" prefetch={false}>
                  <MessageCircle className="h-6 w-6" />
                  <span className="sr-only">Line</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column: Google Map */}
          <div className="relative w-full h-full min-h-[250px] md:min-h-full rounded-xl overflow-hidden shadow-lg border-2 border-primary-foreground/20">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3777.300649716109!2d99.0672194!3d18.7822907!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30da2518e755b42f%3A0x99c60fd368c56643!2sIC%20Accounting%20%26%20Service!5e0!3m2!1sen!2sth"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute top-0 left-0"
            ></iframe>
          </div>
        </div>
        
        <Separator className="my-8 bg-primary-foreground/20" />

        <div className="flex flex-col sm:flex-row justify-between items-center text-primary-foreground/70 text-xs">
          <p>© {new Date().getFullYear()} IC Accounting & Service. All rights reserved.</p>
           {/* Future links can go here e.g. Terms, Privacy */}
        </div>
      </div>
    </footer>
  );
}
