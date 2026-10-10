import {
  AUDIT_CUSTOM_ABOVE,
  AUDIT_DEPOSIT_PERCENT,
  AUDIT_DORMANT,
  AUDIT_FIRST_REVENUE_TIER,
  AUDIT_PRICE_YEAR,
  BUNDLE_DOC_DEADLINE_DAY,
  formatAuditPrice as p,
  type AuditTier,
} from '@/lib/audit-packages';

/**
 * เนื้อหาหน้าบริการตรวจสอบบัญชี ทั้งสองภาษา
 *
 * หน้าไทย /audit-services และหน้าอังกฤษ /en/audit-services ใช้ audit-template.tsx ตัวเดียวกัน
 * type บังคับให้ทั้งสองภาษามีคีย์ครบเท่ากัน ลืมแปลตรงไหนจะ build ไม่ผ่าน
 *
 * ── ตัวเลขไม่อยู่ในไฟล์นี้ ──
 * ราคา ช่วงรายได้ ปีรอบบัญชี เงื่อนไขชำระ ดึงจาก lib/audit-packages.ts ทั้งหมด รวมถึงใน FAQ และ metadata
 * ข้อความที่ส่งเข้าตารางราคาฝั่ง client ใช้ {label} {price} {amount} แทนตัวแปร เพราะส่งฟังก์ชันข้าม server/client ไม่ได้
 */

const DORMANT_AUDIT = p(AUDIT_DORMANT.auditOnly);
const DORMANT_BUNDLE = p(AUDIT_DORMANT.bundle);
const TIER1_AUDIT = p(AUDIT_FIRST_REVENUE_TIER.auditOnly);
const TIER1_MAX = p(AUDIT_FIRST_REVENUE_TIER.amount);
const CUSTOM_MILLIONS = AUDIT_CUSTOM_ABOVE / 1_000_000;
const YEAR_BE = AUDIT_PRICE_YEAR + 543;
const YEAR_CE = AUDIT_PRICE_YEAR;

type Plan = {
  /** ป้ายเล็กบนหัวการ์ด เช่น "มีแล้ว → แบบที่ 1" */
  step: string;
  name: string;
  short: string;
  /** บรรทัดเล็กใต้ราคา */
  note: string;
  fit: string;
};

export type AuditContent = {
  htmlLang: string;
  meta: { title: string; description: string; ogDescription: string };
  crumb: { home: string; homeHref: string; current: string };
  hero: { eyebrow: string; h1Line1: string; h1Line2: string; lead: string; chips: string[] };
  choose: {
    eyebrow: string;
    title: string;
    question: string;
    fitLabel: string;
    from: string;
    perYear: string;
    auditOnly: Plan & { scopeTitle: string; scope: string[] };
    bundle: Plan & { badge: string; monthlyTitle: string; monthly: string[]; yearEndTitle: string; yearEnd: string[] };
    accountingPrompt: string;
    accountingLink: string;
    accountingHref: string;
  };
  pricing: { eyebrow: string; title: string; sublead: string };
  /** ข้อความของตารางราคาโต้ตอบ (คอมโพเนนต์ฝั่ง client) */
  table: {
    /** ป้ายช่วงรายได้ {amount} = ตัวเลขที่จัดรูปแบบแล้ว */
    tier: Record<AuditTier['kind'], string>;
    question: string;
    hint: string;
    placeholder: string;
    unit: string;
    auditOnly: string;
    auditOnlyNote: string;
    bundle: string;
    perYear: string;
    /** {price} = ค่าเฉลี่ยต่อเดือน */
    avgPerMonth: string;
    bundleTail: string;
    customQuote: string;
    colRevenue: string;
    colAuditOnly: string;
    colAuditOnlySub: string;
    colBundle: string;
    colBundleSub: string;
    footnote: string;
    /** {label} = ป้ายช่วงรายได้ที่เลือก */
    quoteForTier: string;
    quoteGeneric: string;
  };
  terms: { eyebrow: string; title: string; auditOnlyTitle: string; auditOnly: string[]; bundleTitle: string; bundle: string[]; footnote: string };
  why: { eyebrow: string; title: string; items: { num: string; title: string; description: string }[] };
  cta: { h3: string; p: string; btnQuote: string; quoteHref: string; btnLine: string };
  faq: { title: string; intro: string; items: { q: string; a: string }[] };
  related: { title: string; intro: string; readLabel: string };
  schema: {
    name: string;
    description: string;
    auditOffer: string;
    auditOfferDesc: string;
    bundleOffer: string;
    bundleOfferDesc: string;
  };
};

