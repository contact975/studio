import Link from "next/link";
import { Facebook, MessageCircle, MapPin, Phone, Mail } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  return (
    <footer id="contact" className="bg-secondary text-foreground py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
          
          {/* Left Column: Contact Info */}
          <div className="space-y-8">
            <h3 className="font-headline text-3xl font-bold text-primary">ติดต่อเรา (Contact Us)</h3>
            
            <div className="space-y-6 text-lg">
              <div className="flex items-start gap-4">
                <MapPin className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold">ที่อยู่</p>
                  <p className="text-muted-foreground">80/142 ต.สันปู่เลย อ.ดอยสะเก็ด เชียงใหม่ 50220</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Phone className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold">โทรศัพท์</p>
                  <p className="text-muted-foreground">095-716-1422</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Mail className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold">Email</p>
                  <p className="text-muted-foreground">contact@icaccservice.com</p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-xl font-semibold mb-4 text-foreground">ติดตามเรา (Follow Us)</h4>
              <div className="flex space-x-4">
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors" prefetch={false}>
                  <Facebook className="h-7 w-7" />
                  <span className="sr-only">Facebook</span>
                </Link>
                <Link href="https://line.me/ti/p/~" target="_blank" className="text-muted-foreground hover:text-primary transition-colors" prefetch={false}>
                  <MessageCircle className="h-7 w-7" />
                  <span className="sr-only">Line</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column: Google Map */}
          <div className="relative w-full h-full min-h-[300px] md:min-h-full rounded-xl overflow-hidden shadow-lg border">
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
        
        <Separator className="my-8 bg-border/50" />

        <div className="text-center text-muted-foreground text-sm">
          © {new Date().getFullYear()} IC Accounting & Service. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
