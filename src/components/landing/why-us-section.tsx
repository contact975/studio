import { Award, Laptop, Handshake, Briefcase } from "lucide-react";

const features = [
  {
    icon: <Award className="h-10 w-10 text-primary mb-4" />,
    title: "Professional Expertise (เชี่ยวชาญและรู้จริง)",
    description: "เราคือทีมงานมืออาชีพที่มีประสบการณ์ตรงในเชียงใหม่ เราไม่ได้ทำแค่ตัวเลข แต่เราเข้าใจบริบทของธุรกิจในพื้นที่อย่างแท้จริง พร้อมจัดการทุกความซับซ้อนให้กลายเป็นความถูกต้อง เพื่อรากฐานธุรกิจที่มั่นคงของคุณ",
  },
  {
    icon: <Laptop className="h-10 w-10 text-primary mb-4" />,
    title: "Tech-Driven Accounting (ขับเคลื่อนด้วยเทคโนโลยี)",
    description: "ก้าวข้ามการทำบัญชีแบบเดิมด้วยซอฟต์แวร์ที่ทันสมัยอย่าง Clero ช่วยให้คุณเข้าถึงข้อมูลทางการเงินได้แบบ Real-time รวดเร็ว และแม่นยำ ตอบโจทย์นักธุรกิจยุคใหม่ที่ต้องการข้อมูลเพื่อการตัดสินใจที่ทันท่วงที",
  },
  {
    icon: <Handshake className="h-10 w-10 text-primary mb-4" />,
    title: "Personalized Service (ดูแลอย่างใกล้ชิดและเป็นกันเอง)",
    description: "เรายึดถือการบริการด้วยใจ ให้คำปรึกษาที่เข้าใจง่าย ไม่ซับซ้อน เพราะเราเชื่อว่าพาร์ทเนอร์ที่ดีต้องคุยกันได้ทุกเรื่อง เราพร้อมเป็น \"ที่ปรึกษาธุรกิจ (Business Consultant)\" ที่ลงพื้นที่ดูแลคุณถึงหน้างาน เพื่อให้ธุรกิจของคุณเดินหน้าได้อย่างลื่นไหลไม่มีสะดุด",
  },
  {
    icon: <Briefcase className="h-10 w-10 text-primary mb-4" />,
    title: "One Stop Business Solution (ครบจบในที่เดียว)",
    description: "ประหยัดเวลาและลดความยุ่งยากด้วยบริการที่ครอบคลุม ทั้งงานบัญชี ภาษี จดทะเบียนบริษัท งานเอกสารต่างชาติ (Visa/Work Permit) ไปจนถึงการผลิต Media Content เพื่อสร้างภาพลักษณ์แบรนด์ให้โดดเด่น",
  },
];

export function WhyUsSection() {
  return (
    <section className="py-20 md:py-28 bg-secondary">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold font-headline mb-16 text-foreground">
          ทำไมต้องเลือก IC Accounting & Service?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center bg-card p-8 rounded-xl shadow-sm transition-shadow hover:shadow-lg">
              {feature.icon}
              <h3 className="text-xl font-bold text-primary mb-4 text-center">{feature.title}</h3>
              <p className="text-muted-foreground text-center leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
