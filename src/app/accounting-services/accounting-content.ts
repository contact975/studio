import {
  SMART_PRICE,
  SMART_MIN_PRICE,
  SMART_BUNDLE_PRICE,
  SMART_STANDARD_PRICE,
  TOTAL_PRICE,
  formatPrice as p,
  type ComparisonId,
  type SmartServiceId,
  type TotalExtraGroup,
} from '@/lib/accounting-packages';

/**
 * เนื้อหาหน้าบริการทำบัญชี ทั้งสองภาษา
 *
 * หน้าไทย /accounting-services และหน้าอังกฤษ /en/accounting-services
 * ใช้เทมเพลตเดียวกัน ดีไซน์และลำดับหัวข้อจึงต่างกันไม่ได้ ต่างแค่ข้อความในไฟล์นี้
 * type บังคับให้ทั้งสองภาษามีคีย์ครบเท่ากัน ลืมแปลตรงไหนจะ build ไม่ผ่าน
 *
 * ── ราคาไม่อยู่ในไฟล์นี้ ──
 * ทุกตัวเลขดึงจาก lib/accounting-packages.ts รวมถึงตัวเลขที่อยู่ในคำตอบ FAQ
 * เดิม FAQ พิมพ์ราคาซ้ำไว้เอง ถ้าปรับราคาแล้วลืมแก้ FAQ จะขัดกับการ์ดราคาในหน้าเดียวกัน
 *
 * ── ป้ายรอง (alt) ──
 * ชื่อบริการแต่ละรายการมีป้ายรองตัวเล็กอีกภาษา หน้าไทยแสดงชื่ออังกฤษ (มีมาแต่เดิม)
 * หน้าอังกฤษแสดงชื่อแบบฟอร์มภาษาไทย เช่น ภ.พ.30 เพราะชาวต่างชาติต้องเจอชื่อนี้บนเอกสารจริง
 */

type Labeled = { name: string; alt: string };

export type AccountingContent = {
  htmlLang: string;
  meta: { title: string; description: string; ogDescription: string };
  crumb: { home: string; homeHref: string; current: string };
  hero: {
    eyebrow: string;
    h1Line1: string;
    h1Line2: string;
    /** ข้อความนำ ประกอบเป็น intro + <b>IC Smart</b> + smart + <b>IC Total</b> + total */
    lead: { intro: string; smart: string; total: string };
    chips: string[];
  };
  packages: {
    eyebrow: string;
    title: string;
    sublead: string;
    perMonth: string;
    fitLabel: string;
    badge: string;
    pickerHint: string;
    smartDisclaimer: string;
    totalCta: string;
    smart: { tagline: Labeled; priceNote: string; fit: string };
    total: { tagline: Labeled; priceNote: string; fit: string };
  };
  smartServices: Record<SmartServiceId, Labeled>;
  /** ข้อความของตัวเลือกบริการ ส่งเข้าคอมโพเนนต์ฝั่ง client จึงต้องเป็นข้อความล้วน ใช้ {n} {price} แทนตัวแปร */
  picker: {
    allSelected: string;
    someSelected: string;
    perMonth: string;
    bundleBadge: string;
    minHint: string;
    ctaAll: string;
    ctaSome: string;
    ctaNone: string;
  };
  totalExtras: Record<TotalExtraGroup, { title: Labeled; items: string[] }>;
  comparison: {
    eyebrow: string;
    title: string;
    sublead: string;
    colService: string;
    included: string;
    notIncluded: string;
    rows: Record<ComparisonId, { name: string; desc: string }>;
  };
  guidance: { eyebrow: string; title: string; smartTitle: string; totalTitle: string; smart: string[]; total: string[] };
  steps: { eyebrow: string; title: string; items: { step: string; title: string; desc: string }[] };
  notes: {
    scopeTitle: string;
    scope: string[];
    separateTitle: string;
    audit: { text: string; link: string; href: string };
    separateOther: string;
  };
  terms: { title: string; items: string[]; footnote: string };
  faq: { title: string; intro: string; items: { q: string; a: string }[] };
  related: { title: string; intro: string; readLabel: string };
  cta: { h3: string; p: string; btnQuote: string; btnLine: string };
};

