import { Award, Laptop, Handshake } from "lucide-react";

const features = [
  {
    icon: <Award className="h-10 w-10 text-primary mb-4" />,
    title: "เชี่ยวชาญ",
    description: "ทีมงานมืออาชีพ ประสบการณ์ตรงในเชียงใหม่",
  },
  {
    icon: <Laptop className="h-10 w-10 text-primary mb-4" />,
    title: "เทคโนโลยี",
    description: "ใช้ซอฟต์แวร์บัญชีที่ทันสมัย (Clero) เข้าถึงข้อมูลได้รวดเร็ว",
  },
  {
    icon: <Handshake className="h-10 w-10 text-primary mb-4" />,
    title: "เป็นกันเอง",
    description: "ให้คำปรึกษาที่เข้าใจง่าย ไม่ซับซ้อน",
  },
];

export function WhyUsSection() {
  return (
    <section className="py-20 md:py-28 bg-secondary">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold font-headline mb-12 text-foreground">
          ทำไมต้องเลือก IC Accounting
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center">
              {feature.icon}
              <h3 className="text-xl font-bold text-primary mb-2">{feature.title}</h3>
              <p className="text-muted-foreground max-w-xs">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
