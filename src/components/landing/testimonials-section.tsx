import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    id: "testimonial-1",
    name: "คุณสมชาย รักธุรกิจ",
    company: "เจ้าของร้านกาแฟ",
    quote: "IC Accounting ช่วยให้เรื่องบัญชีเป็นเรื่องง่ายมากครับ ทีมงานมืออาชีพและให้คำปรึกษาดีเยี่ยม ทำให้ผมมีเวลาไปโฟกัสกับการขยายสาขาได้เต็มที่",
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
        <h2 className="text-3xl md:text-4xl font-bold font-headline text-center mb-12 text-foreground">
          เสียงจากลูกค้าของเรา
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="bg-card p-6 rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-0 flex flex-col items-center text-center">
                <Avatar className="w-20 h-20 mb-4">
                  <AvatarImage src={testimonial.avatarUrl} alt={testimonial.name} data-ai-hint={testimonial.imageHint} />
                  <AvatarFallback>{testimonial.avatarFallback}</AvatarFallback>
                </Avatar>
                <blockquote className="text-muted-foreground mb-4 italic">
                  "{testimonial.quote}"
                </blockquote>
                <p className="font-semibold text-foreground">{testimonial.name}</p>
                <p className="text-sm text-muted-foreground">{testimonial.company}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