const th: AccountingContent = {
  htmlLang: 'th',
  meta: {
    title: 'รับทำบัญชีเชียงใหม่ รายเดือน มีผู้ดูแลบัญชีประจำ | IC Accounting',
    description:
      'รับทำบัญชีและยื่นภาษีรายเดือนในเชียงใหม่ มีผู้ดูแลบัญชีประจำตอบภายใน 1 วันทำการ โปรแกรมบัญชีออนไลน์พร้อมอบรม และทบทวนผลประกอบการรายไตรมาส เลือกได้ 2 รูปแบบตามขนาดธุรกิจ',
    ogDescription:
      'ผู้ดูแลบัญชีประจำตอบภายใน 1 วันทำการ · โปรแกรมบัญชีออนไลน์ · ทบทวนผลประกอบการรายไตรมาส · เลือกได้ 2 รูปแบบตามขนาดธุรกิจ',
  },
  crumb: { home: 'หน้าแรก', homeHref: '/', current: 'บริการทำบัญชี' },
  hero: {
    eyebrow: 'Accounting Services · รายเดือน',
    h1Line1: 'รับทำบัญชีเชียงใหม่',
    h1Line2: 'รายเดือน มีผู้ดูแลบัญชีประจำ',
    lead: {
      intro: 'เลือกได้ 2 รูปแบบตามโครงสร้างธุรกิจ — ',
      smart: ' ให้เราดูแลเฉพาะการยื่นภาษีรายเดือน หรือ ',
      total: ' ให้เราเป็นแผนกบัญชีทั้งระบบแทนการจ้างพนักงานประจำ',
    },
    chips: ['ราคารวม VAT แล้ว', 'เลือกเฉพาะบริการที่ต้องการได้', 'มีโปรแกรมบัญชีออนไลน์ให้ใช้', 'ปรึกษาฟรีก่อนตัดสินใจ'],
  },
  packages: {
    eyebrow: 'Pricing Plans',
    title: '2 แพ็กเกจ เลือกให้ตรงกับธุรกิจคุณ',
    sublead: 'ค่าบริการบัญชีและภาษีรายเดือน รอบระยะเวลาบัญชีปี 2569 ทุกราคารวมภาษีมูลค่าเพิ่มแล้ว',
    perMonth: 'บาท/เดือน',
    fitLabel: 'เหมาะกับ ',
    badge: '⭐ ครบที่สุด',
    pickerHint: 'ติ๊กเลือกเฉพาะรายการที่ต้องการ',
    smartDisclaimer:
      'งบกำไรขาดทุนในแพ็กเกจนี้จัดทำจากเอกสารที่ได้รับ เพื่อใช้ประกอบการบริหารเท่านั้น มิใช่การจัดทำบัญชีตามกฎหมาย และไม่สามารถใช้ปิดงบการเงินนำส่งหน่วยงานราชการได้',
    totalCta: `สนใจ IC Total ${p(TOTAL_PRICE)}/เดือน`,
    smart: {
      tagline: { name: 'ยื่นภาษีรายเดือน', alt: 'Monthly tax filing service' },
      priceNote: `เมื่อใช้บริการครบทั้ง 4 รายการ จากราคาปกติ ${p(SMART_STANDARD_PRICE)} บาท`,
      fit: 'กิจการที่มีผู้ทำบัญชีหรือทีมงานภายในอยู่แล้ว และต้องการให้สำนักงานรับผิดชอบเฉพาะการยื่นแบบรายเดือน สามารถเลือกใช้เฉพาะบางรายการได้',
    },
    total: {
      tagline: { name: 'บัญชีอินเฮ้าส์เต็มระบบ', alt: 'Full in-house accounting service' },
      priceNote: 'สัญญาระยะเวลา 1 ปี พร้อมโปรแกรมบัญชีออนไลน์',
      fit: 'กิจการที่ต้องการให้สำนักงานดูแลงานบัญชีทั้งระบบแทนการจ้างพนักงานบัญชีประจำ ครอบคลุมทุกรายการในแพ็กเกจ A และเพิ่มเติมดังนี้',
    },
  },
  smartServices: {
    vat: { name: 'ยื่นภาษีมูลค่าเพิ่ม ภ.พ.30 ประจำเดือน', alt: 'Monthly VAT return (PP.30)' },
    wht: { name: 'ยื่นภาษีหัก ณ ที่จ่าย ภ.ง.ด.1, 3, 53 ประจำเดือน', alt: 'Monthly withholding tax returns' },
    sso: { name: 'ยื่นแบบนำส่งเงินสมทบประกันสังคมประจำเดือน', alt: 'Monthly social security filing' },
    pl: { name: 'จัดทำงบกำไรขาดทุนตามเอกสารที่ได้รับ', alt: 'Profit and loss statement' },
  },
  picker: {
    allSelected: 'ใช้บริการครบทั้ง 4 รายการ',
    someSelected: 'เลือก {n} จาก 4 รายการ',
    perMonth: ' /เดือน',
    bundleBadge: 'ราคาแพ็กเกจ',
    minHint: 'เลือกอย่างน้อย 1 รายการ',
    ctaAll: 'สนใจ IC Smart {price}/เดือน',
    ctaSome: 'สนใจ {n} รายการนี้',
    ctaNone: 'สอบถามผ่าน LINE',
  },
  totalExtras: {
    bookkeeping: {
      title: { name: 'บันทึกบัญชี', alt: 'Bookkeeping' },
      items: ['สมุดบัญชี 5 เล่ม', 'บัญชีแยกประเภท', 'ทะเบียนทรัพย์สินและค่าเสื่อมราคา', 'ทะเบียนลูกหนี้-เจ้าหนี้', 'ทะเบียนสินค้าคงเหลือ'],
    },
    reconciliation: {
      title: { name: 'กระทบยอด', alt: 'Reconciliation' },
      items: ['บัญชีเงินฝากทุกบัญชี', 'รายได้ตาม ภ.พ.30', 'ภาษีซื้อ-ภาษีขาย และภาษีหัก ณ ที่จ่าย'],
    },
    payroll: {
      title: { name: 'งานเงินเดือน', alt: 'Payroll' },
      items: ['จัดทำเงินเดือนและสลิป', 'แจ้งเข้า-ออกประกันสังคม', 'กท.20ก และ ภ.ง.ด.1ก ประจำปี'],
    },
    reporting: {
      title: { name: 'รายงานและวางระบบ', alt: 'Reporting and system setup' },
      items: ['งบกำไรขาดทุนและงบแสดงฐานะการเงินรายเดือน', 'วางผังบัญชี', 'วางระบบเอกสาร', 'ปิดงบครึ่งปีและยื่น ภ.ง.ด.51'],
    },
    perks: {
      title: { name: 'สิทธิประโยชน์ตลอดสัญญา', alt: 'Included throughout the contract' },
      items: ['โปรแกรมบัญชีออนไลน์พร้อมอบรมการใช้งาน', 'ผู้ดูแลบัญชีประจำ ตอบผ่าน LINE ภายใน 1 วันทำการ', 'ขึ้นทะเบียนเป็นผู้ทำบัญชีของกิจการ', 'ประชุมทบทวนผลประกอบการรายไตรมาส'],
    },
  },
  comparison: {
    eyebrow: 'Comparison of Services',
    title: 'รายละเอียดเปรียบเทียบบริการ',
    sublead: 'ทั้ง {n} รายการที่แต่ละแพ็กเกจครอบคลุม',
    colService: 'รายการบริการ',
    included: 'รวม',
    notIncluded: 'ไม่รวม',
    rows: {
      vat: { name: 'ยื่นภาษีมูลค่าเพิ่ม ภ.พ.30', desc: 'จัดทำรายงานภาษีซื้อและภาษีขาย คำนวณภาษีที่ต้องชำระหรือขอคืน และยื่นแบบผ่านระบบออนไลน์ภายในกำหนดทุกเดือน' },
      wht: { name: 'ยื่นภาษีหัก ณ ที่จ่าย ภ.ง.ด.1, 3, 53', desc: 'คำนวณภาษีหัก ณ ที่จ่ายจากเงินเดือน ค่าบริการ และค่าเช่า ออกหนังสือรับรองการหักภาษีให้ผู้รับเงิน และยื่นแบบตามกำหนด' },
      sso: { name: 'ยื่นแบบนำส่งเงินสมทบประกันสังคม', desc: 'คำนวณเงินสมทบในส่วนของนายจ้างและลูกจ้าง จัดทำและนำส่งแบบประจำเดือนต่อสำนักงานประกันสังคม' },
      pl: { name: 'งบกำไรขาดทุนรายเดือน', desc: 'สรุปรายได้และค่าใช้จ่ายจากเอกสารที่ได้รับในแต่ละเดือน เพื่อให้ผู้บริหารเห็นผลประกอบการระหว่างปี' },
      ledger: { name: 'บันทึกบัญชีลงสมุดบัญชี 5 เล่ม และบัญชีแยกประเภท', desc: 'บันทึกรายการค้าลงสมุดรายวันซื้อ ขาย รับเงิน จ่ายเงิน และรายวันทั่วไป พร้อมผ่านรายการไปยังบัญชีแยกประเภทตามมาตรฐานการบัญชี' },
      bankRec: { name: 'กระทบยอดบัญชีเงินฝากธนาคารทุกบัญชี', desc: 'ตรวจสอบรายการในสมุดบัญชีกับรายการเดินบัญชีของธนาคารทุกบัญชี เพื่อค้นหาผลต่างและปรับปรุงให้ถูกต้องก่อนปิดงวด' },
      vatRec: { name: 'กระทบยอดรายได้ ภ.พ.30 และภาษีซื้อ-ภาษีขาย', desc: 'ตรวจสอบรายได้ที่นำส่งภาษีกับรายได้ทางบัญชีให้ตรงกัน ลดความเสี่ยงจากการถูกประเมินภาษีย้อนหลัง' },
      balanceSheet: { name: 'งบแสดงฐานะการเงินรายเดือน พร้อมบทวิเคราะห์', desc: 'แสดงสินทรัพย์ หนี้สิน และส่วนของผู้ถือหุ้น ณ สิ้นเดือน พร้อมคำอธิบายรายการที่เปลี่ยนแปลงอย่างมีนัยสำคัญ' },
      assets: { name: 'ทะเบียนทรัพย์สินและค่าเสื่อมราคา', desc: 'จัดทำทะเบียนทรัพย์สินถาวรรายตัว และคำนวณค่าเสื่อมราคาตามอายุการใช้งานและวิธีที่กฎหมายกำหนด' },
      arap: { name: 'ทะเบียนลูกหนี้-เจ้าหนี้ และรายงานอายุหนี้', desc: 'คุมยอดลูกหนี้และเจ้าหนี้เป็นรายราย พร้อมรายงานอายุหนี้เพื่อใช้ติดตามการรับชำระและวางแผนการจ่ายเงิน' },
      payroll: { name: 'งานเงินเดือน สลิป และประกันสังคมพนักงาน', desc: 'คำนวณเงินเดือนและภาษีของพนักงาน จัดทำสลิปและไฟล์โอนเงิน พร้อมแจ้งเข้า-ออกพนักงานกับสำนักงานประกันสังคม' },
      chart: { name: 'วางผังบัญชีและวางระบบเอกสารครบวงจร', desc: 'ออกแบบผังบัญชีให้เหมาะกับประเภทธุรกิจ และวางลำดับเอกสารตั้งแต่ใบเสนอราคา ใบแจ้งหนี้ จนถึงใบเสร็จรับเงิน' },
      bookkeeper: { name: 'ขึ้นทะเบียนเป็นผู้ทำบัญชีของกิจการ', desc: 'จัดให้มีผู้ทำบัญชีที่มีคุณสมบัติครบถ้วนขึ้นทะเบียนกับกิจการตามที่กฎหมายกำหนด' },
      halfYear: { name: 'ปิดงบครึ่งปีและยื่น ภ.ง.ด.51', desc: 'ประมาณการกำไรสุทธิครึ่งรอบบัญชี จัดทำและยื่นแบบ ภ.ง.ด.51 เพื่อลดความเสี่ยงจากเบี้ยปรับกรณีประมาณการต่ำกว่าเกณฑ์' },
      software: { name: 'โปรแกรมบัญชีออนไลน์ พร้อมอบรมการใช้งาน', desc: 'เปิดสิทธิ์ใช้งานโปรแกรมบัญชีออนไลน์พร้อมอบรมทีมงานของกิจการ ดูรายงานและเอกสารย้อนหลังได้ตลอดเวลา' },
      manager: { name: 'ผู้ดูแลบัญชีประจำ ตอบภายใน 1 วันทำการ', desc: 'มีเจ้าหน้าที่รับผิดชอบบัญชีของกิจการโดยตรง ตอบข้อซักถามผ่าน LINE ภายใน 1 วันทำการ' },
      quarterly: { name: 'ประชุมทบทวนผลประกอบการรายไตรมาส', desc: 'ทบทวนผลประกอบการ ภาระภาษีที่จะเกิดขึ้น และประเด็นที่ควรปรับปรุงร่วมกับผู้บริหารทุกไตรมาส' },
    },
  },
  guidance: {
    eyebrow: 'Guidance',
    title: 'แพ็กเกจไหนเหมาะกับคุณ?',
    smartTitle: 'เลือก IC Smart เมื่อ',
    totalTitle: 'เลือก IC Total เมื่อ',
    smart: [
      'กิจการมีพนักงานบัญชีหรือผู้ทำบัญชีของตนเองอยู่แล้ว',
      'ต้องการเฉพาะงานยื่นแบบภาษีและประกันสังคมให้ตรงกำหนด โดยทีมงานภายในยังคงรับผิดชอบการบันทึกบัญชีเอง',
      'ปริมาณเอกสารต่อเดือนอยู่ในระดับไม่มาก และยังไม่จำเป็นต้องใช้งบการเงินฉบับสมบูรณ์ทุกเดือน',
    ],
    total: [
      'กิจการยังไม่มีพนักงานบัญชี หรือมีพนักงานที่ต้องจัดทำเงินเดือนและประกันสังคม',
      'ต้องการงบการเงินรายเดือนทั้งงบกำไรขาดทุนและงบแสดงฐานะการเงิน เพื่อใช้ในการบริหารและตัดสินใจระหว่างปี',
      'ต้องการวางระบบบัญชีและระบบเอกสารใหม่ทั้งวงจร หรือต้องการลดความเสี่ยงจากการพึ่งพาพนักงานบัญชีเพียงคนเดียว',
    ],
  },
  steps: {
    eyebrow: 'Getting Started',
    title: 'ขั้นตอนการเริ่มใช้บริการ',
    items: [
      { step: '01', title: 'ประเมินขอบเขตงาน', desc: 'แจ้งประเภทธุรกิจ ปริมาณเอกสารต่อเดือน จำนวนพนักงาน และสถานะการจดทะเบียนภาษีมูลค่าเพิ่ม เพื่อยืนยันแพ็กเกจและค่าบริการที่เหมาะสม' },
      { step: '02', title: 'ลงนามสัญญาบริการ', desc: 'จัดทำสัญญาระบุขอบเขตงาน ค่าบริการ และกำหนดการส่งมอบงาน พร้อมกำหนดวันเริ่มให้บริการร่วมกัน' },
      { step: '03', title: 'ส่งมอบเอกสารและเปิดระบบ', desc: 'ส่งมอบเอกสารตั้งต้นและข้อมูลกิจการ เปิดสิทธิ์ใช้งานโปรแกรมบัญชีออนไลน์ และอบรมการใช้งานให้ทีมงานของกิจการ' },
      { step: '04', title: 'เริ่มให้บริการรายเดือน', desc: 'ยื่นแบบภาษีและประกันสังคมตามกำหนดของแต่ละเดือน พร้อมส่งมอบรายงานผลประกอบการให้ผู้บริหารเป็นประจำ' },
    ],
  },
  notes: {
    scopeTitle: 'ขอบเขตของราคา',
    scope: [
      'ราคาทั้งหมดเป็นราคารวมภาษีมูลค่าเพิ่มแล้ว แต่ไม่รวมค่าธรรมเนียมที่หน่วยงานราชการเรียกเก็บ',
      'ค่าบริการคิดตามปริมาณเอกสารในระดับปกติของแต่ละกิจการ',
    ],
    separateTitle: 'บริการที่คิดค่าบริการแยกต่างหาก',
    audit: { text: 'การตรวจสอบบัญชีประจำปีโดยผู้สอบบัญชีรับอนุญาต คิดตามช่วงรายได้ของกิจการ', link: 'ดูบริการตรวจสอบบัญชี', href: '/audit-services' },
    separateOther: 'งานจดทะเบียนกับกรมพัฒนาธุรกิจการค้า งานขอคืนภาษี งานตรวจสอบพิเศษ และการจัดทำบัญชีย้อนหลัง',
  },
  terms: {
    title: 'เงื่อนไขการให้บริการ',
    items: [
      'ราคาทั้งหมดเป็นราคารวมภาษีมูลค่าเพิ่มแล้ว แต่ไม่รวมค่าธรรมเนียมที่หน่วยงานราชการเรียกเก็บ',
      'ค่าบริการรายเดือนไม่รวมค่าตรวจสอบบัญชีประจำปีโดยผู้สอบบัญชีรับอนุญาต ซึ่งคิดค่าบริการแยกตามช่วงรายได้ของกิจการ',
      'แพ็กเกจ IC Total เป็นสัญญาระยะเวลา 1 ปี การยกเลิกก่อนครบกำหนดต้องแจ้งล่วงหน้าไม่น้อยกว่า 30 วัน และบริษัทขอสงวนสิทธิ์เรียกคืนสิทธิประโยชน์ที่มอบให้โดยไม่คิดค่าใช้จ่าย',
      'ราคาข้างต้นอ้างอิงจากปริมาณเอกสารในระดับปกติ หากมีเอกสารจำนวนมากผิดปกติหรือมีรายการที่ซับซ้อน บริษัทจะแจ้งค่าบริการเพิ่มเติมและตกลงกันก่อนเริ่มงานทุกครั้ง',
      'กิจการนำส่งเอกสารประกอบการบันทึกบัญชีภายในวันที่ 10 ของเดือนถัดไป และชำระค่าบริการภายในวันที่ 5 ของทุกเดือน',
      'ค่าบริการไม่รวมงานจดทะเบียนกับกรมพัฒนาธุรกิจการค้า งานขอคืนภาษี งานตรวจสอบพิเศษ และการจัดทำบัญชีย้อนหลังก่อนวันเริ่มสัญญา',
    ],
    footnote: 'ค่าบริการสำหรับรอบระยะเวลาบัญชีปี 2569 ทุกราคาเป็นราคารวมภาษีมูลค่าเพิ่มแล้ว ราคาสุดท้ายยืนยันในใบเสนอราคาเฉพาะกิจการ',
  },
  /**
   * คำถามชุดนี้เขียนจากคำค้นจริงใน Search Console ที่หน้านี้ควรรับผิดชอบ:
   *   รับทำบัญชี เชียงใหม่ · รับทําบัญชี เชียงใหม่ · รับปิดงบเปล่า เชียงใหม่
   * คำตอบทุกข้ออ้างอิงจากใบเสนอราคาเท่านั้น ไม่เพิ่มคำสัญญาใหม่
   */
  faq: {
    title: 'คำถามที่พบบ่อยเรื่องรับทำบัญชี',
    intro: 'รวมคำถามที่เจ้าของธุรกิจในเชียงใหม่ถามเราบ่อยที่สุดก่อนเริ่มใช้บริการ',
    items: [
      {
        q: 'รับทำบัญชีเชียงใหม่ ราคาเริ่มต้นเท่าไหร่?',
        a: `แพ็กเกจ IC Smart ยื่นภาษีรายเดือน ${p(SMART_BUNDLE_PRICE)} บาทต่อเดือนเมื่อใช้ครบทั้ง 4 รายการ (ยื่น ภ.พ.30, ภ.ง.ด.1/3/53, ประกันสังคม และงบกำไรขาดทุน) ราคารวมภาษีมูลค่าเพิ่มแล้ว หรือเลือกเฉพาะบางรายการได้ เริ่มที่ ${p(SMART_MIN_PRICE)} บาทต่อเดือน`,
      },
      {
        q: 'IC Smart กับ IC Total ต่างกันอย่างไร?',
        a: `IC Smart (${p(SMART_BUNDLE_PRICE)} บาท/เดือน) รับผิดชอบเฉพาะการยื่นแบบรายเดือน เหมาะกับกิจการที่มีผู้ทำบัญชีของตนเองอยู่แล้ว ส่วน IC Total (${p(TOTAL_PRICE)} บาท/เดือน) ดูแลงานบัญชีทั้งระบบแทนพนักงานบัญชีประจำ ครอบคลุมทุกอย่างใน IC Smart และเพิ่มการบันทึกบัญชี กระทบยอด งานเงินเดือน งบการเงินรายเดือน วางระบบ ปิดงบครึ่งปี พร้อมโปรแกรมบัญชีออนไลน์และผู้ดูแลบัญชีประจำ`,
      },
      {
        q: 'เลือกใช้เฉพาะบางบริการได้ไหม?',
        a: `ได้ ในแพ็กเกจ IC Smart เลือกเฉพาะรายการที่ต้องการได้ ยื่น ภ.พ.30 ${p(SMART_PRICE.vat)} บาท ยื่น ภ.ง.ด.1/3/53 ${p(SMART_PRICE.wht)} บาท ยื่นประกันสังคม ${p(SMART_PRICE.sso)} บาท และงบกำไรขาดทุน ${p(SMART_PRICE.pl)} บาทต่อเดือน หากใช้ครบทั้ง 4 รายการคิดราคาแพ็กเกจ ${p(SMART_BUNDLE_PRICE)} บาท`,
      },
      {
        q: 'งบกำไรขาดทุนใน IC Smart ใช้ปิดงบประจำปีได้ไหม?',
        a: 'ไม่ได้ งบกำไรขาดทุนในแพ็กเกจ IC Smart จัดทำจากเอกสารที่ได้รับเพื่อใช้ประกอบการบริหารเท่านั้น ไม่ใช่การจัดทำบัญชีตามกฎหมาย จึงไม่สามารถใช้ปิดงบการเงินนำส่งหน่วยงานราชการได้ หากต้องการบัญชีตามกฎหมายครบถ้วนต้องใช้แพ็กเกจ IC Total',
      },
      {
        q: 'IC Total รวมงานเงินเดือนพนักงานด้วยไหม?',
        a: 'รวม IC Total จัดทำเงินเดือนและสลิป แจ้งเข้า-ออกประกันสังคม รวมถึง กท.20ก และ ภ.ง.ด.1ก ประจำปี พร้อมทะเบียนทรัพย์สิน ทะเบียนลูกหนี้-เจ้าหนี้ และกระทบยอดบัญชีธนาคารทุกบัญชี',
      },
      {
        q: 'ค่าบริการรายเดือนรวมปิดงบและผู้สอบบัญชีประจำปีไหม?',
        a: 'ไม่รวม ค่าตรวจสอบบัญชีประจำปีโดยผู้สอบบัญชีรับอนุญาตคิดแยกตามช่วงรายได้ของกิจการ ส่วน IC Total รวมการปิดงบครึ่งปีและยื่น ภ.ง.ด.51 ไว้แล้ว ดูรายละเอียดบริการตรวจสอบบัญชีได้ที่หน้าตรวจสอบบัญชี',
      },
      {
        q: 'IC Total ต้องทำสัญญานานเท่าไหร่?',
        a: 'IC Total เป็นสัญญาระยะเวลา 1 ปี พร้อมโปรแกรมบัญชีออนไลน์และการอบรมใช้งาน การยกเลิกก่อนครบกำหนดต้องแจ้งล่วงหน้าไม่น้อยกว่า 30 วัน ส่วน IC Smart ไม่มีเงื่อนไขสัญญา 1 ปี',
      },
      {
        q: 'ต้องส่งเอกสารและชำระค่าบริการเมื่อไหร่?',
        a: 'นำส่งเอกสารประกอบการบันทึกบัญชีภายในวันที่ 10 ของเดือนถัดไป และชำระค่าบริการภายในวันที่ 5 ของทุกเดือน เพื่อให้ยื่นแบบภาษีได้ทันกำหนดทุกเดือน',
      },
    ],
  },
  related: {
    title: 'อ่านเพิ่มเติมก่อนตัดสินใจ',
    intro: 'บทความจากทีมงาน IC ที่เขียนจากเคสจริงของลูกค้าในเชียงใหม่',
    readLabel: 'อ่านบทความ',
  },
  cta: {
    h3: 'ไม่แน่ใจว่าแพ็กเกจไหนเหมาะกับคุณ?',
    p: 'ปรึกษาทีมงาน IC ฟรี ไม่มีค่าใช้จ่าย เราช่วยประเมินขอบเขตงานและออกใบเสนอราคาเฉพาะกิจการให้',
    btnQuote: 'นัดหมายปรึกษาฟรี',
    btnLine: 'ติดต่อผ่าน Line',
  },
};