/** ป้ายช่วงรายได้ของแต่ละแถว ตามภาษา */
export function tierLabel(c: AuditContent, tier: AuditTier): string {
  return c.table.tier[tier.kind].replace('{amount}', tier.amount === null ? '' : p(tier.amount));
}

const th: AuditContent = {
  htmlLang: 'th',
  meta: {
    title: `ปิดงบการเงินเชียงใหม่ ตรวจสอบโดย CPA เริ่ม ${DORMANT_AUDIT}/ปี | IC Accounting`,
    description: `ตรวจสอบบัญชีและปิดงบประจำปีในเชียงใหม่โดยผู้สอบบัญชีรับอนุญาต ยื่น DBD และสรรพากรให้ครบ เริ่ม ${DORMANT_AUDIT} บาท/ปี หรือแพ็กเกจครบวงจรทำบัญชี + ตรวจสอบ เริ่ม ${DORMANT_BUNDLE} บาท/ปี ราคารวม VAT`,
    ogDescription: `ตรวจสอบอย่างเดียว เริ่ม ${DORMANT_AUDIT}/ปี · ครบวงจร ทำบัญชี + ตรวจสอบ เริ่ม ${DORMANT_BUNDLE}/ปี ราคารวม VAT`,
  },
  crumb: { home: 'หน้าแรก', homeHref: '/', current: 'บริการตรวจสอบบัญชี' },
  hero: {
    eyebrow: 'Audit Services · ตรวจสอบบัญชีประจำปี',
    h1Line1: 'ปิดงบการเงินเชียงใหม่',
    h1Line2: `ตรวจสอบโดย CPA เริ่ม ${DORMANT_AUDIT}/ปี`,
    lead: 'ทุกบริษัทต้องส่งงบการเงินที่ผ่านการตรวจสอบทุกปี — เราตรวจ รับรอง และยื่นให้ทั้งกรมพัฒนาธุรกิจการค้าและกรมสรรพากร เลือกได้ว่าจะให้เราตรวจอย่างเดียว หรือทำบัญชีให้ทั้งปีแล้วปิดงบให้เสร็จ',
    chips: ['ตรวจโดยผู้สอบบัญชีรับอนุญาต (CPA)', 'ยื่น DBD และสรรพากรให้ครบ', 'ราคารวม VAT ตามช่วงรายได้', 'งบเปล่าก็รับทำ'],
  },
  choose: {
    eyebrow: 'Which one is for you',
    title: 'มีให้เลือก 2 แบบ ตอบคำถามเดียวก็รู้',
    question: 'ตอนนี้บริษัทคุณมีคนทำบัญชีรายเดือนอยู่แล้วหรือยัง?',
    fitLabel: 'เหมาะกับ ',
    from: 'เริ่มต้น',
    perYear: 'บาท/ปี',
    auditOnly: {
      step: 'มีแล้ว → แบบที่ 1',
      name: 'ตรวจสอบบัญชีอย่างเดียว',
      short: 'คุณทำบัญชีเอง เราตรวจและปิดงบให้',
      note: 'คิดตามช่วงรายได้ต่อปี · รวม VAT · ไม่รวมค่าทำบัญชี',
      fit: 'กิจการที่มีพนักงานบัญชีหรือสำนักงานบัญชีทำบัญชีรายเดือนให้อยู่แล้ว ต้องการแค่ผู้สอบบัญชีมาตรวจ เซ็นรับรอง และยื่นงบให้ตอนสิ้นปี',
      scopeTitle: 'ที่คุณจะได้จากเรา',
      scope: [
        'ตรวจสอบงบการเงินตามมาตรฐานการสอบบัญชี และออกรายงานของผู้สอบบัญชีรับอนุญาต (CPA)',
        'จัดทำงบการเงินฉบับสมบูรณ์ พร้อมหมายเหตุประกอบงบการเงิน',
        'จัดทำและนำส่งแบบ ส.บช.3 และงบการเงินต่อกรมพัฒนาธุรกิจการค้า (DBD e-Filing)',
        'จัดทำและนำส่งแบบ ภ.ง.ด.50 พร้อมงบการเงินต่อกรมสรรพากร',
        'ให้คำแนะนำเบื้องต้นเกี่ยวกับประเด็นทางบัญชีและภาษีที่พบจากการตรวจสอบ',
      ],
    },
    bundle: {
      step: 'ยังไม่มี → แบบที่ 2',
      badge: '⭐ จบในที่เดียว',
      name: 'ครบวงจร ทำบัญชี + ตรวจสอบบัญชี',
      short: 'เราทำบัญชีให้ทั้งปี แล้วปิดงบให้เสร็จ',
      note: 'คิดตามช่วงรายได้ต่อปี · รวม VAT · แบ่งจ่ายรายเดือนได้',
      fit: 'กิจการที่ไม่มีคนทำบัญชี อยากให้สำนักงานดูแลทั้งหมดตั้งแต่บันทึกบัญชี ยื่นภาษีทุกเดือน ไปจนถึงปิดงบและตรวจสอบตอนสิ้นปี จ่ายราคาเดียวจบ',
      monthlyTitle: 'ทำให้ทุกเดือน',
      monthly: [
        'บันทึกบัญชีตามมาตรฐานการบัญชี พร้อมรายงานผู้บริหารรายเดือน',
        'จัดทำและยื่นแบบ ภ.ง.ด.1, ภ.ง.ด.3, ภ.ง.ด.53',
        'จัดทำและยื่นแบบ ภ.พ.30 พร้อมรายงานภาษีซื้อ-ภาษีขาย (กรณีจด VAT)',
        'จัดทำและยื่นแบบนำส่งเงินสมทบประกันสังคม',
        'ขึ้นทะเบียนผู้ทำบัญชีให้กับกิจการตามที่กฎหมายกำหนด',
      ],
      yearEndTitle: 'ทำให้ตอนสิ้นปี',
      yearEnd: [
        'ปิดบัญชีและจัดทำงบการเงินพร้อมหมายเหตุประกอบงบ',
        'ตรวจสอบและแสดงความเห็นโดยผู้สอบบัญชีรับอนุญาต (CPA)',
        'ยื่นแบบ ภ.ง.ด.50 และ ภ.ง.ด.51 ต่อกรมสรรพากร',
        'นำส่ง ส.บช.3 และงบการเงินต่อกรมพัฒนาธุรกิจการค้า',
        'ให้คำปรึกษาด้านบัญชีและภาษีตลอดรอบปีบัญชี',
      ],
    },
    accountingPrompt: 'ต้องการแค่ทำบัญชีรายเดือน ยังไม่ถึงตอนปิดงบ?',
    accountingLink: 'ดูแพ็กเกจทำบัญชีรายเดือน →',
    accountingHref: '/accounting-services',
  },
  pricing: {
    eyebrow: 'Pricing',
    title: 'ค่าบริการตามช่วงรายได้ต่อปี',
    sublead: 'ราคาเดียวกันทั้งตาราง ไม่มีค่าใช้จ่ายแฝง ยิ่งรายได้น้อย ยิ่งจ่ายน้อย — เทียบทั้ง 2 แบบได้ในตารางเดียว',
  },
  table: {
    tier: {
      dormant: 'งบเปล่า (ไม่มีรายการเคลื่อนไหว)',
      upTo: 'รายได้ไม่เกิน {amount}',
      over: 'รายได้เกิน {amount}',
    },
    question: 'ปีที่แล้วบริษัทคุณมีรายได้ประมาณเท่าไหร่?',
    hint: 'กรอกตัวเลขคร่าวๆ ก็พอ ระบบจะชี้ราคาของคุณให้ทั้ง 2 แบบ (หรือกดที่แถวในตารางได้เลย)',
    placeholder: 'เช่น 2,000,000',
    unit: 'บาท/ปี',
    auditOnly: 'ตรวจสอบอย่างเดียว',
    auditOnlyNote: 'ต่อปี · คุณทำบัญชีเอง เราตรวจและปิดงบให้',
    bundle: 'ครบวงจร ทำบัญชี + ตรวจสอบ',
    perYear: 'ต่อปี',
    avgPerMonth: ' · เฉลี่ย ≈ ฿{price}/เดือน',
    bundleTail: ' · เราทำให้ทั้งปี',
    customQuote: 'เสนอราคารายกรณี',
    colRevenue: 'ช่วงรายได้ต่อปี (บาท)',
    colAuditOnly: 'ตรวจสอบอย่างเดียว',
    colAuditOnlySub: 'มีคนทำบัญชีแล้ว',
    colBundle: 'ครบวงจร',
    colBundleSub: 'ทำบัญชี + ตรวจสอบ',
    footnote: `ราคาสำหรับรอบบัญชีปี ${YEAR_BE} มีผลถึง 31 ธันวาคม ${YEAR_BE} · ทุกราคารวมภาษีมูลค่าเพิ่มแล้ว`,
    quoteForTier: 'ขอใบเสนอราคา ช่วง{label}',
    quoteGeneric: 'ขอใบเสนอราคาเฉพาะกิจการ',
  },
  terms: {
    eyebrow: 'Terms',
    title: 'เงื่อนไขการให้บริการ',
    auditOnlyTitle: 'แบบที่ 1 · ตรวจสอบอย่างเดียว',
    auditOnly: [
      'ราคานี้เป็นราคารวมภาษีมูลค่าเพิ่มแล้ว แต่ไม่รวมค่าธรรมเนียมที่หน่วยงานราชการเรียกเก็บ',
      'กิจการเป็นผู้จัดทำบัญชีและนำส่งงบทดลอง บัญชีแยกประเภท พร้อมเอกสารประกอบให้ครบถ้วน',
      'กรณีเอกสารไม่ครบถ้วน หรือต้องปรับปรุงบัญชีใหม่ อาจมีค่าบริการเพิ่มเติมตามที่ตกลงกัน',
      `ชำระค่าบริการ ${AUDIT_DEPOSIT_PERCENT}% เมื่อตกลงรับงาน และส่วนที่เหลือเมื่อส่งมอบรายงานผู้สอบบัญชี`,
      'กรณีมีบริษัทในเครือหรือส่งงานหลายกิจการ สามารถเจรจาส่วนลดเป็นกรณีพิเศษ',
    ],
    bundleTitle: 'แบบที่ 2 · ครบวงจร ทำบัญชี + ตรวจสอบ',
    bundle: [
      'ราคานี้เป็นราคารวมภาษีมูลค่าเพิ่มแล้ว แต่ไม่รวมค่าธรรมเนียมที่หน่วยงานราชการเรียกเก็บ',
      'ค่าบริการคิดเป็นรายปี สามารถแบ่งชำระเป็นรายเดือนหรือรายไตรมาสได้ตามที่ตกลงกัน',
      'ราคาอ้างอิงจากปริมาณเอกสารในระดับปกติของแต่ละช่วงรายได้ หากมีเอกสารมากผิดปกติหรือรายการซับซ้อน จะแจ้งค่าบริการเพิ่มเติมก่อนเริ่มงานทุกครั้ง',
      'ไม่รวมงานจดทะเบียนกับกรมพัฒนาธุรกิจการค้า งานขอคืนภาษี และงานตรวจสอบพิเศษ',
      `กิจการนำส่งเอกสารประกอบการบันทึกบัญชีภายในวันที่ ${BUNDLE_DOC_DEADLINE_DAY} ของเดือนถัดไป`,
    ],
    footnote: `ตารางค่าบริการเบื้องต้นสำหรับรอบบัญชีปี ${YEAR_BE} มีผลถึงวันที่ 31 ธันวาคม ${YEAR_BE} ทุกราคารวมภาษีมูลค่าเพิ่มแล้ว ราคาสุดท้ายขึ้นอยู่กับปริมาณเอกสารและความซับซ้อนของกิจการ`,
  },
  why: {
    eyebrow: 'Why IC',
    title: 'ทำไมผู้ประกอบการจึงเลือก IC',
    items: [
      { num: '01', title: 'ทีมงาน CPA มืออาชีพ', description: 'ดูแลโดยผู้สอบบัญชีรับอนุญาต (CPA) ที่มีประสบการณ์ตรงในหลากหลายอุตสาหกรรม' },
      { num: '02', title: 'บอกตรงๆ ว่าเจออะไร', description: 'ชี้แจงทุกประเด็นความเสี่ยงอย่างชัดเจน พร้อมแนวทางแก้ไขที่ถูกต้องตามกฎหมาย' },
      { num: '03', title: 'ทันกำหนดทุกปี', description: 'ระบบจัดการเอกสารแบบดิจิทัล ช่วยให้งานตรวจสอบและยื่นงบเสร็จตามกำหนด ไม่เสียค่าปรับ' },
    ],
  },
  cta: {
    h3: 'ยังไม่แน่ใจว่าควรเลือกแบบไหน?',
    p: 'ทักมาเล่าสถานการณ์บริษัทให้ฟัง ทีมงาน IC ช่วยประเมินและออกใบเสนอราคาให้ฟรี ไม่มีข้อผูกมัด',
    btnQuote: 'นัดหมายปรึกษาฟรี',
    quoteHref: '/quote',
    btnLine: 'ติดต่อผ่าน Line',
  },
  /**
   * คำถามชุดนี้แสดงบนหน้าเว็บจริงผ่าน <ServiceFaq /> และใช้ใน FAQ schema
   * ทุกคำตอบอ้างอิงตัวเลขและเงื่อนไขในเอกสารราคาเท่านั้น ไม่ได้แต่งเพิ่ม
   * (คำค้นเป้าหมาย: ปิดงบการเงิน เชียงใหม่ · รับปิดงบเปล่า เชียงใหม่ · ตรวจสอบบัญชี เชียงใหม่)
   */
  faq: {
    title: 'คำถามที่พบบ่อยเรื่องตรวจสอบบัญชี',
    intro: 'รวมคำถามที่เจ้าของธุรกิจถามบ่อยที่สุดก่อนส่งงบให้เราตรวจ',
    items: [
      {
        q: 'ค่าตรวจสอบบัญชีประจำปีเริ่มต้นเท่าไหร่?',
        a: `ถ้าคุณมีคนทำบัญชีอยู่แล้วและต้องการแค่ผู้สอบบัญชีตรวจและปิดงบ เริ่มต้น ${DORMANT_AUDIT} บาทต่อปีสำหรับงบเปล่า และ ${TIER1_AUDIT} บาทสำหรับรายได้ไม่เกิน ${TIER1_MAX} บาท ราคารวมภาษีมูลค่าเพิ่มแล้ว คิดตามช่วงรายได้ต่อปี ดูตารางเต็มได้ในหน้านี้`,
      },
      {
        q: 'ตรวจสอบอย่างเดียว กับ แพ็กเกจครบวงจร ต่างกันอย่างไร?',
        a: `ตรวจสอบอย่างเดียว เหมาะกับกิจการที่ทำบัญชีเองหรือมีสำนักงานบัญชีอยู่แล้ว เราตรวจสอบ รับรองงบ และยื่นให้ตอนสิ้นปี ส่วนแพ็กเกจครบวงจร เราทำบัญชีและยื่นภาษีให้ทุกเดือนตลอดปี แล้วปิดงบพร้อมผู้สอบบัญชีให้เสร็จในราคาเดียว เริ่ม ${DORMANT_BUNDLE} บาทต่อปี`,
      },
      {
        q: 'บริษัทที่ยังไม่มีรายได้ ต้องตรวจสอบงบการเงินไหม?',
        a: `ต้องทำ นิติบุคคลที่จดทะเบียนแล้วต้องนำส่งงบการเงินที่ผ่านการตรวจสอบทุกปี แม้ปีนั้นไม่มีรายการเลย เรียกว่างบเปล่า ค่าบริการตรวจสอบอย่างเดียว ${DORMANT_AUDIT} บาท หรือแบบครบวงจร ${DORMANT_BUNDLE} บาทต่อปี รวม VAT`,
      },
      {
        q: 'ถ้าเลือกตรวจสอบอย่างเดียว ต้องเตรียมอะไรให้บ้าง?',
        a: 'กิจการเป็นผู้จัดทำบัญชีและนำส่งงบทดลอง บัญชีแยกประเภท พร้อมเอกสารประกอบให้ครบถ้วน หากเอกสารไม่ครบหรือต้องปรับปรุงบัญชีใหม่ อาจมีค่าบริการเพิ่มเติมตามที่ตกลงกัน',
      },
      {
        q: 'ชำระค่าบริการอย่างไร?',
        a: `ตรวจสอบอย่างเดียว ชำระ ${AUDIT_DEPOSIT_PERCENT}% เมื่อตกลงรับงาน และส่วนที่เหลือเมื่อส่งมอบรายงานผู้สอบบัญชี ส่วนแพ็กเกจครบวงจรคิดเป็นรายปี แบ่งชำระเป็นรายเดือนหรือรายไตรมาสได้ตามที่ตกลงกัน`,
      },
      {
        q: `รายได้เกิน ${CUSTOM_MILLIONS} ล้านบาท หรือมีหลายบริษัท คิดราคาอย่างไร?`,
        a: `รายได้เกิน ${CUSTOM_MILLIONS} ล้านบาทเสนอราคาเป็นรายกรณีตามความซับซ้อนของกิจการ และหากมีบริษัทในเครือหรือส่งงานหลายกิจการพร้อมกัน สามารถเจรจาส่วนลดเป็นกรณีพิเศษได้`,
      },
    ],
  },
  // ค่าเดียวกับค่าเริ่มต้นของ <RelatedArticles /> หน้าไทยจึงแสดงเหมือนเดิมทุกตัวอักษร
  related: {
    title: 'อ่านเพิ่มเติมก่อนตัดสินใจ',
    intro: 'บทความจากทีมงาน IC ที่เขียนจากเคสจริงของลูกค้าในเชียงใหม่',
    readLabel: 'อ่านบทความ',
  },
  schema: {
    name: 'บริการตรวจสอบบัญชีและปิดงบการเงิน เชียงใหม่',
    description:
      'ตรวจสอบงบการเงินโดยผู้สอบบัญชีรับอนุญาต จัดทำงบการเงินฉบับสมบูรณ์ นำส่ง ส.บช.3 ต่อกรมพัฒนาธุรกิจการค้า และ ภ.ง.ด.50 ต่อกรมสรรพากร มีทั้งแบบตรวจสอบอย่างเดียวและแบบครบวงจรทำบัญชี + ตรวจสอบ ราคารวม VAT คิดตามช่วงรายได้ต่อปี',
    auditOffer: 'ตรวจสอบบัญชีประจำปี',
    auditOfferDesc: 'ต่อปี รวม VAT กิจการมีผู้ทำบัญชีอยู่แล้ว',
    bundleOffer: 'ครบวงจร ทำบัญชี + ตรวจสอบ',
    bundleOfferDesc: 'ต่อปี รวม VAT รวมทำบัญชีรายเดือนและปิดงบ',
  },
};

