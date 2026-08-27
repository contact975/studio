/**
 * ข้อมูล meta ของบทความทั้งหมด — แหล่งข้อมูลเดียวของระบบ
 *
 * ใช้ร่วมกัน 3 ที่:
 *   - app/blog/[id]/layout.tsx  -> generateMetadata ของแต่ละบทความ
 *   - app/sitemap.ts            -> รายชื่อ URL บทความใน sitemap
 *   - components/seo/related-articles.tsx -> ลิงก์บทความที่เกี่ยวข้อง
 *
 * เพิ่มบทความใหม่ที่นี่ที่เดียว ทั้งสามที่จะอัปเดตตามเอง
 *
 * เดิม object นี้อยู่ใน layout.tsx แล้ว export ออกไป แต่ Next.js ไม่อนุญาต
 * ให้ไฟล์ route (layout/page) export ตัวแปรอื่นนอกจากที่กำหนดไว้
 * (TS2344: Property 'blogMeta' is incompatible with index signature)
 */
export const blogMeta: Record<string, { title: string; description: string; image: string }> = {
  'tax-document-preparation-tips': {
    title: '5 เคล็ดลับการเตรียมเอกสารภาษีสำหรับ SME มือใหม่',
    description: 'เรียนรู้ 5 เคล็ดลับสำคัญในการเตรียมเอกสารภาษีสำหรับ SME ที่มือใหม่ต้องรู้ เพื่อหลีกเลี่ยงปัญหาและลดความเสี่ยงในช่วงยื่นภาษี',
    image: 'https://icaccservice.com/images/blog/ic-accounting-chiangmai-service-audit.jpg',
  },
  'company-vs-partnership-comparison': {
    title: 'จดทะเบียนบริษัท vs ห้างหุ้นส่วน แบบไหนเหมาะกับคุณมากกว่ากัน?',
    description: 'เปรียบเทียบข้อดีข้อเสียระหว่างการจดทะเบียนบริษัทจำกัดและห้างหุ้นส่วน เพื่อช่วยให้เจ้าของธุรกิจตัดสินใจเลือกรูปแบบที่เหมาะสมที่สุด',
    image: 'https://icaccservice.com/images/blog/ic-accounting-chiangmai-service-register.jpg',
  },
  '5-common-accounting-mistakes-sme-chiangmai': {
    title: '5 ข้อผิดพลาดที่ SME เชียงใหม่มักเจอ เมื่อถึงฤดูกาลปิดงบการเงิน',
    description: 'รู้จัก 5 ข้อผิดพลาดทางบัญชีที่ SME เชียงใหม่พบบ่อยในช่วงปิดงบการเงิน และวิธีหลีกเลี่ยงปัญหาเพื่อให้ธุรกิจดำเนินไปได้อย่างราบรื่น',
    image: 'https://icaccservice.com/images/blog/ic-accounting-chiangmai-service-consult.jpg',
  },
  'sme-chiang-mai-accounting-guide': {
    title: 'คัมภีร์ SME เชียงใหม่: บริหารจัดการบัญชีและภาษีอย่างไรให้ธุรกิจโตแบบก้าวกระโดดในปี 2026',
    description: 'คู่มือครบจบสำหรับ SME เชียงใหม่ในการบริหารจัดการบัญชีและภาษีอย่างมีประสิทธิภาพ เพื่อให้ธุรกิจเติบโตอย่างมั่นคงในปี 2026',
    image: 'https://icaccservice.com/images/blog/ic-accounting-chiangmai-service-account.jpg',
  },
  'tax-guide-chiang-mai-restaurants': {
    title: 'ภาษีร้านอาหารและคาเฟ่ในเชียงใหม่: บริหารจัดการอย่างไรให้ไม่โดนเรียกตรวจย้อนหลัง',
    description: 'คู่มือภาษีสำหรับเจ้าของร้านอาหารและคาเฟ่ในเชียงใหม่ อธิบายวิธีบริหารจัดการภาษีอย่างถูกต้องเพื่อหลีกเลี่ยงการถูกตรวจสอบย้อนหลัง',
    image: 'https://icaccservice.com/images/blog/ic-accounting-chiangmai-service-audit.jpg',
  },
  'pool-villa-tax-guide-chiang-mai': {
    title: 'เปิดเช่าที่พัก/Pool Villa ในเชียงใหม่ ต้องเสียภาษีอะไรบ้าง? คู่มือสำหรับเจ้าของธุรกิจมือใหม่',
    description: 'เจ้าของที่พักและ Pool Villa ในเชียงใหม่ต้องรู้ภาษีอะไรบ้าง? คู่มือครบถ้วนตั้งแต่ภาษีเงินได้ ภาษีโรงเรือน ไปจนถึง VAT สำหรับผู้ประกอบการมือใหม่',
    image: 'https://icaccservice.com/images/blog/ic-accounting-chiangmai-service-account.jpg',
  },
  'accounting-fee-chiangmai': {
    title: 'รับทำบัญชีเชียงใหม่ ราคาเท่าไหร่? เปรียบเทียบค่าบริการที่ควรรู้',
    description: 'ค่าทำบัญชีเชียงใหม่เริ่มต้นที่ 1,500 บาท/เดือน เปรียบเทียบค่าบริการตามขนาดธุรกิจ และช่วยให้คุณเลือกสำนักงานบัญชีได้คุ้มค่าที่สุด',
    image: 'https://icaccservice.com/images/blog/ic-accounting-chiangmai-service-account.jpg',
  },
  'company-registration-chiangmai': {
    title: 'จดทะเบียนบริษัทเชียงใหม่ 2568 ขั้นตอน เอกสาร และค่าใช้จ่ายที่ต้องรู้',
    description: 'จดทะเบียนบริษัทเชียงใหม่ใช้เวลาเพียง 3-5 วันทำการ ค่าใช้จ่ายเริ่มต้น 5,000-8,000 บาท ครบทุกขั้นตอนตั้งแต่เตรียมเอกสารจนได้หนังสือรับรองบริษัท',
    image: 'https://icaccservice.com/images/blog/ic-accounting-chiangmai-service-register.jpg',
  },
  'how-to-choose-accounting-office-chiangmai': {
    title: 'เลือกสำนักงานบัญชีเชียงใหม่ อย่างไรให้ธุรกิจได้ประโยชน์สูงสุด',
    description: 'ราคาไม่ใช่ปัจจัยเดียวในการเลือกสำนักงานบัญชี บทความนี้แนะนำ 5 เกณฑ์สำคัญที่ต้องตรวจสอบก่อนตัดสินใจ',
    image: 'https://icaccservice.com/images/blog/ic-accounting-chiangmai-service-consult.jpg',
  },
  'corporate-tax-chiangmai-guide': {
    title: 'ภาษีนิติบุคคลเชียงใหม่ 2568 เจ้าของธุรกิจต้องรู้อะไรบ้าง',
    description: 'SME เชียงใหม่กำไรไม่เกิน 300,000 บาทได้รับยกเว้นภาษี 0% อธิบายครบทุกอัตราและกำหนดการยื่นภาษีสำหรับนิติบุคคล',
    image: 'https://icaccservice.com/images/blog/ic-accounting-chiangmai-service-audit.jpg',
  },
  'work-permit-chiangmai': {
    title: 'Work Permit เชียงใหม่ 2569 ขั้นตอนและเอกสารที่ชาวต่างชาติต้องรู้',
    description: 'ขอ Work Permit เชียงใหม่ใช้เวลาพิจารณา 5-10 วันทำการ ค่าธรรมเนียมราชการ 750-3,000 บาท อธิบายครบทั้งเอกสาร ขั้นตอน และอัตราส่วนพนักงานไทย 4:1',
    image: 'https://icaccservice.com/images/blog/visa-work-permit-chiangmai.jpg',
  },
};