const en: AccountingContent = {
  htmlLang: 'en',
  meta: {
    title: 'Monthly Accounting in Chiang Mai with a Dedicated Accountant | IC Accounting',
    description:
      'Monthly accounting and tax filing for businesses in Chiang Mai. A dedicated accountant who replies within 1 business day, online accounting software with training, and quarterly reviews. Two packages to fit your business.',
    ogDescription:
      'A dedicated accountant who replies within 1 business day · Online accounting software · Quarterly reviews · Two packages to fit your business',
  },
  crumb: { home: 'Home', homeHref: '/en', current: 'Accounting Services' },
  hero: {
    eyebrow: 'Accounting Services · Monthly',
    h1Line1: 'Monthly accounting in Chiang Mai,',
    h1Line2: 'with a dedicated accountant',
    lead: {
      intro: 'Two ways to work with us, depending on how your business is set up: ',
      smart: ', where we handle only the monthly tax filings, or ',
      total: ', where we act as your whole accounting department so you don’t need to hire in-house staff.',
    },
    chips: ['Prices include VAT', 'Choose only the services you need', 'Online accounting software available', 'Free consultation before you decide'],
  },
  packages: {
    eyebrow: 'Pricing Plans',
    title: 'Two packages to fit your business',
    sublead: 'Monthly accounting and tax fees for accounting periods in 2026. All prices include VAT.',
    perMonth: 'THB/month',
    fitLabel: 'Best for ',
    badge: '⭐ Most complete',
    pickerHint: 'Tick only the services you need',
    smartDisclaimer:
      'The profit and loss statement in this package is prepared from the documents you send, for management use only. It is not statutory bookkeeping and cannot be used to prepare the financial statements filed with government agencies.',
    totalCta: `I’m interested in IC Total (${p(TOTAL_PRICE)}/month)`,
    smart: {
      tagline: { name: 'Monthly tax filing', alt: 'ยื่นภาษีรายเดือน' },
      priceNote: `When you use all 4 services. Standard price THB ${p(SMART_STANDARD_PRICE)}.`,
      fit: 'businesses that already have a bookkeeper or in-house team, and only want us to handle the monthly filings. You can choose just some of the services.',
    },
    total: {
      tagline: { name: 'Full in-house accounting', alt: 'บัญชีอินเฮ้าส์เต็มระบบ' },
      priceNote: '1-year contract, online accounting software included',
      fit: 'businesses that want us to run the whole accounting function instead of hiring an in-house accountant. Covers everything in Package A, plus:',
    },
  },
  smartServices: {
    vat: { name: 'Monthly VAT return (PP.30)', alt: 'ภ.พ.30' },
    wht: { name: 'Monthly withholding tax returns (PND.1, 3, 53)', alt: 'ภ.ง.ด.1, 3, 53' },
    sso: { name: 'Monthly social security filing', alt: 'เงินสมทบประกันสังคม' },
    pl: { name: 'Profit and loss statement from your documents', alt: 'งบกำไรขาดทุน' },
  },
  picker: {
    allSelected: 'All 4 services selected',
    someSelected: '{n} of 4 services selected',
    perMonth: ' /month',
    bundleBadge: 'Package price',
    minHint: 'Select at least 1 service',
    ctaAll: 'I’m interested in IC Smart ({price}/month)',
    ctaSome: 'Ask about these {n} services',
    ctaNone: 'Ask us on LINE',
  },
  totalExtras: {
    bookkeeping: {
      title: { name: 'Bookkeeping', alt: 'บันทึกบัญชี' },
      items: ['Five statutory journals', 'General ledger', 'Fixed asset register and depreciation', 'Receivables and payables ledgers', 'Inventory register'],
    },
    reconciliation: {
      title: { name: 'Reconciliation', alt: 'กระทบยอด' },
      items: ['Every bank account', 'Revenue against PP.30', 'Input/output VAT and withholding tax'],
    },
    payroll: {
      title: { name: 'Payroll', alt: 'งานเงินเดือน' },
      items: ['Salaries and payslips', 'Social security for joiners and leavers', 'Annual KorTor.20Kor and PND.1Kor'],
    },
    reporting: {
      title: { name: 'Reporting and system setup', alt: 'รายงานและวางระบบ' },
      items: ['Monthly P&L and balance sheet', 'Chart of accounts', 'Document system', 'Half-year closing and PND.51'],
    },
    perks: {
      title: { name: 'Included throughout the contract', alt: 'สิทธิประโยชน์ตลอดสัญญา' },
      items: ['Online accounting software with training', 'A dedicated accountant who replies on LINE within 1 business day', 'Registered as your company’s bookkeeper', 'Quarterly performance review'],
    },
  },
  comparison: {
    eyebrow: 'Comparison of Services',
    title: 'Service comparison',
    sublead: 'All {n} services and which package covers them',
    colService: 'Service',
    included: 'Included',
    notIncluded: 'Not included',
    rows: {
      vat: { name: 'VAT return (PP.30)', desc: 'We prepare the input and output tax reports, calculate the VAT payable or refundable, and file online by the deadline every month.' },
      wht: { name: 'Withholding tax returns (PND.1, 3, 53)', desc: 'We calculate withholding tax on salaries, service fees and rent, issue withholding tax certificates to payees, and file on time.' },
      sso: { name: 'Social security contributions', desc: 'We calculate the employer and employee contributions, then prepare and submit the monthly filing to the Social Security Office.' },
      pl: { name: 'Monthly profit and loss statement', desc: 'A summary of income and expenses from the documents you send each month, so management can follow performance during the year.' },
      ledger: { name: 'Bookkeeping in the five journals and general ledger', desc: 'We record transactions in the sales, purchases, cash receipts, cash payments and general journals, and post them to the general ledger in line with accounting standards.' },
      bankRec: { name: 'Reconciliation of every bank account', desc: 'We match the books against the statements of every bank account, find any differences and correct them before closing the month.' },
      vatRec: { name: 'Reconciliation of PP.30 revenue and input/output VAT', desc: 'We make sure the revenue reported for VAT matches the revenue in the books, reducing the risk of a back-tax assessment.' },
      balanceSheet: { name: 'Monthly balance sheet with commentary', desc: 'Assets, liabilities and shareholders’ equity at month end, with notes explaining any significant changes.' },
      assets: { name: 'Fixed asset register and depreciation', desc: 'A register of each fixed asset, with depreciation calculated over its useful life using the methods Thai law allows.' },
      arap: { name: 'Receivables and payables ledgers with ageing reports', desc: 'Balances tracked per customer and supplier, with ageing reports to help you chase payments and plan what to pay.' },
      payroll: { name: 'Payroll, payslips and employee social security', desc: 'We calculate salaries and employee tax, prepare payslips and bank transfer files, and register employees joining or leaving with the Social Security Office.' },
      chart: { name: 'Chart of accounts and end-to-end document system', desc: 'A chart of accounts designed for your type of business, and a document flow from quotation and invoice through to receipt.' },
      bookkeeper: { name: 'Registered as your company’s bookkeeper', desc: 'We provide a qualified bookkeeper registered for your business, as Thai law requires.' },
      halfYear: { name: 'Half-year closing and PND.51 filing', desc: 'We estimate net profit for the first half of the accounting year and file PND.51, reducing the risk of penalties for underestimating.' },
      software: { name: 'Online accounting software with training', desc: 'Access to online accounting software, with training for your team. Reports and past documents are available at any time.' },
      manager: { name: 'A dedicated accountant who replies within 1 business day', desc: 'One person is responsible for your books and answers your questions on LINE within 1 business day.' },
      quarterly: { name: 'Quarterly performance review', desc: 'Every quarter we review performance, upcoming tax liabilities and areas to improve together with management.' },
    },
  },
  guidance: {
    eyebrow: 'Guidance',
    title: 'Which package is right for you?',
    smartTitle: 'Choose IC Smart if',
    totalTitle: 'Choose IC Total if',
    smart: [
      'You already have your own accountant or bookkeeper',
      'You only need tax and social security returns filed on time, while your team keeps doing the bookkeeping',
      'You have a modest volume of documents each month and don’t yet need full financial statements every month',
    ],
    total: [
      'You don’t have an accountant yet, or you have employees and need payroll and social security handled',
      'You want monthly financial statements, both P&L and balance sheet, to run the business and make decisions during the year',
      'You want a new accounting and document system set up end to end, or want to stop depending on a single in-house accountant',
    ],
  },
  steps: {
    eyebrow: 'Getting Started',
    title: 'How to get started',
    items: [
      { step: '01', title: 'Scope your needs', desc: 'Tell us your type of business, monthly document volume, number of employees and whether you are VAT-registered, so we can confirm the right package and fee.' },
      { step: '02', title: 'Sign the service agreement', desc: 'The agreement sets out the scope of work, fees and delivery schedule, and we agree a start date together.' },
      { step: '03', title: 'Hand over documents and set up', desc: 'You hand over your opening documents and company information. We open your online accounting software account and train your team.' },
      { step: '04', title: 'Monthly service begins', desc: 'We file tax and social security returns by each month’s deadline and send regular performance reports to management.' },
    ],
  },
  notes: {
    scopeTitle: 'What the price covers',
    scope: [
      'All prices include VAT but exclude fees charged by government agencies.',
      'Fees are based on a normal volume of documents for your business.',
    ],
    separateTitle: 'Charged separately',
    audit: { text: 'Annual audit by a licensed auditor (CPA), priced by your company’s revenue band', link: 'See audit services', href: '/en/audit-services' },
    separateOther: 'Registrations with the Department of Business Development, tax refund claims, special audits and catch-up bookkeeping',
  },
  terms: {
    title: 'Terms of service',
    items: [
      'All prices include VAT but exclude fees charged by government agencies.',
      'Monthly fees do not include the annual audit by a licensed auditor (CPA), which is priced separately based on your company’s revenue.',
      'IC Total is a 1-year contract. Cancelling early requires at least 30 days’ notice, and we reserve the right to reclaim benefits provided free of charge.',
      'Prices assume a normal volume of documents. If the volume is unusually high or transactions are complex, we will tell you the additional fee and agree it with you before starting work.',
      'Send your accounting documents by the 10th of the following month, and pay the service fee by the 5th of each month.',
      'Fees do not include registrations with the Department of Business Development, tax refund claims, special audits, or catch-up bookkeeping for periods before the contract starts.',
    ],
    footnote: 'Fees apply to accounting periods in 2026 (B.E. 2569). All prices include VAT. The final price is confirmed in a quotation for your business.',
  },
  faq: {
    title: 'Frequently asked questions about our accounting services',
    intro: 'The questions business owners in Chiang Mai ask us most before they start.',
    items: [
      {
        q: 'How much does monthly accounting cost?',
        a: `IC Smart costs THB ${p(SMART_BUNDLE_PRICE)} a month when you use all 4 services (PP.30 VAT return, PND.1/3/53 withholding tax, social security and a profit and loss statement), VAT included. You can also choose only some of them, starting at THB ${p(SMART_MIN_PRICE)} a month.`,
      },
      {
        q: 'What is the difference between IC Smart and IC Total?',
        a: `IC Smart (THB ${p(SMART_BUNDLE_PRICE)}/month) covers only the monthly filings, for businesses that already have their own bookkeeper. IC Total (THB ${p(TOTAL_PRICE)}/month) runs your whole accounting function in place of an in-house accountant: everything in IC Smart plus bookkeeping, reconciliations, payroll, monthly financial statements, system setup and half-year closing, with online accounting software and a dedicated accountant.`,
      },
      {
        q: 'Can I choose only some of the services?',
        a: `Yes. Within IC Smart you can pick only what you need: PP.30 VAT return THB ${p(SMART_PRICE.vat)}, PND.1/3/53 withholding tax THB ${p(SMART_PRICE.wht)}, social security THB ${p(SMART_PRICE.sso)} and the profit and loss statement THB ${p(SMART_PRICE.pl)} a month. Using all 4 is charged at the package price of THB ${p(SMART_BUNDLE_PRICE)}.`,
      },
      {
        q: 'Can the IC Smart profit and loss statement be used for year-end closing?',
        a: 'No. It is prepared from the documents you send, for management use only. It is not statutory bookkeeping, so it cannot be used for the financial statements filed with government agencies. For full statutory accounts you need IC Total.',
      },
      {
        q: 'Does IC Total include payroll?',
        a: 'Yes. IC Total prepares salaries and payslips, registers employees with social security when they join or leave, and files the annual KorTor.20Kor and PND.1Kor. It also keeps the fixed asset, receivables and payables registers and reconciles every bank account.',
      },
      {
        q: 'Does the monthly fee include year-end closing and the annual audit?',
        a: 'No. The annual audit by a licensed auditor (CPA) is priced separately based on your company’s revenue. IC Total already includes the half-year closing and PND.51 filing. See our audit services page for details.',
      },
      {
        q: 'How long is the IC Total contract?',
        a: 'IC Total is a 1-year contract, with online accounting software and training. Cancelling early requires at least 30 days’ notice. IC Smart has no 1-year contract.',
      },
      {
        q: 'When do I send documents and pay?',
        a: 'Send your supporting documents by the 10th of the following month and pay the service fee by the 5th of each month, so every return can be filed on time.',
      },
    ],
  },
  related: {
    title: 'Further reading (articles in Thai)',
    intro: 'Articles by the IC team, written from real client cases in Chiang Mai. Available in Thai only.',
    readLabel: 'Read article (Thai)',
  },
  cta: {
    h3: 'Not sure which package fits?',
    p: 'Talk to the IC team for free. We’ll assess the scope of work and prepare a quotation for your business.',
    btnQuote: 'Book a free consultation',
    btnLine: 'Contact us on LINE',
  },
};

export const accountingContent = { th, en } as const;
