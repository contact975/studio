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
export const blogMeta: Record<string, { title: string; description: string; image: string; lastModified?: string }> = {
  // ── ชุดใหม่ ก.ย. 2569 (เนื้อหาอยู่ใน lib/blog-posts.ts) ──
  'vat-registration-when-required': {
    title: 'จด VAT เมื่อไหร่ รายได้ถึง 1.8 ล้านต้องทำอะไรบ้าง',
    description: 'รายรับเกิน 1.8 ล้านต้องจด VAT ภายใน 30 วัน ไม่จดโดนย้อนหลังทั้ง 7% เบี้ยปรับ 2 เท่า อธิบายวิธีนับรายได้ ข้อดีข้อเสียของการจดก่อนเกณฑ์ และสิ่งที่เปลี่ยนหลังจด',
    image: 'https://icaccservice.com/images/blog/vat-registration-when-required.jpg',
    lastModified: '2026-09-20',
  },
  'withholding-tax-guide-sme': {
    title: 'ภาษีหัก ณ ที่จ่าย 1% 2% 3% 5% ใช้ตอนไหน ฉบับเจ้าของกิจการ',
    description: 'ตารางอัตราหัก ณ ที่จ่ายที่ SME เจอบ่อย แยกซื้อสินค้า vs จ้างบริการ กฎ 1,000 บาท กำหนดยื่น ภ.ง.ด.3/53 และค่าปรับถ้าลืมหัก',
    image: 'https://icaccservice.com/images/blog/withholding-tax-guide-sme.jpg',
    lastModified: '2026-09-20',
  },
  'director-salary-dividend-loan': {
    title: 'เอาเงินออกจากบริษัทอย่างถูกต้อง เงินเดือน ปันผล หรือกู้ยืมกรรมการ',
    description: 'เปรียบเทียบ 3 วิธีเอาเงินออกจากบริษัทอย่างถูกกฎหมาย เงินเดือนกรรมการเท่าไหร่ไม่เสียภาษี และทำไมลูกหนี้กรรมการคือปัญหาใหญ่ในงบการเงิน',
    image: 'https://icaccservice.com/images/blog/director-salary-dividend-loan.jpg',
    lastModified: '2026-09-20',
  },
  'corporate-tax-calendar-thailand': {
    title: 'ปฏิทินภาษีบริษัททั้งปี ยื่นอะไร เมื่อไหร่ ค่าปรับเท่าไหร่',
    description: 'กำหนดยื่นภาษีและเอกสารราชการของบริษัทจำกัดทั้งปี ทั้งรายเดือน ภ.ง.ด.1/3/53 ภ.พ.30 ประกันสังคม และรายปี AGM ส่งงบ DBD ภ.ง.ด.50/51 พร้อมค่าปรับ',
    image: 'https://icaccservice.com/images/blog/corporate-tax-calendar-thailand.jpg',
    lastModified: '2026-09-20',
  },
  'deductible-expenses-sme': {
    title: 'ค่าใช้จ่ายแบบไหนหักภาษีได้ แบบไหนโดนบวกกลับ คู่มือ SME',
    description: 'รายการค่าใช้จ่ายต้องห้ามที่โดนบวกกลับบ่อย เพดานค่ารับรอง 0.3% กฎรถยนต์ 1 ล้าน วิธีจัดการบิลไม่มีใบเสร็จ อัตราค่าเสื่อม และรายจ่ายหักได้ 2 เท่า',
    image: 'https://icaccservice.com/images/blog/deductible-expenses-sme.jpg',
    lastModified: '2026-09-20',
  },
  'tax-document-preparation-tips': {
    title: 'เตรียมเอกสารภาษีสำหรับ SME มือใหม่ 5 เคล็ดลับ',
    description: 'เรียนรู้ 5 เคล็ดลับสำคัญในการเตรียมเอกสารภาษีสำหรับ SME ที่มือใหม่ต้องรู้ เพื่อหลีกเลี่ยงปัญหาและลดความเสี่ยงในช่วงยื่นภาษี',
    image: 'https://icaccservice.com/images/blog/tax-document-preparation-tips.jpg',
  },
  'company-vs-partnership-comparison': {
    title: 'จดทะเบียนบริษัท vs ห้างหุ้นส่วน เลือกแบบไหนดี',
    description: 'เปรียบเทียบข้อดีข้อเสียระหว่างการจดทะเบียนบริษัทจำกัดและห้างหุ้นส่วน เพื่อช่วยให้เจ้าของธุรกิจตัดสินใจเลือกรูปแบบที่เหมาะสมที่สุด',
    image: 'https://icaccservice.com/images/blog/company-vs-partnership-comparison.jpg',
  },
  '5-common-accounting-mistakes-sme-chiangmai': {
    title: 'ปิดงบการเงิน SME เชียงใหม่ 5 ข้อผิดพลาดที่พบบ่อย',
    description: 'รู้จัก 5 ข้อผิดพลาดทางบัญชีที่ SME เชียงใหม่พบบ่อยในช่วงปิดงบการเงิน และวิธีหลีกเลี่ยงปัญหาเพื่อให้ธุรกิจดำเนินไปได้อย่างราบรื่น',
    image: 'https://icaccservice.com/images/blog/5-common-accounting-mistakes-sme-chiangmai.jpg',
  },
  'sme-chiang-mai-accounting-guide': {
    title: 'คู่มือบัญชีและภาษี SME เชียงใหม่ ฉบับเจ้าของธุรกิจ',
    description: 'คู่มือครบจบสำหรับ SME เชียงใหม่ในการบริหารจัดการบัญชีและภาษีอย่างมีประสิทธิภาพ เพื่อให้ธุรกิจเติบโตอย่างมั่นคงในปี 2026',
    image: 'https://icaccservice.com/images/blog/sme-chiang-mai-accounting-guide.jpg',
  },
  'tax-guide-chiang-mai-restaurants': {
    title: 'ภาษีร้านอาหารและคาเฟ่เชียงใหม่ ต้องจัดการอย่างไร',
    description: 'คู่มือภาษีสำหรับเจ้าของร้านอาหารและคาเฟ่ในเชียงใหม่ อธิบายวิธีบริหารจัดการภาษีอย่างถูกต้องเพื่อหลีกเลี่ยงการถูกตรวจสอบย้อนหลัง',
    image: 'https://icaccservice.com/images/blog/tax-guide-chiang-mai-restaurants.jpg',
  },
  'pool-villa-tax-guide-chiang-mai': {
    title: 'เปิดเช่า Pool Villa เชียงใหม่ ต้องเสียภาษีอะไรบ้าง',
    description: 'เจ้าของที่พักและ Pool Villa ในเชียงใหม่ต้องรู้ภาษีอะไรบ้าง? คู่มือครบถ้วนตั้งแต่ภาษีเงินได้ ภาษีโรงเรือน ไปจนถึง VAT สำหรับผู้ประกอบการมือใหม่',
    image: 'https://icaccservice.com/images/blog/pool-villa-tax-guide-chiang-mai.jpg',
  },
  'accounting-fee-chiangmai': {
    title: 'ค่าทำบัญชีเชียงใหม่ ราคาเท่าไหร่ เทียบค่าบริการ',
    description: 'ค่าทำบัญชีเชียงใหม่เริ่มต้นที่ 1,500 บาท/เดือน เปรียบเทียบค่าบริการตามขนาดธุรกิจ และช่วยให้คุณเลือกสำนักงานบัญชีได้คุ้มค่าที่สุด',
    image: 'https://icaccservice.com/images/blog/accounting-fee-chiangmai.jpg',
    lastModified: '2026-09-26',
  },
  'company-registration-chiangmai': {
    title: 'จดทะเบียนบริษัทเชียงใหม่ ขั้นตอน เอกสาร ค่าใช้จ่าย',
    description: 'จดทะเบียนบริษัทเชียงใหม่ใช้เวลาเพียง 3-5 วันทำการ ค่าใช้จ่ายเริ่มต้น 5,000-8,000 บาท ครบทุกขั้นตอนตั้งแต่เตรียมเอกสารจนได้หนังสือรับรองบริษัท',
    image: 'https://icaccservice.com/images/blog/company-registration-chiangmai.jpg',
  },
  'how-to-choose-accounting-office-chiangmai': {
    title: 'เลือกสำนักงานบัญชีเชียงใหม่ 5 เกณฑ์ที่ต้องดู',
    description: 'ราคาไม่ใช่ปัจจัยเดียวในการเลือกสำนักงานบัญชี บทความนี้แนะนำ 5 เกณฑ์สำคัญที่ต้องตรวจสอบก่อนตัดสินใจ',
    image: 'https://icaccservice.com/images/blog/how-to-choose-accounting-office-chiangmai.jpg',
  },
  'corporate-tax-chiangmai-guide': {
    title: 'ภาษีนิติบุคคลเชียงใหม่ เจ้าของธุรกิจต้องรู้อะไรบ้าง',
    description: 'SME เชียงใหม่กำไรไม่เกิน 300,000 บาทได้รับยกเว้นภาษี 0% อธิบายครบทุกอัตราและกำหนดการยื่นภาษีสำหรับนิติบุคคล',
    image: 'https://icaccservice.com/images/blog/corporate-tax-chiangmai-guide.jpg',
  },
  'work-permit-chiangmai': {
    title: 'Work Permit เชียงใหม่ 2569 ขั้นตอนและเอกสารที่ต้องรู้',
    description: 'ขอ Work Permit เชียงใหม่ใช้เวลารวม 3-5 เดือน ค่าบริการ 112,000 บาทรวมค่าธรรมเนียมราชการ แบ่งชำระ 3 งวด อธิบายครบทั้ง 6 ขั้นตอน เอกสาร 20 รายการ และคุณสมบัติบริษัทผู้ว่าจ้าง',
    image: 'https://icaccservice.com/images/blog/work-permit-chiangmai.jpg',
    lastModified: '2026-09-23',
  },
};
