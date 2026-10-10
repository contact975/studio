import type { Faq } from '@/lib/seo';

/**
 * เนื้อหาหน้าแรก ทั้งสองภาษา
 *
 * หน้าไทย / และหน้าอังกฤษ /en ใช้คอมโพเนนต์ชุดเดียวกัน (hero, services, faq ฯลฯ)
 * ต่างกันแค่ข้อความในไฟล์นี้ type บังคับให้ทั้งสองภาษามีคีย์และจำนวนรายการเท่ากัน
 * ลืมแปลตรงไหนหรือเพิ่มการ์ดให้ภาษาเดียว build จะไม่ผ่าน
 *
 * ── ข้อความส่งเข้าคอมโพเนนต์ฝั่ง client ──
 * จึงต้องเป็นข้อมูลล้วน (ไม่มีฟังก์ชัน ไม่มี JSX) ตัวแปรใช้ {n} {name} {rating} {text} แทน
 * ไอคอน รูป และแอนิเมชันอยู่ในคอมโพเนนต์ จับคู่กับข้อความตามลำดับ/คีย์
 *
 * ── ตัวเลขไม่พิมพ์ซ้ำ ──
 * จำนวนลูกค้า ปีประสบการณ์ ฯลฯ อยู่ใน HOME_NUMBERS ที่เดียว แล้วแทรกเข้าข้อความทั้งสองภาษา
 * (title/description ของหน้าแรกภาษาไทยยังพิมพ์ตัวเลขไว้ใน app/layout.tsx เหมือนเดิม — ถ้าเปลี่ยนตัวเลขต้องแก้ที่นั่นด้วย)
 */

export const HOME_NUMBERS = {
  /** ธุรกิจที่ดูแล (แสดงเป็น "100+" / "กว่า 100") */
  clients: 100,
  /** ปีประสบการณ์ */
  years: 10,
  /** จำนวนบริการหลัก (ตัวนับใน hero) */
  services: 5,
  /** คะแนน Google ค่าตั้งต้น */
  rating: 5,
  /** วันทำการที่ใช้จดทะเบียนบริษัทหลังเอกสารครบ */
  registrationDays: '1-3',
} as const;

const N = HOME_NUMBERS;

type Six<T> = [T, T, T, T, T, T];
type Three<T> = [T, T, T];
type Eight<T> = [T, T, T, T, T, T, T, T];

export type ServiceId = 'accounting' | 'audit' | 'registration' | 'expat' | 'system' | 'media';

/**
 * คำตอบ FAQ บางข้อมีลิงก์อยู่กลางประโยค
 * เก็บเป็นชิ้นๆ: ข้อความล้วน หรือ { text, href } สำหรับลิงก์ (spaced = เว้นระยะซ้ายขวาด้วย mx-1)
 */
export type FaqAnswerPart = string | { text: string; href: string; spaced?: boolean };
export type FaqAnswer = string | FaqAnswerPart[];

export type HomeContent = {
  meta: { title: string; description: string; ogImageAlt: string };
  /** คำถามที่ใส่ใน FAQPage schema — ทุกข้อต้องแสดงอยู่ใน FaqSection ด้วย */
  faqSchema: Faq[];
  homeHref: string;
  hero: {
    badge: string;
    h1Line1: string;
    h1Line2: string;
    tagline: string;
    lead: string;
    ctaPrimary: string;
    ctaSecondary: string;
    ctaSecondaryHref: string;
    stats: { clients: string; years: string; services: string; rating: string };
  };
  maskReveal: {
    ariaLabel: string;
    eyebrow: string;
    h2Before: string;
    h2Highlight: string;
    lineBefore: string;
    lineHighlight: string;
    lineAfter: string;
    posterAlt: string;
    playButton: string;
  };
  clients: { eyebrow: string; title: string; sublead: string };
  services: {
    eyebrow: string;
    title: string;
    lead: string;
    linkLabel: string;
    /** ป้ายใต้ตัวเลข 100% ในการ์ดตรวจสอบบัญชี */
    auditVisualLabel: string;
    items: Record<ServiceId, { fullTitle: string; tag: string; description: string; href: string }>;
  };
  promo: { alts: Three<string> };
  whyUs: {
    eyebrow: string;
    title: string;
    items: Six<{ title: string; subtitle: string; description: string }>;
  };
  behindTheScenes: {
    eyebrow: string;
    title: string;
    lead: string;
    imageAlt: string;
    uploadPlaceholder: string;
    prev: string;
    next: string;
    /** ใช้ {n} แทนเลขสไลด์ */
    goToSlide: string;
  };
  testimonials: {
    eyebrow: string;
    titleLine1: string;
    titleLine2: string;
    trustedLabel: string;
    /** alt ของรูปผู้รีวิว ใช้ {name} */
    reviewAlt: string;
    hint: string;
    seeAll: string;
    /** ข้อความสำหรับ screen reader ใช้ {name} {rating} {text} */
    srItem: string;
  };
  activities: {
    eyebrow: string;
    title: string;
    lead: string;
    readMore: string;
    imagePlaceholder: string;
    seeAll: string;
    items: Six<{ tag: string; date: string; title: string; desc: string }>;
  };
  serviceArea: {
    eyebrow: string;
    title: string;
    /** ย่อหน้านำ ประกอบเป็น before + <Link>accountingLink</Link> + middle + <Link>registrationLink</Link> + after */
    intro: {
      before: string;
      accountingLink: string;
      accountingHref: string;
      middle: string;
      registrationLink: string;
      registrationHref: string;
      after: string;
    };
    /** รายการแรกคือที่ตั้งสำนักงาน (ดอยสะเก็ด) */
    areas: Eight<{ name: string; note: string }>;
    office: { title: string; address: string; mapLink: string };
    hours: { title: string; days: string; note: string };
    remote: { title: string; text: string };
  };
  faq: { title: string; items: { question: string; answer: FaqAnswer }[] };
};

