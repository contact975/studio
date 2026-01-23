import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BarChart3, FileText, Briefcase, Globe2, LayoutGrid, Clapperboard, Users } from "lucide-react";

const services = [
  {
    icon: <BarChart3 className="h-10 w-10 text-primary" />,
    title: "บริการทำบัญชี (Accounting Services)",
    description: "จัดระเบียบเอกสารรายรับ-รายจ่าย บันทึกบัญชี และดูแลเรื่องภาษีรายเดือนให้ถูกต้องแม่นยำ ช่วยให้เจ้าของธุรกิจเห็นกระแสเงินสดและลดความเสี่ยงจากการโดนค่าปรับย้อนหลัง",
  },
  {
    icon: <FileText className="h-10 w-10 text-primary" />,
    title: "ปิดงบประจำปี (Annual Financial Audit)",
    description: "ตรวจสอบและจัดทำงบการเงินเพื่อยื่นต่อกรมพัฒนาธุรกิจการค้าและกรมสรรพากรให้ทันตามกำหนด ดูแลโดยทีมงานคนรุ่นใหม่ที่อัปเดตกฎหมายสม่ำเสมอ เพื่อความถูกต้อง 100%",
  },
  {
    icon: <Briefcase className="h-10 w-10 text-primary" />,
    title: "จดทะเบียนบริษัท (Company Registration)",
    description: "เริ่มต้นธุรกิจให้ถูกกฎหมาย ครบทุกขั้นตอนตั้งแต่การจองชื่อจนถึงได้รับหนังสือรับรอง ให้คำปรึกษาเรื่องโครงสร้างธุรกิจเพื่อให้คุณเริ่มต้นได้อย่างมั่นใจและประหยัดเวลา",
  },
  {
    icon: <Globe2 className="h-10 w-10 text-primary" />,
    title: "บริการทำ Visa & Work Permit (Expat Services)",
    description: "ทำ Visa: ดูแลการขอและต่ออายุวีซ่าทุกประเภท ให้พำนักในไทยได้อย่างถูกต้อง Work Permit: จัดการใบอนุญาตทำงานและประสานงานหน่วยงานราชการให้ครบทุกขั้นตอน",
  },
  {
    icon: <LayoutGrid className="h-10 w-10 text-primary" />,
    title: "วางระบบองค์กร (Organization System Design)",
    description: "ปรับการจัดการหลังบ้าน สอนใช้งานโปรแกรมบัญชี และวางขั้นตอนการเดินเอกสารให้เป็นระบบ ออกแบบระบบให้เหมาะสมกับธุรกิจที่สุด เพื่อการตรวจสอบที่ง่ายและการเติบโตที่ยั่งยืน",
  },
  {
    icon: <Clapperboard className="h-10 w-10 text-primary" />,
    title: "ผลิต Media Content Online (Marketing Content)",
    description: "รับผลิตวิดีโอและกราฟิกคุณภาพสูงเพื่อสร้างภาพลักษณ์ให้น่าเชื่อถือและอัปเกรดแบรนด์ ช่วยให้ธุรกิจมีตัวตนบนโลกออนไลน์ควบคู่ไปกับระบบบัญชีที่แข็งแกร่ง",
  },
  {
    icon: <Users className="h-10 w-10 text-primary" />,
    title: "บริการดูแลลูกค้า ซัพพอร์ต (Customer Support)",
    description: "พร้อมให้คำปรึกษาแบบใกล้ชิดและเป็นกันเองในฐานะ 'เลขาส่วนตัวธุรกิจ' ซัพพอร์ตทุกปัญหาเพื่อให้ธุรกิจของคุณลื่นไหลและไม่สะดุด",
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl font-bold font-headline text-center mb-12 text-foreground">
          บริการของเรา
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="flex flex-col items-start p-8 rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300">
              <div className="mb-4">{service.icon}</div>
              <CardHeader className="p-0 mb-3">
                <CardTitle className="text-xl font-semibold text-foreground">{service.title}</CardTitle>
              </CardHeader>
              <CardDescription className="text-base text-muted-foreground">{service.description}</CardDescription>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
