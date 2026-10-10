/**
 * เนื้อหาหน้าจดทะเบียนนิติบุคคล ทั้งสองภาษา
 *
 * หน้าไทย /company-registration และหน้าอังกฤษ /en/company-registration
 * ใช้เทมเพลตเดียวกัน ดีไซน์และลำดับหัวข้อจึงต่างกันไม่ได้ ต่างแค่ข้อความในไฟล์นี้
 * type บังคับให้ทั้งสองภาษามีคีย์ครบเท่ากัน ลืมแปลตรงไหนจะ build ไม่ผ่าน
 *
 * ── ราคาอยู่นอกชุดภาษา ──
 * ตัวเลขราคาประกาศไว้ครั้งเดียวด้านล่าง แล้วทั้งสองภาษาอ้างถึงตัวเดียวกัน
 * วันที่ปรับราคาจึงแก้ที่เดียว ไม่มีทางที่หน้าอังกฤษจะค้างราคาเก่าไว้
 */

/** ราคาทั้งสองแพ็กเกจ — ใช้ร่วมกันทุกภาษา */
export const REG_PRICES = {
  partnership: { price: '6,000', original: '9,000', raw: '6000' },
  company: { price: '12,000', original: '15,000', raw: '12000' },
} as const;

export type RegistrationContent = {
  htmlLang: string;
  meta: { title: string; description: string };
  crumb: { home: string; current: string };
  hero: {
    eyebrow: string;
    h1Line1: string;
    h1Line2: string;
    lead: string;
    chips: string[];
  };
  packages: {
    eyebrow: string;
    title: string;
    sublead: string;
    allInLabel: string;
    quoteButton: string;
    includes: string[];
    freebie: string;
    partnership: { type: string; name: string; tag: string; description: string };
    company: { type: string; name: string; tag: string; description: string };
    /** คำนำหน้าชื่อแพ็กเกจ เช่น "จดทะเบียนจัดตั้ง" + ชื่อ */
    namePrefix: string;
  };
  newSetup: { eyebrow: string; title: string; body: string; items: string[] };
  changes: { eyebrow: string; title: string; body: string; items: string[] };
  steps: { eyebrow: string; title: string; sublead: string; items: { title: string; desc: string }[] };
  faq: { title: string; intro: string; items: { q: string; a: string }[] };
  related: { title: string; intro: string; readLabel: string };
  cta: { h3: string; p: string; btnQuote: string; btnLine: string };
};