const th: HomeContent = {
  meta: {
    title: `สำนักงานบัญชีเชียงใหม่ ดูแลกว่า ${N.clients} ธุรกิจ | IC Accounting`,
    description: `รับทำบัญชี ปิดงบการเงิน จดทะเบียนบริษัท และ Visa & Work Permit ครบจบที่เดียว ประสบการณ์กว่า ${N.years} ปี ดูแลกว่า ${N.clients} ธุรกิจในเชียงใหม่และทั่วประเทศ ปรึกษาฟรีทาง LINE`,
    ogImageAlt: 'สำนักงานบัญชีเชียงใหม่ IC Accounting & Service',
  },
  faqSchema: [
    {
      q: 'ทำบัญชีเชียงใหม่ที่ไหนดี?',
      a: `IC Accounting Service คือสำนักงานบัญชีเชียงใหม่ที่เชี่ยวชาญด้านการรับทำบัญชีครบวงจร วางแผนภาษี และจดทะเบียนบริษัท โดยทีมงานมืออาชีพที่มีประสบการณ์กว่า ${N.years} ปี`,
    },
    {
      q: 'จดทะเบียนบริษัทในเชียงใหม่ ต้องใช้เวลานานเท่าไหร่?',
      a: `การจดทะเบียนบริษัทกับ IC Accounting ปกติจะใช้เวลาเพียง ${N.registrationDays} วันทำการ หลังจากเตรียมเอกสารครบถ้วน เราดูแลตั้งแต่จองชื่อจนถึงได้รับหนังสือรับรอง`,
    },
    {
      q: 'ค่าบริการทำบัญชีและภาษี ราคาเท่าไหร่?',
      a: 'ค่าบริการเริ่มต้นในราคาที่เหมาะสมสำหรับ SME พิจารณาจากปริมาณเอกสารและประเภทธุรกิจ เน้นความโปร่งใส ไม่มีค่าธรรมเนียมแอบแฝง',
    },
  ],
  homeHref: '/',
  hero: {
    badge: 'IC Accounting & Service — เชียงใหม่',
    h1Line1: 'ขับเคลื่อนธุรกิจสู่อนาคต',
    h1Line2: 'ด้วยโซลูชันบัญชีที่คุณวางใจ',
    tagline: 'สำนักงานบัญชีเชียงใหม่ ครบจบทุกเรื่องหลังบ้านธุรกิจ',
    lead: `รับทำบัญชี ปิดงบการเงิน และ Visa & Work Permit สำหรับธุรกิจในเชียงใหม่และทั่วประเทศ เราไม่ได้เป็นแค่คนทำบัญชี แต่เป็นที่ปรึกษาที่เข้าใจธุรกิจคุณ ด้วยประสบการณ์กว่า ${N.years} ปี`,
    ctaPrimary: 'ปรึกษาเราฟรี',
    ctaSecondary: 'ดูบริการทั้งหมด',
    ctaSecondaryHref: '/#services',
    stats: {
      clients: 'ลูกค้าที่ไว้วางใจ',
      years: 'ปีประสบการณ์',
      services: 'บริการครบวงจร',
      rating: 'คะแนน Google',
    },
  },
  maskReveal: {
    ariaLabel: 'รู้จัก IC Accounting',
    eyebrow: 'รู้จัก IC Accounting',
    h2Before: 'สำนักงานบัญชีที่',
    h2Highlight: 'ดูแลคุณครบวงจร',
    lineBefore: 'บัญชียุคใหม่ ',
    lineHighlight: 'โดยคนรุ่นใหม่',
    lineAfter: 'เพื่อผู้ประกอบการที่พร้อมก้าวไปข้างหน้า',
    posterAlt: 'ทีมงาน IC Accounting & Service เชียงใหม่',
    playButton: 'ดูวิดีโอแนะนำทีมงาน',
  },
  clients: {
    eyebrow: 'Trusted By',
    title: 'ลูกค้าที่อยู่ในการดูแลของเรา',
    sublead: `กว่า ${N.clients} ธุรกิจในเชียงใหม่และทั่วประเทศที่เลือกให้ IC ดูแลหลังบ้าน`,
  },
  services: {
    eyebrow: 'Our Services',
    title: 'เราดูแลอะไรให้ธุรกิจคุณบ้าง',
    lead: 'บริการทั้งหมดของสำนักงานบัญชีเชียงใหม่ IC Accounting & Service ตั้งแต่งานบัญชีรายเดือน ปิดงบการเงิน จดทะเบียนบริษัท ไปจนถึง Visa และ Work Permit',
    linkLabel: 'ดูรายละเอียดและราคา',
    auditVisualLabel: 'ถูกต้อง ทันกำหนด',
    items: {
      accounting: {
        fullTitle: 'บริการทำบัญชี เชียงใหม่',
        tag: 'Accounting Services',
        description:
          'รับทำบัญชีครบวงจรในเชียงใหม่ จัดระเบียบเอกสารรายรับ-รายจ่าย บันทึกบัญชี และดูแลเรื่องภาษีรายเดือนให้ถูกต้องแม่นยำ ช่วยให้เจ้าของธุรกิจเห็นกระแสเงินสดและลดความเสี่ยงจากการโดนค่าปรับย้อนหลัง',
        href: '/accounting-services',
      },
      audit: {
        fullTitle: 'ตรวจสอบบัญชีและปิดงบ เชียงใหม่',
        tag: 'Audit Services',
        description:
          'ตรวจสอบและจัดทำงบการเงินยื่นกรมพัฒนาธุรกิจการค้าและกรมสรรพากรให้ทันกำหนด ดูแลโดยทีมงานสำนักงานบัญชีเชียงใหม่ที่อัปเดตกฎหมายสม่ำเสมอ เพื่อความถูกต้อง 100%',
        href: '/audit-services',
      },
      registration: {
        fullTitle: 'จดทะเบียนบริษัท เชียงใหม่',
        tag: 'Company Registration',
        description:
          'รับจดทะเบียนธุรกิจในเชียงใหม่ ครบทุกขั้นตอนตั้งแต่จองชื่อจนถึงได้รับหนังสือรับรอง ให้คำปรึกษาโครงสร้างธุรกิจเพื่อให้คุณเริ่มต้นได้อย่างมั่นใจและประหยัดเวลา',
        href: '/company-registration',
      },
      expat: {
        fullTitle: 'Visa & Work Permit เชียงใหม่',
        tag: 'IC Visa / Work Permit',
        description:
          'ดูแลการขอและต่ออายุวีซ่าทุกประเภทในพื้นที่เชียงใหม่ และจัดการใบอนุญาตทำงาน ประสานงานหน่วยงานราชการให้ครบทุกขั้นตอนสำหรับชาวต่างชาติ',
        href: '/visa-work-permit',
      },
      system: {
        fullTitle: 'วางระบบบัญชีและองค์กร',
        tag: 'Organization System',
        description:
          'ปรับการจัดการหลังบ้านสำหรับธุรกิจเชียงใหม่ สอนใช้งานโปรแกรมบัญชี และวางขั้นตอนเอกสารให้เป็นระบบ เพื่อการตรวจสอบที่ง่ายและการเติบโตที่ยั่งยืน',
        href: '/organization-system',
      },
      media: {
        fullTitle: 'รับผลิต Media Content เชียงใหม่',
        tag: 'Marketing Online',
        description:
          'สร้างภาพลักษณ์ธุรกิจให้น่าเชื่อถือด้วยบริการผลิตวิดีโอและกราฟิกคุณภาพสูงในเชียงใหม่ ช่วยให้แบรนด์ของคุณมีตัวตนบนโลกออนไลน์ควบคู่ไปกับระบบบัญชีที่แข็งแกร่ง',
        href: '/media-content',
      },
    },
  },
  promo: {
    alts: ['บริการทำบัญชี โปรโมชั่น 1', 'บริการทำบัญชี โปรโมชั่น 2', 'บริการทำบัญชี โปรโมชั่น 3'],
  },
  whyUs: {
    eyebrow: 'Why IC',
    title: 'ทำไมต้องเลือก IC Accounting & Service?',
    items: [
      {
        title: 'Professional Expertise',
        subtitle: 'เชี่ยวชาญและรู้จริง',
        description:
          'เราคือทีมงานมืออาชีพที่มีประสบการณ์ตรงในเชียงใหม่ เราไม่ได้ทำแค่ตัวเลข แต่เราเข้าใจบริบทของธุรกิจในพื้นที่อย่างแท้จริง พร้อมจัดการทุกความซับซ้อนให้กลายเป็นความถูกต้อง',
      },
      {
        title: 'Tech-Driven Accounting',
        subtitle: 'ขับเคลื่อนด้วยเทคโนโลยี',
        description:
          'ก้าวข้ามการทำบัญชีแบบเดิมด้วยโปรแกรมบัญชีออนไลน์ เจ้าของธุรกิจดูตัวเลขของกิจการได้เองโดยไม่ต้องรอรายงานสิ้นเดือน และทีมงานทำงานกับข้อมูลชุดเดียวกับคุณเสมอ',
      },
      {
        title: 'Personalized Service',
        subtitle: 'ดูแลอย่างใกล้ชิดและเป็นกันเอง',
        description:
          'เรายึดถือการบริการด้วยใจ ให้คำปรึกษาที่เข้าใจง่าย ไม่ซับซ้อน พร้อมเป็นที่ปรึกษาธุรกิจที่ลงพื้นที่ดูแลคุณถึงหน้างาน',
      },
      {
        title: 'One Stop Solution',
        subtitle: 'ครบจบในที่เดียว',
        description:
          'ประหยัดเวลาและลดความยุ่งยากด้วยบริการที่ครอบคลุม ทั้งงานบัญชี ภาษี จดทะเบียนบริษัท Visa/Work Permit ไปจนถึงการผลิต Media Content',
      },
      {
        title: 'Paperless Workflow',
        subtitle: 'ไร้เอกสารกระดาษ',
        description:
          'ส่งเอกสารผ่านช่องทางออนไลน์ได้ทุกที่ทุกเวลา ไม่ต้องรวบรวมใส่กล่องแล้วขับรถมาส่งที่สำนักงานทุกเดือน และไม่ต้องหาที่เก็บแฟ้มย้อนหลัง เพราะค้นจากระบบได้ทันที',
      },
      {
        title: 'Our Own Ecosystem',
        subtitle: 'ระบบที่สร้างขึ้นเองทั้งชุด',
        description:
          'เราเขียนระบบจัดเก็บเอกสารและระบบบริหารงานภายในขึ้นใช้เอง ไม่ได้ซื้อสำเร็จรูปมาต่อกัน จึงปรับให้ตรงกับวิธีทำงานจริงได้เสมอ และตอบเรื่องสถานะงานหรือกำหนดยื่นแบบได้ทันทีที่ลูกค้าถาม',
      },
    ],
  },
  behindTheScenes: {
    eyebrow: 'Behind The Scenes',
    title: 'ทีมงานจริง ดูแลทุกขั้นตอนการทำงาน',
    lead: 'ตั้งแต่ทีมนักบัญชี ระบบตรวจสอบ การยื่นเอกสารราชการ ไปจนถึงการแบ่งปันความรู้ให้ธุรกิจของคุณ',
    imageAlt: 'ผลงานและกิจกรรมของ IC',
    uploadPlaceholder: 'อัปโหลดรูปการทำงาน',
    prev: 'ก่อนหน้า',
    next: 'ถัดไป',
    goToSlide: 'ไปสไลด์ {n}',
  },
  testimonials: {
    eyebrow: 'Reviews',
    titleLine1: 'สิ่งที่เราภูมิใจที่สุด',
    titleLine2: 'คือเสียงของลูกค้า',
    trustedLabel: 'ลูกค้าที่ไว้วางใจ',
    reviewAlt: 'รีวิวจาก {name}',
    hint: 'ลากเพื่อหมุน · แตะรูปเพื่ออ่านรีวิว ·',
    seeAll: 'ดูรีวิวทั้งหมดบน Google',
    srItem: '{name} ให้ {rating} ดาว: {text}',
  },
  activities: {
    eyebrow: 'Our Activities',
    title: 'กิจกรรมของบริษัท',
    lead: 'ความเคลื่อนไหวจริงของทีม IC — ทั้งการพัฒนาความรู้ การส่งต่อสู่สังคม และการดูแลลูกค้าถึงหน้างาน',
    readMore: 'อ่านต่อ',
    imagePlaceholder: 'ภาพกิจกรรม',
    seeAll: 'ดูกิจกรรมทั้งหมด',
    items: [
      {
        tag: 'อบรม & มาตรฐาน',
        date: 'มิถุนายน 2569',
        title: 'ยกระดับมาตรฐานสำนักงานบัญชีสู่คุณภาพระดับสากล',
        desc: 'เข้าร่วมโครงการพัฒนาศักยภาพและรับรองคุณภาพสำนักงานบัญชี เพื่อยกระดับการให้บริการอย่างมืออาชีพ',
      },
      {
        tag: 'วิทยากร',
        date: 'พฤษภาคม 2569',
        title: 'ได้รับเชิญเป็นวิทยากรบรรยายด้านบัญชีและภาษีธุรกิจ',
        desc: 'แบ่งปันความรู้การวางแผนภาษีและการบริหารการเงิน ให้กับผู้ประกอบการรุ่นใหม่',
      },
      {
        tag: 'ฝึกประสบการณ์',
        date: '2569',
        title: 'ต้อนรับนักศึกษาฝึกประสบการณ์วิชาชีพบัญชี',
        desc: 'เปิดโอกาสให้นักศึกษาเรียนรู้และลงมือทำงานจริงร่วมกับทีมงานมืออาชีพของ IC',
      },
      {
        tag: 'CSR',
        date: 'พฤษภาคม 2569',
        title: 'ร่วมกิจกรรมเพื่อสังคมและชุมชนในเชียงใหม่',
        desc: 'ส่งต่อความสุขและช่วยเหลือชุมชน เป็นส่วนหนึ่งของพันธกิจด้านสังคมที่เราให้ความสำคัญ',
      },
      {
        tag: 'ลงพื้นที่',
        date: '2569',
        title: 'ให้คำปรึกษาและวางระบบบัญชีถึงหน้างาน',
        desc: 'เดินทางไปดูแลลูกค้าถึงที่ พร้อมวางระบบบัญชีให้เหมาะกับบริบทของแต่ละธุรกิจ',
      },
      {
        tag: 'รางวัล',
        date: '2569',
        title: 'ความภาคภูมิใจจากมาตรฐานการให้บริการ',
        desc: `ผลลัพธ์จากความตั้งใจดูแลลูกค้าอย่างใกล้ชิด สะท้อนผ่านความไว้วางใจกว่า ${N.clients} ธุรกิจ`,
      },
    ],
  },
  serviceArea: {
    eyebrow: 'Service Area',
    title: 'พื้นที่ให้บริการทั่วเชียงใหม่และลำพูน',
    intro: {
      before: 'สำนักงานอยู่ที่ดอยสะเก็ด แต่ลูกค้าของเรากระจายอยู่ทั่วจังหวัด เพราะงาน',
      accountingLink: 'รับทำบัญชีรายเดือน',
      accountingHref: '/accounting-services',
      middle: 'ส่งเอกสารผ่านระบบออนไลน์ได้ ไม่ต้องเดินทางมาทุกเดือน ส่วนงานที่ต้องเจอหน้า เช่น วางระบบบัญชี ตรวจนับสต็อก หรือ',
      registrationLink: 'จดทะเบียนบริษัท',
      registrationHref: '/company-registration',
      after: 'เราเข้าไปถึงหน้างานในทุกอำเภอด้านล่างนี้',
    },
    areas: [
      { name: 'ดอยสะเก็ด', note: 'ที่ตั้งสำนักงาน เข้ามาคุยที่ออฟฟิศได้ทุกวันทำการ' },
      { name: 'เมืองเชียงใหม่', note: 'ร้านอาหาร คาเฟ่ โรงแรม และธุรกิจบริการในเขตเมือง' },
      { name: 'สันทราย', note: 'ธุรกิจการค้า หอพัก และกิจการรอบมหาวิทยาลัยแม่โจ้' },
      { name: 'สันกำแพง', note: 'งานหัตถกรรม ส่งออก และโรงงานขนาดเล็ก' },
      { name: 'แม่ริม', note: 'ที่พัก รีสอร์ต และธุรกิจท่องเที่ยว' },
      { name: 'หางดง', note: 'โรงงาน คลังสินค้า และธุรกิจค้าส่ง' },
      { name: 'สารภี', note: 'ธุรกิจครอบครัวและกิจการที่เพิ่งจดทะเบียนใหม่' },
      { name: 'ลำพูน', note: 'ดูแลถึงนิคมอุตสาหกรรมลำพูนและอำเภอใกล้เคียง' },
    ],
    office: {
      title: 'ที่ทำการ',
      // ต้องตรงกับฟุตเตอร์และ Google Business Profile ทุกตัวอักษร (NAP)
      address: '80/142 ต.สันปู่เลย อ.ดอยสะเก็ด เชียงใหม่ 50220',
      mapLink: 'ดูเส้นทางใน Google Maps',
    },
    hours: { title: 'เวลาทำการ', days: 'จันทร์ – เสาร์ 09:00 – 18:00 น.', note: 'นัดหมายนอกเวลาได้ทาง LINE' },
    remote: {
      title: 'ไม่สะดวกเดินทาง?',
      text: 'ส่งเอกสารผ่านออนไลน์ได้ทั้งหมด หรือให้เราเข้าไปรับถึงที่สำหรับลูกค้ารายเดือน',
    },
  },
  faq: {
    title: 'FAQ: คำถามที่พบบ่อยเกี่ยวกับเรา',
    items: [
      {
        question: 'ทำบัญชีเชียงใหม่ที่ไหนดี?',
        answer: [
          'หากคุณกำลังมองหา สำนักงานบัญชีเชียงใหม่ ที่มีความเชี่ยวชาญ ',
          { text: 'IC Accounting Service', href: '/' },
          ' คือคำตอบ เรามี',
          { text: 'บริการรับทำบัญชีครบวงจร', href: '/accounting-services', spaced: true },
          'วางแผนภาษี และจดทะเบียนบริษัท โดยทีมงานมืออาชีพที่เข้าใจบริบทธุรกิจในเชียงใหม่และภาคเหนือ พร้อมให้คำปรึกษาที่ใกล้ชิดและถูกต้องตามกฎหมาย',
        ],
      },
      {
        question: 'บริการรับทำบัญชีของ IC Accounting ครอบคลุมอะไรบ้าง?',
        answer:
          'บริการของเราครอบคลุมตั้งแต่การบันทึกรายการบัญชีรายเดือน, จัดทำงบการเงิน, ยื่นภาษี (ภ.ง.ด. 1, 3, 53, 54), ยื่นภาษีมูลค่าเพิ่ม (ภ.พ. 30), ไปจนถึงการปิดงบการเงินประจำปี และการให้คำปรึกษาด้านการวางแผนภาษีเพื่อลดหย่อนภาษีอย่างถูกต้อง',
      },
      {
        question: 'จดทะเบียนบริษัทในเชียงใหม่ ต้องใช้เวลานานเท่าไหร่?',
        answer: `การจดทะเบียนบริษัทกับ IC Accounting โดยปกติจะใช้เวลาเพียง ${N.registrationDays} วันทำการ (หลังจากเตรียมเอกสารครบถ้วน) เราช่วยดูแลตั้งแต่การจองชื่อนิติบุคคล, จัดทำหนังสือบริคณห์สนธิ, ไปจนถึงการจดทะเบียนภาษีมูลค่าเพิ่ม (VAT) ทำให้ผู้ประกอบการเริ่มต้นธุรกิจได้อย่างรวดเร็ว`,
      },
      {
        question: 'สำนักงานบัญชี IC Accounting ตั้งอยู่ที่ไหนในเชียงใหม่?',
        answer:
          'สำนักงานของเราตั้งอยู่ในจังหวัดเชียงใหม่ พร้อมให้บริการลูกค้าทั้งในตัวเมืองและอำเภอใกล้เคียง (เช่น สันทราย, หางดง, สารภี) รวมถึงให้บริการผ่านระบบบัญชีออนไลน์ (Cloud Accounting) สำหรับลูกค้าทั่วประเทศ',
      },
      {
        question: 'ค่าบริการทำบัญชีและภาษี ราคาเท่าไหร่?',
        answer:
          'ค่าบริการของ IC Accounting เริ่มต้นในราคาที่เหมาะสมสำหรับ SME และ Start-up โดยพิจารณาจากปริมาณเอกสารและประเภทธุรกิจ เราเน้นความโปร่งใส ไม่มีค่าธรรมเนียมแอบแฝง และช่วยประหยัดค่าใช้จ่ายแฝงจากความผิดพลาดทางภาษี',
      },
      {
        question: 'IC Accounting & Service แตกต่างจากสำนักงานบัญชีทั่วไปอย่างไร?',
        answer:
          "เราไม่ได้ทำแค่ตัวเลข แต่เราคือ 'เลขาส่วนตัวธุรกิจ' ที่เดินเคียงข้างคุณ เรานำเทคโนโลยี Cloud Accounting มาใช้เพื่อให้คุณเห็นข้อมูล Real-time พร้อมทีมงานที่ลงพื้นที่จริง (Consult) และยังมีบริการผลิต Media Content เพื่อช่วยปั้นแบรนด์ของคุณให้ดูเป็นมืออาชีพควบคู่ไปกับระบบหลังบ้านที่แข็งแรงค่ะ",
      },
      {
        question: 'จดบริษัทกับ IC ดีกว่าจดเองอย่างไร?',
        answer:
          'เราช่วยลดความยุ่งยากและป้องกันความผิดพลาดที่อาจเกิดขึ้นในอนาคต ตั้งแต่การวางโครงสร้างผู้ถือหุ้นที่เหมาะสม การจองชื่อนิติบุคคล จนถึงการได้รับหนังสือรับรองและขึ้นทะเบียนต่างๆ ครบจบในที่เดียว พร้อมให้คำปรึกษาเรื่องการวางระบบบัญชีตั้งแต่ก้าวแรกเพื่อให้คุณเริ่มธุรกิจได้อย่างถูกต้อง 100% ค่ะ',
      },
      {
        question: "บริการ 'วางระบบองค์กร' ของ IC คืออะไร?",
        answer:
          "คือการเข้าไปช่วยจัดระเบียบ 'หลังบ้าน' ของธุรกิจคุณค่ะ ตั้งแต่การออกแบบขั้นตอนการไหลของเอกสาร (Workflow) การเลือกใช้โปรแกรมบัญชีที่เหมาะสม การวางระบบควบคุมภายในเพื่อป้องกันการทุจริต ไปจนถึงการอบรมพนักงานให้ใช้งานระบบได้อย่างมีประสิทธิภาพ เพื่อให้เจ้าของธุรกิจทำงานง่ายขึ้นและตรวจสอบได้ทุกขั้นตอนค่ะ",
      },
      {
        question: 'มีบริการสำหรับชาวต่างชาติที่ทำธุรกิจในไทยด้วยไหม?',
        answer:
          'มีค่ะ เรามีบริการ IC Visa / Work Permit ที่ดูแลทั้งเรื่องการยื่นขอและต่ออายุ Visa ประเภทต่างๆ รวมถึงใบอนุญาตทำงาน (Work Permit) โดยทีมงานที่สื่อสารภาษาอังกฤษได้ดีและเข้าใจระเบียบข้อบังคับของราชการไทยอย่างละเอียด ช่วยให้ชาวต่างชาติทำธุรกิจในไทยได้อย่างราบรื่นค่ะ',
      },
      {
        question: 'ถ้ายังไม่จ้างทำบัญชีรายเดือน สามารถปรึกษาเบื้องต้นก่อนได้ไหม?',
        answer:
          'ได้แน่นอนค่ะ! เรายินดีให้คำปรึกษาเบื้องต้นฟรีสำหรับผู้ประกอบการที่กำลังเริ่มต้น หรือผู้ที่มีข้อสงสัยเกี่ยวกับเรื่องบัญชีและภาษี คุณสามารถนัดหมายเข้ามาพูดคุย หรือทักมาทาง Line เพื่อประเมินความต้องการเบื้องต้นก่อนได้ เพื่อให้มั่นใจว่าเราคือพาร์ทเนอร์ที่ตอบโจทย์ธุรกิจของคุณจริงๆ ค่ะ',
      },
    ],
  },
};

