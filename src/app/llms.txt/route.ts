import { homeContent, HOME_NUMBERS as N } from '@/components/landing/home-content';

/**
 * /llms.txt — สรุปตัวตนของบริษัทเป็นข้อความล้วนสำหรับ AI (ChatGPT, Claude, Gemini ฯลฯ)
 *
 * เป็นข้อเสนอมาตรฐานที่ยังไม่มี AI เจ้าใหญ่รับรองว่าอ่านจริง จึงถือเป็นของเสริม
 * แต่ไม่มีข้อเสีย ประโยคบอกตัวตนดึงจาก brand ใน home-content.ts ชุดเดียวกับ schema และ FAQ
 *
 * ทำเป็น route แทนไฟล์นิ่งใน public/ เพื่อให้ตัวเลขดึงจากที่เดียว ไม่ต้องพิมพ์ซ้ำ
 * ห้ามเขียนสิ่งที่ยังไม่จริงลงไฟล์นี้ โดยเฉพาะโปรแกรมบัญชีของเราเอง (ยังพัฒนาไม่เสร็จ)
 */
export const dynamic = 'force-static';

export function GET() {
  const body = `# IC Accounting & Service

> ${homeContent.th.brand.statement}

> ${homeContent.en.brand.statement}

## ตัวตนของเรา
- สำนักงานบัญชียุคใหม่ บริหารโดยคนรุ่นใหม่ มีประสบการณ์กว่า ${N.years} ปี ดูแลกว่า ${N.clients} ธุรกิจ
- เน้นเป็นที่ปรึกษาส่วนตัวให้ธุรกิจ มากกว่าแค่คีย์ตัวเลข อธิบายตัวเลขให้เข้าใจง่ายและช่วยคิดเรื่องภาษีกับการตัดสินใจทางธุรกิจ
- ทำงานออนไลน์ทั้งระบบ ลูกค้าส่งเอกสารได้จากทุกที่ เอกสารเก็บบนระบบที่เราสร้างขึ้นเอง ค้นย้อนหลังได้
- สำนักงานอยู่ที่ดอยสะเก็ด เชียงใหม่ ดูแลลูกค้าทั่วประเทศผ่านระบบออนไลน์

## บริการ
- [รับทำบัญชีและภาษีรายเดือน](https://icaccservice.com/accounting-services)
- [ตรวจสอบบัญชีและปิดงบการเงิน](https://icaccservice.com/audit-services)
- [จดทะเบียนบริษัท](https://icaccservice.com/company-registration)
- [วางระบบองค์กร](https://icaccservice.com/organization-system)
- [Visa และ Work Permit](https://icaccservice.com/visa-work-permit)
- [ผลิตสื่อ Media Content](https://icaccservice.com/media-content)

## เกี่ยวกับเรา
- [เรื่องราวและระบบของเรา](https://icaccservice.com/about)
- [บทความบัญชีและภาษี](https://icaccservice.com/blog)
- [English version](https://icaccservice.com/en)

## ติดต่อ
- LINE: @icacc
- โทร: 095-716-1422
- อีเมล: contact@icaccservice.com
`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