const th: RegistrationContent = {
  htmlLang: 'th',
  meta: {
    title: 'จดทะเบียนนิติบุคคลเชียงใหม่ เริ่ม 6,000 | IC Accounting',
    description:
      'รับจดทะเบียนบริษัทและห้างหุ้นส่วนในเชียงใหม่ ครบทุกขั้นตอนตั้งแต่จองชื่อจนถึงได้รับหนังสือรับรอง รวดเร็ว ถูกต้อง',
  },
  crumb: { home: 'หน้าแรก', current: 'จดทะเบียนนิติบุคคล' },
  hero: {
    eyebrow: 'Company Registration',
    h1Line1: 'จดจัดตั้งทะเบียนนิติบุคคล เชียงใหม่',
    h1Line2: `ครบวงจรเริ่มต้น ${REG_PRICES.partnership.price} บาท`,
    lead: 'เริ่มต้นธุรกิจอย่างมั่นใจ บริการจดทะเบียนบริษัทและห้างหุ้นส่วนแบบครบวงจร ให้คุณเริ่มต้นก้าวแรกได้อย่างถูกต้องและรวดเร็ว',
    chips: ['ครบวงจรในที่เดียว', 'ราคารวมค่าธรรมเนียมแล้ว', 'รวดเร็ว 1-3 วันทำการ', 'ปรึกษาฟรีก่อนตัดสินใจ'],
  },
  packages: {
    eyebrow: 'Pricing',
    title: 'แพ็กเกจบริการจดทะเบียน',
    sublead: 'ราคารวมค่าบริการและค่าธรรมเนียมทั้งหมดแล้ว ไม่มีค่าใช้จ่ายแอบแฝง',
    allInLabel: 'ราคาเหมาทุกอย่าง',
    quoteButton: 'ขอใบเสนอราคา',
    includes: [
      'บริการจองชื่อนิติบุคคล',
      'บริการจัดเตรียมเอกสาร',
      'ลงลายมือชื่อรับรองเอกสาร',
      'ค่าธรรมเนียมในการจัดตั้ง และอากรแสตมป์',
    ],
    freebie: 'ฟรี! ตรายางบริษัท และบริการออกแบบ',
    namePrefix: 'จดทะเบียนจัดตั้ง',
    partnership: {
      type: 'Partnership',
      name: 'ห้างหุ้นส่วนจำกัด',
      tag: 'เริ่มต้นง่าย',
      description: 'ราคารวมค่าบริการและค่าธรรมเนียมที่ต้องชำระทั้งหมดแล้ว',
    },
    company: {
      type: 'Company',
      name: 'บริษัทจำกัด',
      tag: 'แนะนำ',
      description: 'ราคารวมค่าบริการและค่าธรรมเนียมที่ต้องชำระทั้งหมดแล้ว',
    },
  },
  newSetup: {
    eyebrow: 'New Setup',
    title: 'รับจดบริษัทเชียงใหม่ สำหรับธุรกิจใหม่',
    body: 'เราช่วยดูแลตั้งแต่การจองชื่อนิติบุคคล จัดเตรียมเอกสารข้อบังคับบริษัท จนถึงการยื่นจดทะเบียนต่อกรมพัฒนาธุรกิจการค้า (DBD) พร้อมให้คำปรึกษาเรื่องโครงสร้างผู้ถือหุ้นและทุนจดทะเบียน',
    items: [
      'จดทะเบียนบริษัทจำกัด / ห้างหุ้นส่วนจำกัด',
      'ขอหนังสือรับรอง และเอกสารสำคัญของบริษัท',
      'ขึ้นทะเบียนนายจ้าง (ประกันสังคม)',
      'จดทะเบียนภาษีมูลค่าเพิ่ม (VAT)',
    ],
  },
  changes: {
    eyebrow: 'Changes',
    title: 'เปลี่ยนแปลงทางทะเบียน และรับปิดบริษัทเชียงใหม่',
    body: 'สำหรับการขยายธุรกิจหรือการปรับปรุงโครงสร้างนิติบุคคล',
    items: [
      'เปลี่ยนแปลงชื่อบริษัท/ตราประทับ',
      'เพิ่ม/ลดทุนจดทะเบียน',
      'เปลี่ยนแปลงกรรมการ/ที่ตั้งสำนักงาน',
      'จดทะเบียนเลิกและชำระบัญชี',
    ],
  },
  steps: {
    eyebrow: 'Process',
    title: 'เริ่มต้นธุรกิจใน 1-3 วันทำการ',
    sublead: 'เราจัดการทุกขั้นตอนให้คุณพร้อมดำเนินธุรกิจได้ทันที',
    items: [
      { title: 'ให้คำปรึกษา', desc: 'วิเคราะห์ประเภทธุรกิจและวางแผนโครงสร้างผู้ถือหุ้น' },
      { title: 'เตรียมเอกสาร', desc: 'รวบรวมข้อมูลและเซ็นเอกสารผ่านระบบออนไลน์หรือที่สำนักงาน' },
      { title: 'ได้รับเอกสาร', desc: 'รับหนังสือรับรองบริษัทและเปิดบัญชีธนาคารได้ทันที' },
    ],
  },
  faq: {
    title: 'คำถามที่พบบ่อยเรื่องจดทะเบียนบริษัท',
    intro: 'รวมคำถามที่ลูกค้าในเชียงใหม่ถามเราบ่อยที่สุดก่อนเริ่มจดทะเบียน',
    items: [
      {
        q: 'รับจดบริษัทเชียงใหม่ ราคาเท่าไหร่?',
        a: `ห้างหุ้นส่วนจำกัด ${REG_PRICES.partnership.price} บาท และบริษัทจำกัด ${REG_PRICES.company.price} บาท ทั้งสองราคารวมบริการจองชื่อนิติบุคคล จัดเตรียมเอกสาร ลงลายมือชื่อรับรองเอกสาร ค่าธรรมเนียมในการจัดตั้งและอากรแสตมป์ พร้อมแถมตรายางบริษัทและบริการออกแบบฟรี ไม่มีค่าใช้จ่ายแอบแฝงเพิ่มภายหลัง`,
      },
      {
        q: 'จดทะเบียนบริษัทที่เชียงใหม่ ใช้เวลากี่วัน?',
        a: 'โดยทั่วไปใช้เวลา 1-3 วันทำการหลังจากเตรียมเอกสารครบถ้วน โดยเราดูแลให้ตั้งแต่ขั้นตอนให้คำปรึกษา เตรียมและเซ็นเอกสาร จนถึงรับหนังสือรับรองบริษัทเพื่อไปเปิดบัญชีธนาคารได้ทันที',
      },
      {
        q: 'จดบริษัทจำกัด กับ ห้างหุ้นส่วนจำกัด ควรเลือกแบบไหน?',
        a: 'ห้างหุ้นส่วนจำกัดมีขั้นตอนและค่าใช้จ่ายเริ่มต้นน้อยกว่า เหมาะกับกิจการขนาดเล็กที่หุ้นส่วนรู้จักกันดี ส่วนบริษัทจำกัดแยกความรับผิดของผู้ถือหุ้นออกจากตัวกิจการ และมักสร้างความน่าเชื่อถือกับคู่ค้าและธนาคารได้มากกว่า ทีมงานจะช่วยวิเคราะห์ให้ฟรีก่อนตัดสินใจ',
      },
      {
        q: 'จดทะเบียนบริษัทเสร็จแล้ว ต้องทำอะไรต่อ?',
        a: 'หลังได้รับหนังสือรับรอง ยังต้องขึ้นทะเบียนนายจ้างกับประกันสังคม และจดทะเบียนภาษีมูลค่าเพิ่ม (VAT) หากเข้าเงื่อนไข ซึ่งทั้งสองอย่างรวมอยู่ในบริการจดทะเบียนธุรกิจใหม่ของเราแล้ว',
      },
      {
        q: 'รับจดทะเบียนเปลี่ยนแปลง เช่น เพิ่มทุน ย้ายที่ตั้ง เปลี่ยนกรรมการ ด้วยไหม?',
        a: 'รับดูแลครบ ทั้งเปลี่ยนแปลงชื่อบริษัทและตราประทับ เพิ่มหรือลดทุนจดทะเบียน เปลี่ยนแปลงกรรมการและที่ตั้งสำนักงาน',
      },
      {
        q: 'รับปิดบริษัทหรือเลิกกิจการที่เชียงใหม่ ทำได้ไหม?',
        a: 'ได้ครับ เรารับจดทะเบียนเลิกบริษัทและชำระบัญชีให้ครบทุกขั้นตอน ซึ่งเป็นคนละเรื่องกับการหยุดยื่นงบเฉยๆ เพราะกิจการที่ยังไม่จดเลิกอย่างถูกต้องจะยังมีภาระต้องยื่นงบการเงินและอาจถูกปรับย้อนหลัง แนะนำให้ปรึกษาทีมงานก่อนเพื่อประเมินขั้นตอนและระยะเวลา',
      },
    ],
  },
  related: {
    title: 'อ่านเพิ่มเติมก่อนตัดสินใจ',
    intro: 'บทความจากทีมงาน IC ที่เขียนจากเคสจริงของลูกค้าในเชียงใหม่',
    readLabel: 'อ่านบทความ',
  },
  cta: {
    h3: 'พร้อมเริ่มต้นธุรกิจของคุณแล้วหรือยัง?',
    p: 'ปรึกษาทีมงาน IC ฟรี ไม่มีค่าใช้จ่าย เราช่วยแนะนำโครงสร้างที่เหมาะสมให้คุณ',
    btnQuote: 'นัดหมายปรึกษาฟรี',
    btnLine: 'ติดต่อผ่าน Line',
  },
};