const en: HomeContent = {
  meta: {
    title: `Accounting Firm in Chiang Mai, Looking After ${N.clients}+ Businesses | IC Accounting`,
    description: `Accounting, year-end financial statements, company registration and Visa & Work Permit, all in one place. Over ${N.years} years of experience looking after more than ${N.clients} businesses in Chiang Mai and across Thailand. Free consultation on LINE.`,
    ogImageAlt: 'IC Accounting & Service, an accounting firm in Chiang Mai',
  },
  faqSchema: [
    {
      q: 'Where can I find a good accounting firm in Chiang Mai?',
      a: `IC Accounting Service is an accounting firm in Chiang Mai specialising in full-service accounting, tax planning and company registration, with a professional team that has over ${N.years} years of experience.`,
    },
    {
      q: 'How long does it take to register a company in Chiang Mai?',
      a: `Registering a company with IC Accounting usually takes just ${N.registrationDays} working days once all documents are ready. We handle everything from reserving the company name to receiving the company certificate.`,
    },
    {
      q: 'How much do accounting and tax services cost?',
      a: 'Fees start at a level that suits SMEs and depend on your document volume and type of business. We keep pricing transparent, with no hidden fees.',
    },
  ],
  homeHref: '/en',
  hero: {
    badge: 'IC Accounting & Service — Chiang Mai',
    h1Line1: 'Driving your business forward',
    h1Line2: 'with accounting you can trust',
    tagline: 'An accounting firm in Chiang Mai that handles everything behind the scenes of your business',
    lead: `Accounting, year-end financial statements, and Visa & Work Permit services for businesses in Chiang Mai and across Thailand. We are not just bookkeepers — we are advisors who understand your business, with over ${N.years} years of experience.`,
    ctaPrimary: 'Free consultation',
    ctaSecondary: 'See all services',
    ctaSecondaryHref: '/en#services',
    stats: {
      clients: 'Clients who trust us',
      years: 'Years of experience',
      services: 'Core services',
      rating: 'Google rating',
    },
  },
  maskReveal: {
    ariaLabel: 'Meet IC Accounting',
    eyebrow: 'Meet IC Accounting',
    h2Before: 'An accounting firm that ',
    h2Highlight: 'takes care of everything for you',
    lineBefore: 'Modern accounting ',
    lineHighlight: 'by a new generation',
    lineAfter: 'for business owners ready to move forward',
    posterAlt: 'The IC Accounting & Service team in Chiang Mai',
    playButton: 'Watch our team video',
  },
  clients: {
    eyebrow: 'Trusted By',
    title: 'Businesses in our care',
    sublead: `More than ${N.clients} businesses in Chiang Mai and across Thailand have chosen IC to run their back office`,
  },
  services: {
    eyebrow: 'Our Services',
    title: 'What we take care of for your business',
    lead: 'Every service from IC Accounting & Service, an accounting firm in Chiang Mai — from monthly accounting and year-end financial statements to company registration, visas and work permits.',
    linkLabel: 'See details and prices',
    auditVisualLabel: 'Accurate and on time',
    items: {
      accounting: {
        fullTitle: 'Accounting Services in Chiang Mai',
        tag: 'Accounting Services',
        description:
          'Full-service accounting in Chiang Mai. We organise your income and expense documents, keep the books and handle your monthly taxes accurately, so you can see your cash flow and reduce the risk of back-dated penalties.',
        href: '/en/accounting-services',
      },
      audit: {
        fullTitle: 'Audit and Year-End Closing in Chiang Mai',
        tag: 'Audit Services',
        description:
          'We audit and prepare your financial statements and file them with the Department of Business Development and the Revenue Department on time, handled by our Chiang Mai team who keep up with every change in the law, for 100% accuracy.',
        href: '/en/audit-services',
      },
      registration: {
        fullTitle: 'Company Registration in Chiang Mai',
        tag: 'Company Registration',
        description:
          'Business registration in Chiang Mai, every step from reserving the name to receiving the company certificate, with advice on your business structure so you can start with confidence and save time.',
        href: '/en/company-registration',
      },
      expat: {
        fullTitle: 'Visa & Work Permit in Chiang Mai',
        tag: 'IC Visa / Work Permit',
        description:
          'We handle applications and renewals for every type of visa in Chiang Mai, take care of work permits, and coordinate with government offices at every step for foreigners.',
        href: '/en/visa-work-permit',
      },
      system: {
        fullTitle: 'Accounting and Organization Systems',
        tag: 'Organization System',
        description:
          'We improve back-office management for Chiang Mai businesses, train your team on accounting software and set up orderly document procedures, for easier checks and sustainable growth.',
        href: '/en/organization-system',
      },
      media: {
        fullTitle: 'Media Content Production in Chiang Mai',
        tag: 'Marketing Online',
        description:
          'Build a credible business image with high-quality video and graphics produced in Chiang Mai, giving your brand an online presence alongside a solid accounting system.',
        href: '/en/media-content',
      },
    },
  },
  promo: {
    alts: ['Accounting services promotion 1', 'Accounting services promotion 2', 'Accounting services promotion 3'],
  },
  whyUs: {
    eyebrow: 'Why IC',
    title: 'Why choose IC Accounting & Service?',
    items: [
      {
        title: 'Professional Expertise',
        subtitle: 'Experts who know the field',
        description:
          'We are a professional team with first-hand experience in Chiang Mai. We do more than the numbers — we truly understand how local businesses work, and we turn every complication into something correct.',
      },
      {
        title: 'Tech-Driven Accounting',
        subtitle: 'Powered by technology',
        description:
          'We move beyond traditional bookkeeping with online accounting software. You can check your business figures yourself without waiting for the month-end report, and our team always works from the same data as you.',
      },
      {
        title: 'Personalized Service',
        subtitle: 'Close, friendly care',
        description:
          'We serve from the heart, with advice that is easy to understand and never complicated, and we are business advisors who come out to look after you on site.',
      },
      {
        title: 'One Stop Solution',
        subtitle: 'Everything in one place',
        description:
          'Save time and hassle with services that cover it all: accounting, tax, company registration, Visa/Work Permit and even Media Content production.',
      },
      {
        title: 'Paperless Workflow',
        subtitle: 'No paper needed',
        description:
          'Send your documents online anywhere, any time. No more boxing them up and driving to our office every month, and no need to store old files, because everything can be found in the system instantly.',
      },
      {
        title: 'Our Own Ecosystem',
        subtitle: 'Systems we built ourselves',
        description:
          'We wrote our own document storage and internal management systems instead of stitching together off-the-shelf products, so they always fit how we really work, and we can answer questions about job status or filing deadlines the moment you ask.',
      },
    ],
  },
  behindTheScenes: {
    eyebrow: 'Behind The Scenes',
    title: 'A real team, looking after every step',
    lead: 'From our accountants and review process to government filings and sharing knowledge with your business.',
    imageAlt: 'IC at work and at our activities',
    uploadPlaceholder: 'Upload a work photo',
    prev: 'Previous',
    next: 'Next',
    goToSlide: 'Go to slide {n}',
  },
  testimonials: {
    eyebrow: 'Reviews',
    titleLine1: 'What we are proudest of',
    titleLine2: 'is what our clients say',
    trustedLabel: 'Clients who trust us',
    reviewAlt: 'Review from {name}',
    hint: 'Drag to rotate · Tap a photo to read the review ·',
    seeAll: 'See all reviews on Google',
    srItem: '{name} gave {rating} stars: {text}',
  },
  activities: {
    eyebrow: 'Our Activities',
    title: 'Company activities',
    lead: 'What the IC team has really been up to — building our knowledge, giving back to the community and looking after clients on site.',
    readMore: 'Read more',
    imagePlaceholder: 'Activity photo',
    seeAll: 'See all activities',
    items: [
      {
        tag: 'Training & Standards',
        date: 'June 2026',
        title: 'Raising our accounting office to international quality standards',
        desc: 'We took part in a programme to develop and certify the quality of accounting offices, to raise the professional standard of our service.',
      },
      {
        tag: 'Speaker',
        date: 'May 2026',
        title: 'Invited to speak on business accounting and tax',
        desc: 'Sharing knowledge on tax planning and financial management with new business owners.',
      },
      {
        tag: 'Internship',
        date: '2026',
        title: 'Welcoming accounting interns',
        desc: 'Giving students the chance to learn and do real work alongside the professional IC team.',
      },
      {
        tag: 'CSR',
        date: 'May 2026',
        title: 'Taking part in social and community activities in Chiang Mai',
        desc: 'Spreading happiness and helping the community, as part of the social mission we care about.',
      },
      {
        tag: 'On site',
        date: '2026',
        title: 'Advice and accounting system setup at your workplace',
        desc: "We travel to our clients and set up accounting systems that fit each business's situation.",
      },
      {
        tag: 'Recognition',
        date: '2026',
        title: 'Proud of our standard of service',
        desc: `The result of looking after our clients closely, reflected in the trust of more than ${N.clients} businesses.`,
      },
    ],
  },
  serviceArea: {
    eyebrow: 'Service Area',
    title: 'Serving all of Chiang Mai and Lamphun',
    intro: {
      before: 'Our office is in Doi Saket, but our clients are spread across the province, because for ',
      accountingLink: 'monthly accounting',
      accountingHref: '/en/accounting-services',
      middle: 'you can send your documents online, with no need to travel in every month. For work that needs a face-to-face visit, such as setting up an accounting system, stock counts or',
      registrationLink: 'company registration',
      registrationHref: '/en/company-registration',
      after: '— we come to you in every district below.',
    },
    areas: [
      { name: 'Doi Saket', note: 'Our office location — drop in for a chat any working day' },
      { name: 'Mueang Chiang Mai', note: 'Restaurants, cafés, hotels and service businesses in the city' },
      { name: 'San Sai', note: 'Trading businesses, dormitories and businesses around Maejo University' },
      { name: 'San Kamphaeng', note: 'Handicrafts, exporters and small factories' },
      { name: 'Mae Rim', note: 'Accommodation, resorts and tourism businesses' },
      { name: 'Hang Dong', note: 'Factories, warehouses and wholesale businesses' },
      { name: 'Saraphi', note: 'Family businesses and newly registered companies' },
      { name: 'Lamphun', note: 'Including the Lamphun industrial estate and nearby districts' },
    ],
    office: {
      title: 'Office',
      address: '80/142 Tambon San Pu Loei, Doi Saket District, Chiang Mai 50220',
      mapLink: 'Get directions in Google Maps',
    },
    hours: { title: 'Office hours', days: 'Monday – Saturday 09:00 – 18:00', note: 'Appointments outside these hours can be arranged on LINE' },
    remote: {
      title: "Can't make it to the office?",
      text: 'All documents can be sent online, or we can come and collect them from you if you are a monthly client.',
    },
  },
  faq: {
    title: 'FAQ: Frequently asked questions about us',
    items: [
      {
        question: 'Where can I find a good accounting firm in Chiang Mai?',
        answer: [
          'If you are looking for an experienced accounting firm in Chiang Mai, ',
          { text: 'IC Accounting Service', href: '/en' },
          ' is the answer. We offer ',
          { text: 'full-service accounting', href: '/en/accounting-services' },
          ', tax planning and company registration, with a professional team that understands doing business in Chiang Mai and northern Thailand, giving close, personal advice that complies with the law.',
        ],
      },
      {
        question: "What do IC Accounting's accounting services cover?",
        answer:
          'Our services cover monthly bookkeeping, preparing financial statements, tax filing (PND.1, 3, 53, 54), VAT returns (PP.30), through to annual financial statement closing and tax planning advice to reduce your tax correctly.',
      },
      {
        question: 'How long does it take to register a company in Chiang Mai?',
        answer: `Registering a company with IC Accounting usually takes just ${N.registrationDays} working days (once all documents are ready). We take care of everything from reserving the company name and preparing the Memorandum of Association to VAT registration, so you can get your business started quickly.`,
      },
      {
        question: 'Where in Chiang Mai is the IC Accounting office?',
        answer:
          'Our office is in Chiang Mai province. We serve clients in the city and nearby districts (such as San Sai, Hang Dong and Saraphi), and we also serve clients across Thailand through online accounting (Cloud Accounting).',
      },
      {
        question: 'How much do accounting and tax services cost?',
        answer:
          'IC Accounting fees start at a level that suits SMEs and start-ups, based on your document volume and type of business. We keep pricing transparent with no hidden fees, and help you avoid the hidden costs of tax mistakes.',
      },
      {
        question: 'How is IC Accounting & Service different from other accounting firms?',
        answer:
          "We do more than the numbers — we are your 'personal business secretary', working alongside you. We use Cloud Accounting technology so you can see your data in real time, our team comes out to you on site (Consult), and we also produce Media Content to help your brand look professional alongside a strong back office.",
      },
      {
        question: 'Why register a company with IC instead of doing it yourself?',
        answer:
          'We take away the hassle and help prevent mistakes that could cause problems later, from setting up a suitable shareholder structure and reserving the company name to receiving your company certificate and completing the other registrations — all in one place. We also advise on your accounting system from day one, so your business starts out 100% correctly.',
      },
      {
        question: "What is IC's 'Organization System' service?",
        answer:
          "It means helping you organise the 'back office' of your business: designing how documents flow (Workflow), choosing the right accounting software, setting up internal controls to prevent fraud, and training your staff to use the system effectively — so the business owner's work gets easier and every step can be checked.",
      },
      {
        question: 'Do you have services for foreigners doing business in Thailand?',
        answer:
          'Yes. Our IC Visa / Work Permit service handles applications and renewals for all types of visas as well as work permits, with a team that communicates well in English and understands Thai government rules in detail, helping foreigners do business in Thailand smoothly.',
      },
      {
        question: "Can I get an initial consultation before signing up for monthly accounting?",
        answer:
          'Of course! We are happy to give a free initial consultation to business owners who are just starting out, or anyone with questions about accounting and tax. You can book an appointment to talk with us, or message us on Line to discuss what you need first, so you can be sure we are the right partner for your business.',
      },
    ],
  },
};

export const homeContent = { th, en } as const;

/** แทนที่ {key} ในข้อความด้วยค่าที่ส่งมา */
export function fill(template: string, values: Record<string, string | number>) {
  return template.replace(/\{(\w+)\}/g, (m, k: string) => (k in values ? String(values[k]) : m));
}
