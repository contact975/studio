import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BarChart3, FileText, Globe2 } from "lucide-react";

const services = [
  {
    icon: <BarChart3 className="h-10 w-10 text-primary" />,
    title: "รับทำบัญชีและภาษี",
    description: "จัดทำสมุดบัญชี ยื่นภาษีรายเดือน และปิดงบการเงินประจำปีอย่างถูกต้องตามกฎหมาย",
  },
  {
    icon: <FileText className="h-10 w-10 text-primary" />,
    title: "จดทะเบียนนิติบุคคล",
    description: "บริการจดทะเบียนบริษัท ห้างหุ้นส่วนจำกัด และแก้ไขเปลี่ยนแปลงรายการทางทะเบียนทุกชนิด",
  },
  {
    icon: <Globe2 className="h-10 w-10 text-primary" />,
    title: "Visa & Work Permit",
    description: "บริการให้คำปรึกษาและดำเนินการขอวีซ่าและใบอนุญาตทำงานสำหรับชาวต่างชาติ",
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl font-bold font-headline text-center mb-12 text-foreground">
          บริการของเรา
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