const en: AuditContent = {
  htmlLang: 'en',
  meta: {
    title: 'Annual Audit & Year-End Financial Statements in Chiang Mai | IC Accounting',
    description: `Annual audit and year-end closing in Chiang Mai by a licensed auditor (CPA), with full filing to the DBD and the Revenue Department. Audit only from ${DORMANT_AUDIT} THB/year, or an all-in-one accounting + audit package from ${DORMANT_BUNDLE} THB/year. Prices include VAT.`,
    ogDescription: `Audit only from ${DORMANT_AUDIT}/year · All-in-one accounting + audit from ${DORMANT_BUNDLE}/year · Prices include VAT`,
  },
  crumb: { home: 'Home', homeHref: '/en', current: 'Audit Services' },
  hero: {
    eyebrow: 'Audit Services · Annual Audit',
    h1Line1: 'Year-End Closing in Chiang Mai',
    h1Line2: 'Audited by a Licensed CPA',
    lead: 'Every company must submit audited financial statements every year. We audit, certify and file them with both the Department of Business Development (DBD) and the Revenue Department. You choose: we only do the audit, or we keep your books all year and close the year for you.',
    chips: ['Audited by a licensed auditor (CPA)', 'Full filing with the DBD and Revenue Department', 'VAT-inclusive prices by revenue band', 'Dormant companies welcome'],
  },
  choose: {
    eyebrow: 'Which one is for you',
    title: 'Two options. One question tells you which.',
    question: 'Does your company already have someone doing its monthly bookkeeping?',
    fitLabel: 'Best for ',
    from: 'From',
    perYear: 'THB/year',
    auditOnly: {
      step: 'Yes → Option 1',
      name: 'Audit Only',
      short: 'You keep the books, we audit and close the year',
      note: 'Priced by annual revenue · VAT included · Bookkeeping not included',
      fit: 'Companies that already have an in-house accountant or an accounting firm doing their monthly bookkeeping, and only need an auditor to audit, sign off and file the financial statements at year-end.',
      scopeTitle: 'What you get from us',
      scope: [
        'Audit of the financial statements under auditing standards, with a report from a licensed auditor (CPA)',
        'Complete financial statements, including notes to the financial statements',
        'Preparation and submission of the Sor.Bor.Chor.3 form and financial statements to the DBD (DBD e-Filing)',
        'Preparation and filing of PND.50 with the financial statements to the Revenue Department',
        'Initial advice on accounting and tax issues found during the audit',
      ],
    },
    bundle: {
      step: 'No → Option 2',
      badge: '⭐ All in one place',
      name: 'All-in-One: Accounting + Audit',
      short: 'We keep your books all year, then close the year for you',
      note: 'Priced by annual revenue · VAT included · Monthly installments available',
      fit: 'Companies with no one to do their bookkeeping that want us to handle everything, from recording transactions and monthly tax filing to year-end closing and the audit, for one price.',
      monthlyTitle: 'Every month',
      monthly: [
        'Bookkeeping under accounting standards, with monthly management reports',
        'Preparation and filing of PND.1, PND.3 and PND.53',
        'Preparation and filing of PP.30 with input and output tax reports (if VAT-registered)',
        'Preparation and filing of social security contributions',
        'Registration of the company’s bookkeeper as required by law',
      ],
      yearEndTitle: 'At year-end',
      yearEnd: [
        'Closing the books and preparing financial statements with notes',
        'Audit and opinion by a licensed auditor (CPA)',
        'Filing PND.50 and PND.51 with the Revenue Department',
        'Submitting Sor.Bor.Chor.3 and the financial statements to the DBD',
        'Accounting and tax advice throughout the accounting year',
      ],
    },
    accountingPrompt: 'Only need monthly bookkeeping, and not at year-end yet?',
    accountingLink: 'See monthly accounting packages →',
    accountingHref: '/en/accounting-services',
  },
  pricing: {
    eyebrow: 'Pricing',
    title: 'Fees by annual revenue',
    sublead: 'One price list for everyone, with no hidden costs. The lower your revenue, the less you pay — compare both options in a single table.',
  },
  table: {
    tier: {
      dormant: 'Dormant company (no transactions)',
      upTo: 'Revenue up to {amount}',
      over: 'Revenue over {amount}',
    },
    question: 'Roughly how much revenue did your company make last year?',
    hint: 'A rough figure is fine. We’ll show your price for both options (or just tap a row in the table).',
    placeholder: 'e.g. 2,000,000',
    unit: 'THB/year',
    auditOnly: 'Audit Only',
    auditOnlyNote: 'per year · You keep the books, we audit and close the year',
    bundle: 'All-in-One: Accounting + Audit',
    perYear: 'per year',
    avgPerMonth: ' · avg. ≈ ฿{price}/month',
    bundleTail: ' · We handle the whole year',
    customQuote: 'Quoted case by case',
    colRevenue: 'Annual revenue (THB)',
    colAuditOnly: 'Audit Only',
    colAuditOnlySub: 'Already have a bookkeeper',
    colBundle: 'All-in-One',
    colBundleSub: 'Accounting + Audit',
    footnote: `Prices for the ${YEAR_CE} accounting year, valid until 31 December ${YEAR_CE} · All prices include VAT`,
    quoteForTier: 'Request a quote: {label}',
    quoteGeneric: 'Request a quote for your business',
  },
  terms: {
    eyebrow: 'Terms',
    title: 'Terms of service',
    auditOnlyTitle: 'Option 1 · Audit Only',
    auditOnly: [
      'Prices include VAT but do not include fees charged by government agencies.',
      'Your company prepares its own books and provides the trial balance, general ledger and complete supporting documents.',
      'If documents are incomplete or the books need to be adjusted, additional fees may apply as agreed.',
      `Payment: ${AUDIT_DEPOSIT_PERCENT}% when we accept the engagement, and the balance when we deliver the auditor’s report.`,
      'Special discounts can be negotiated for affiliated companies or when you send us several companies.',
    ],
    bundleTitle: 'Option 2 · All-in-One: Accounting + Audit',
    bundle: [
      'Prices include VAT but do not include fees charged by government agencies.',
      'Fees are annual and can be paid monthly or quarterly as agreed.',
      'Prices assume a normal volume of documents for each revenue band. If there are unusually many documents or complex transactions, we will always tell you about any additional fee before work starts.',
      'Does not include registrations with the DBD, tax refund claims or special audits.',
      `Your company sends supporting documents for bookkeeping by day ${BUNDLE_DOC_DEADLINE_DAY} of the following month.`,
    ],
    footnote: `Indicative fees for the ${YEAR_CE} accounting year, valid until 31 December ${YEAR_CE}. All prices include VAT. The final price depends on your document volume and the complexity of your business.`,
  },
  why: {
    eyebrow: 'Why IC',
    title: 'Why business owners choose IC',
    items: [
      { num: '01', title: 'A professional CPA team', description: 'Your audit is handled by licensed auditors (CPAs) with hands-on experience across many industries.' },
      { num: '02', title: 'We tell you straight what we find', description: 'We explain every risk clearly, together with the correct, lawful way to fix it.' },
      { num: '03', title: 'On time, every year', description: 'Digital document management helps us finish the audit and filing on schedule, so you don’t pay late penalties.' },
    ],
  },
  cta: {
    h3: 'Not sure which option to choose?',
    p: 'Message us and tell us about your company. The IC team will assess it and prepare a quotation for free, with no obligation.',
    btnQuote: 'Book a free consultation',
    quoteHref: '/en/quote',
    btnLine: 'Contact us on LINE',
  },
  faq: {
    title: 'Audit FAQ',
    intro: 'The questions business owners ask most often before sending us their financial statements to audit.',
    items: [
      {
        q: 'How much does an annual audit cost?',
        a: `If you already have someone doing your bookkeeping and only need an auditor to audit and close the year, prices start at ${DORMANT_AUDIT} THB a year for a dormant company and ${TIER1_AUDIT} THB for revenue up to ${TIER1_MAX} THB. Prices include VAT and are based on annual revenue. See the full table on this page.`,
      },
      {
        q: 'What is the difference between Audit Only and the All-in-One package?',
        a: `Audit Only suits companies that do their own bookkeeping or already have an accounting firm. We audit, certify and file at year-end. With the All-in-One package, we do your bookkeeping and tax filing every month throughout the year, then close the year with the auditor, all for one price, from ${DORMANT_BUNDLE} THB a year.`,
      },
      {
        q: 'Does a company with no revenue yet need audited financial statements?',
        a: `Yes. Every registered juristic person must submit audited financial statements every year, even in a year with no transactions at all. These are called dormant (nil) financial statements. Audit Only costs ${DORMANT_AUDIT} THB, or ${DORMANT_BUNDLE} THB a year for the All-in-One package, VAT included.`,
      },
      {
        q: 'If I choose Audit Only, what do I need to prepare?',
        a: 'Your company prepares the books and provides the trial balance, general ledger and complete supporting documents. If documents are incomplete or the books need to be adjusted, additional fees may apply as agreed.',
      },
      {
        q: 'How do I pay?',
        a: `For Audit Only, you pay ${AUDIT_DEPOSIT_PERCENT}% when we accept the engagement and the balance when we deliver the auditor’s report. The All-in-One package is priced per year and can be paid monthly or quarterly as agreed.`,
      },
      {
        q: `How do you price revenue over ${CUSTOM_MILLIONS} million baht, or several companies?`,
        a: `For revenue over ${CUSTOM_MILLIONS} million baht, we quote case by case based on the complexity of the business. If you have affiliated companies or send us several companies at once, special discounts can be negotiated.`,
      },
    ],
  },
  related: {
    title: 'Further reading (articles in Thai)',
    intro: 'Articles by the IC team, written from real client cases in Chiang Mai. Available in Thai only.',
    readLabel: 'Read article (Thai)',
  },
  schema: {
    name: 'Annual Audit and Year-End Financial Statements in Chiang Mai',
    description:
      'Audit of financial statements by a licensed auditor (CPA), complete financial statements, submission of Sor.Bor.Chor.3 to the Department of Business Development and PND.50 to the Revenue Department. Available as Audit Only or as an All-in-One accounting + audit package. Prices include VAT and are based on annual revenue.',
    auditOffer: 'Annual audit',
    auditOfferDesc: 'Per year, VAT included, for companies that already have a bookkeeper',
    bundleOffer: 'All-in-One accounting + audit',
    bundleOfferDesc: 'Per year, VAT included, covers monthly bookkeeping and year-end closing',
  },
};

export const auditContent = { th, en } as const;
