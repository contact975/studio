import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    id: "testimonial-1",
    name: "คุณสมชาย รักธุรกิจ",
    company: "เจ้าของร้าน Smash Daddy's",
    quote: "IC Accounting ช่วยทำให้การจัดการหลังบ้านเป็นเรื่องที่ง่ายขึ้น เป็นที่ปรึกษาที่ดี และคอยให้คำแนะนำเสนอ มีความเป็นมืออาชีพ ทำให้เรามีเวลาไปโฟกัสเรื่องอื่นได้มากขึ้น",
    avatarUrl: "https://picsum.photos/seed/avatar1/80/80",
    avatarFallback: "ส",
    imageHint: "man portrait"
  },
  {
    id: "testimonial-2",
    name: "คุณสิตา พัฒนาซอฟต์แวร์",
    company: "กรรมการผู้จัดการ บริษัท เทคโลโลยี จำกัด",
    quote: "ประทับใจในความรวดเร็วและความแม่นยำมากค่ะ การใช้เทคโนโลยีเข้ามาช่วยทำให้เราเห็นภาพรวมธุรกิจได้ชัดเจนขึ้นเยอะเลย",
    avatarUrl: "https://picsum.photos/seed/avatar2/80/80",
    avatarFallback: "ส",
    imageHint: "woman portrait"
  },
  {
    id: "testimonial-3",
    name: "Mr. John Smith",
    company: "Foreign Entrepreneur",
    quote: "The team was incredibly helpful with my Visa and Work Permit application. They made a complex process feel simple and stress-free. Highly recommended!",
    avatarUrl: "https://picsum.photos/seed/avatar3/80/80",
    avatarFallback: "JS",
    imageHint: "man portrait"
  },
];

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <h2 data-aos="fade-up" className="text-3xl md:text-4xl font-bold font-headline text-center mb-12 text-primary">
          เสียงจากลูกค้าของเรา
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={testimonial.id} data-aos="fade-up" data-aos-delay={index * 100} className="bg-primary p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border-none group">
              <CardContent className="p-0 flex flex-col items-center text-center">
                <Avatar className="w-20 h-20 mb-6 ring-4 ring-white/20 transition-all group-hover:ring-white/40">
                  <AvatarImage src={testimonial.avatarUrl} alt={testimonial.company} data-ai-hint={testimonial.imageHint} />
                  <AvatarFallback className="bg-white/10 text-white">{testimonial.avatarFallback}</AvatarFallback>
                </Avatar>
                <blockquote className="text-primary-foreground/90 mb-6 italic text-lg leading-relaxed">
                  "{testimonial.quote}"
                </blockquote>
                <div className="space-y-1">
                  <p className="text-primary-foreground/90 font-medium">{testimonial.company}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