const en: RegistrationContent = {
  htmlLang: 'en',
  meta: {
    title: `Company Registration in Chiang Mai from THB ${REG_PRICES.partnership.price} | IC Accounting`,
    description:
      'Register a Thai Limited Company or Limited Partnership in Chiang Mai. Every step handled, from name reservation to the company affidavit — government fees included.',
  },
  crumb: { home: 'Home', current: 'Company Registration' },
  hero: {
    eyebrow: 'Company Registration',
    h1Line1: 'Register your Thai company in Chiang Mai',
    h1Line2: `All-in from THB ${REG_PRICES.partnership.price}`,
    lead: 'Start your business the right way. We register Thai Limited Companies and Limited Partnerships end to end, so your first step is correct, quick and properly documented.',
    chips: ['Everything in one place', 'Government fees included', '1–3 working days', 'Free advice before you decide'],
  },
  packages: {
    eyebrow: 'Pricing',
    title: 'Registration packages',
    sublead: 'Prices include our service fee and all government fees. Nothing is added later.',
    allInLabel: 'All-in price',
    quoteButton: 'Request a quote',
    includes: [
      'Company name reservation',
      'Preparation of all registration documents',
      'Certified signing of documents',
      'Government registration fees and stamp duty',
    ],
    freebie: 'Free! Company rubber stamp, with design included',
    namePrefix: 'Register a ',
    partnership: {
      type: 'Partnership',
      name: 'Limited Partnership',
      tag: 'Simplest start',
      description: 'Price includes our service fee and every government fee payable.',
    },
    company: {
      type: 'Company',
      name: 'Limited Company',
      tag: 'Recommended',
      description: 'Price includes our service fee and every government fee payable.',
    },
  },
  newSetup: {
    eyebrow: 'New Setup',
    title: 'Registering a new business in Chiang Mai',
    body: 'We take care of everything from reserving the company name and drafting the articles of association, to filing with the Department of Business Development (DBD) — and we advise on shareholder structure and registered capital before you commit.',
    items: [
      'Limited Company / Limited Partnership registration',
      'Company affidavit and official company documents',
      'Employer registration with Social Security',
      'VAT registration',
    ],
  },
  changes: {
    eyebrow: 'Changes',
    title: 'Registered changes and company closure',
    body: 'For businesses expanding, restructuring or winding up.',
    items: [
      'Change of company name or company seal',
      'Increase or decrease of registered capital',
      'Change of directors or registered office address',
      'Dissolution and liquidation',
    ],
  },
  steps: {
    eyebrow: 'Process',
    title: 'Up and running in 1–3 working days',
    sublead: 'We handle every stage so you can start trading as soon as the paperwork clears.',
    items: [
      { title: 'Consultation', desc: 'We review your type of business and plan the shareholder structure with you.' },
      { title: 'Document preparation', desc: 'We collect the details and arrange signing, online or at our office.' },
      { title: 'Documents issued', desc: 'You receive the company affidavit and can open a corporate bank account right away.' },
    ],
  },
  faq: {
    title: 'Company registration — common questions',
    intro: 'The questions clients in Chiang Mai ask us most often before registering.',
    items: [
      {
        q: 'How much does it cost to register a company in Chiang Mai?',
        a: `A Limited Partnership is THB ${REG_PRICES.partnership.price} and a Limited Company is THB ${REG_PRICES.company.price}. Both prices include name reservation, document preparation, certified signing, government registration fees and stamp duty, plus a free company rubber stamp with design. Nothing is added afterwards.`,
      },
      {
        q: 'How long does company registration take?',
        a: 'Usually 1 to 3 working days once the documents are complete. We handle it from the first consultation through document preparation and signing, to collecting the company affidavit so you can open a bank account immediately.',
      },
      {
        q: 'Should I register a Limited Company or a Limited Partnership?',
        a: 'A Limited Partnership has fewer steps and lower start-up costs, which suits small ventures between partners who know each other well. A Limited Company separates shareholders’ liability from the business and usually carries more weight with suppliers and banks. We will talk it through with you free of charge before you decide.',
      },
      {
        q: 'What happens after the company is registered?',
        a: 'You still need to register as an employer with Social Security, and register for VAT if your business meets the threshold. Both are already included in our new business registration service.',
      },
      {
        q: 'Can you handle changes such as capital increases, address changes or new directors?',
        a: 'Yes, all of them — company name and seal changes, increases or decreases of registered capital, and changes of directors or registered office address.',
      },
      {
        q: 'Can you close or dissolve a company in Chiang Mai?',
        a: 'Yes. We handle dissolution and liquidation in full. This is not the same as simply stopping your filings — a company that has not been properly dissolved still has to file financial statements and can be fined retroactively. Talk to us first so we can assess the steps and timeline.',
      },
    ],
  },
  /** บทความทั้งหมดเป็นภาษาไทย จึงบอกไว้ในหัวข้อตามตรง ไม่ให้คนอ่านคลิกไปแล้วงง */
  related: {
    title: 'Further reading (articles in Thai)',
    intro: 'Articles by the IC team, written from real client cases in Chiang Mai. Available in Thai only.',
    readLabel: 'Read article (Thai)',
  },
  cta: {
    h3: 'Ready to start your business?',
    p: 'Talk to the IC team free of charge. We will recommend the structure that fits what you are building.',
    btnQuote: 'Book a free consultation',
    btnLine: 'Message us on LINE',
  },
};

export const registrationContent = { th, en } as const;
