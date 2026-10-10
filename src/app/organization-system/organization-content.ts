/**
 * เนื้อหาหน้าวางระบบองค์กร ทั้งสองภาษา
 *
 * หน้าไทย /organization-system และหน้าอังกฤษ /en/organization-system
 * ใช้เทมเพลตเดียวกัน (organization-template.tsx) ดีไซน์และลำดับหัวข้อจึงต่างกันไม่ได้
 * type บังคับให้ทั้งสองภาษามีคีย์ครบเท่ากัน ลืมแปลตรงไหนจะ build ไม่ผ่าน
 *
 * หน้านี้ไม่มีราคาตายตัว (ดูเหตุผลที่ priceFactors) จึงไม่มีตัวเลขราคาให้ต้องดึงจากไฟล์กลาง
 *
 * FAQ: ทุกคำตอบสรุปจาก solutions / steps / benefits ที่แสดงอยู่บนหน้านี้แล้ว
 * จึงผ่านเงื่อนไขของ Google ที่ว่าเนื้อหา FAQ ต้องมองเห็นได้จริงบนหน้า
 */

export type SolutionIcon = 'chart' | 'shield' | 'users';

export type OrganizationContent = {
  htmlLang: string;
  meta: { title: string; description: string };
  schema: { name: string; description: string; crumbHome: string; crumbCurrent: string };
  crumb: { home: string; homeHref: string; current: string };
  hero: { eyebrow: string; h1Line1: string; h1Line2: string; lead: string; chips: string[] };
  solutions: {
    eyebrow: string;
    title: string;
    sublead: string;
    items: { icon: SolutionIcon; title: string; desc: string; tag: string }[];
  };
  benefits: {
    eyebrow: string;
    title: string;
    lead: string;
    items: string[];
    card: { eyebrow: string; title: string; desc: string; features: string[]; cta: string };
  };
  process: {
    eyebrow: string;
    title: string;
    sublead: string;
    stepLabel: string;
    items: { step: string; title: string; desc: string }[];
  };
  cta: { h3: string; p: string; btnQuote: string; btnLine: string };
  pricing: {
    eyebrow: string;
    title: string;
    /** หน้าไทยเดิมขึ้นบรรทัดใหม่ใน JSX ระหว่างสองประโยค เบราว์เซอร์แสดงเป็นช่องว่าง จึงเก็บเป็นสองท่อน */
    lead: [string, string];
    factors: { n: string; title: string; desc: string }[];
    box: {
      title: string;
      /** สามบรรทัดใน JSX เดิม ต่อกันด้วยช่องว่าง */
      desc: [string, string, string];
      prepTitle: string;
      prepItems: string[];
      cta: string;
    };
  };
  faq: { title: string; intro: string; items: { q: string; a: string }[] };
  /** undefined = ใช้ข้อความไทยตั้งต้นของ RelatedArticles */
  related?: { title: string; intro: string; readLabel: string };
};

/**
 * ส่วน "ค่าบริการคิดอย่างไร" (priceFactors)
 *
 * งานวางระบบไม่มีราคาตายตัวจริง ขอบเขตต่างกันตามธุรกิจ
 * แต่การไม่บอกอะไรเลยทำให้คนอ่านเดาไปทางเดียวคือ "แพงจนไม่กล้าบอก"
 * แล้วปิดหน้าไปโดยไม่ทัก
 *
 * แนวเดียวกับที่หน้าตรวจสอบบัญชีและหน้าทำบัญชีใช้อยู่แล้ว คือไม่ผูกมัดราคา
 * แต่บอกว่าอะไรเป็นตัวกำหนด เพื่อให้คนอ่านเดาได้ว่าตัวเองอยู่ตรงไหน
 * และรู้ว่าต้องเตรียมข้อมูลอะไรมาก่อนทักมาถาม
 *
 * รายการนี้ถอดมาจากขั้นตอนและขอบเขตงานที่ประกาศอยู่บนหน้านี้แล้ว
 * ถ้าตัวแปรจริงของทีมต่างจากนี้ แก้ทั้งสองภาษาในไฟล์นี้
 */

const th: OrganizationContent = {
  htmlLang: 'th',
  meta: {
    title: 'วางระบบองค์กรและบัญชีดิจิทัล เชียงใหม่ | IC Accounting',
    description:
      'วางระบบบัญชีและองค์กรสำหรับธุรกิจเชียงใหม่ ทั้งระบบบัญชี Cloud ระบบควบคุมภายใน และงานบุคคล-เงินเดือน สำรวจหน้างานจริง ติดตั้งพร้อมอบรมทีม และดูแลต่อเนื่อง ปรึกษาฟรี',
  },
  schema: {
    name: 'บริการวางระบบบัญชีและระบบองค์กร เชียงใหม่',
    description:
      'วางระบบบัญชีและภาษีบน Cloud ระบบควบคุมภายใน และระบบงานบุคคลและเงินเดือน สำหรับธุรกิจในเชียงใหม่ ตั้งแต่สำรวจขั้นตอนงานปัจจุบัน ออกแบบ workflow ใหม่ ติดตั้งจริง อบรมทีมงาน ไปจนถึงติดตามผลระยะยาว',
    crumbHome: 'หน้าแรก',
    crumbCurrent: 'บริการวางระบบองค์กร',
  },
  crumb: { home: 'หน้าแรก', homeHref: '/', current: 'วางระบบองค์กร' },
  hero: {
    eyebrow: 'Organization System',
    h1Line1: 'วางระบบองค์กร',
    h1Line2: 'และบัญชีดิจิทัล',
    lead: 'ยกระดับธุรกิจด้วยระบบการจัดการที่แม่นยำ ลดความซ้ำซ้อน เข้าถึงข้อมูลแบบ Real-time เปลี่ยน "งานเอกสาร" ให้เป็น "กลยุทธ์"',
    chips: ['ระบบ Cloud-based', 'Real-time Data', 'ลดงาน Manual', 'ซัพพอร์ตหลังติดตั้ง'],
  },
  solutions: {
    eyebrow: 'Solutions',
    title: 'โซลูชันเพื่อการจัดการที่เหนือกว่า',
    sublead: 'ระบบที่ออกแบบมาเพื่อธุรกิจ SME ในยุคดิจิทัล',
    items: [
      {
        icon: 'chart',
        title: 'ระบบบัญชีและภาษี Cloud',
        desc: 'วางรากฐานการบันทึกบัญชีผ่านโปรแกรมบัญชีออนไลน์ (Cloud) เชื่อมโยงหน้าบ้านและหลังบ้านเข้าด้วยกันอย่างราบรื่น',
        tag: 'Cloud Accounting',
      },
      {
        icon: 'shield',
        title: 'ระบบควบคุมภายใน',
        desc: 'ออกแบบผังการอนุมัติ (Approval Flow) และการเช็คสต็อกสินค้า เพื่อป้องกันความผิดพลาดและการทุจริต',
        tag: 'Internal Control',
      },
      {
        icon: 'users',
        title: 'ระบบงานบุคคลและเงินเดือน',
        desc: 'จัดระเบียบงาน HR ตั้งแต่การลงเวลาทำงาน จนถึงการจ่ายเงินเดือนและยื่นประกันสังคมอัตโนมัติ',
        tag: 'HR & Payroll',
      },
    ],
  },
  benefits: {
    eyebrow: 'Benefits',
    title: 'ธุรกิจของคุณจะได้อะไร?',
    lead: 'เมื่อระบบหลังบ้านแข็งแกร่ง คุณจะมีเวลาโฟกัสกับสิ่งที่สำคัญจริงๆ — การเติบโตของธุรกิจ',
    items: [
      'ลดเวลางานเอกสารที่ซ้ำซ้อน',
      'เข้าถึงข้อมูลการเงินแบบ Real-time',
      'ลดความเสี่ยงจากความผิดพลาดของมนุษย์',
      'ระบบที่ scale ได้ตามการเติบโตของธุรกิจ',
      'ทีมงานทำงานได้ง่ายและมีประสิทธิภาพขึ้น',
      'รายงานทางการเงินที่แม่นยำและทันเวลา',
    ],
    card: {
      eyebrow: 'Powered by',
      title: 'วางระบบบนโปรแกรมบัญชีออนไลน์',
      desc: 'เราวางระบบบัญชีให้ลูกค้าอยู่บนโปรแกรมบัญชีออนไลน์ เชื่อมบัญชี ภาษี และการเงินไว้ในที่เดียว เจ้าของธุรกิจจึงดูตัวเลขของกิจการได้เองโดยไม่ต้องรอรายงานสิ้นเดือน',
      features: ['Dashboard แบบ Real-time', 'ออกใบกำกับภาษีอิเล็กทรอนิกส์', 'เชื่อมต่อกับ e-Tax Invoice', 'รายงานทางการเงินอัตโนมัติ'],
      cta: 'สอบถามรายละเอียด',
    },
  },
  process: {
    eyebrow: 'Process',
    title: 'ขั้นตอนการพัฒนาระบบร่วมกับเรา',
    sublead: '4 ขั้นตอนที่ออกแบบมาให้ราบรื่นที่สุด',
    stepLabel: 'Step',
    items: [
      { step: '01', title: 'Audit & Analysis', desc: 'สำรวจขั้นตอนการทำงานปัจจุบันและค้นหาจุดที่ต้องการการปรับปรุง (Pain Points)' },
      { step: '02', title: 'Design & Tools', desc: 'ออกแบบ workflow ใหม่และเลือกใช้ซอฟต์แวร์ที่เหมาะสมกับขนาดธุรกิจ' },
      { step: '03', title: 'Implement & Training', desc: 'ติดตั้งระบบจริง พร้อมจัดอบรมทีมงานให้ใช้งานได้อย่างชำนาญ' },
      { step: '04', title: 'Support & Optimize', desc: 'ติดตามผลและปรับแต่งระบบให้เสถียรที่สุดเพื่อการเติบโตในระยะยาว' },
    ],
  },
  cta: {
    h3: 'พร้อมยกระดับระบบหลังบ้านของคุณ?',
    p: 'ปรึกษาทีมงาน IC ฟรี เราจะวิเคราะห์ Pain Points และแนะนำระบบที่เหมาะสมที่สุดสำหรับธุรกิจของคุณ',
    btnQuote: 'นัดหมายปรึกษาฟรี',
    btnLine: 'ติดต่อผ่าน Line',
  },
  pricing: {
    eyebrow: 'Pricing',
    title: 'ค่าบริการวางระบบคิดอย่างไร',
    lead: [
      'งานวางระบบไม่มีราคาเหมาตายตัว เพราะขอบเขตงานของแต่ละธุรกิจไม่เหมือนกันจริงๆ',
      'เราจึงประเมินราคาให้หลังคุยกันครั้งแรก โดยดูจากห้าเรื่องนี้',
    ],
    factors: [
      {
        n: '01',
        title: 'จำนวนระบบที่วาง',
        desc: 'เลือกวางเฉพาะระบบบัญชีบน Cloud หรือทำทั้งสามส่วนพร้อมกันทั้งบัญชี ระบบควบคุมภายใน และงานบุคคล',
      },
      {
        n: '02',
        title: 'สภาพระบบเดิมที่มีอยู่',
        desc: 'ธุรกิจที่ยังไม่มีระบบเลยกับธุรกิจที่มีระบบอยู่แล้วแต่ต้องรื้อปรับ ใช้เวลาในขั้น Audit & Analysis ไม่เท่ากัน',
      },
      {
        n: '03',
        title: 'จำนวนคนที่ต้องอบรม',
        desc: 'ขั้น Implement & Training คิดตามจำนวนผู้ใช้งานจริงในทีม ทีมสามคนกับทีมยี่สิบคนใช้เวลาต่างกันมาก',
      },
      {
        n: '04',
        title: 'จำนวนสาขาหรือหน้าร้าน',
        desc: 'การเชื่อมข้อมูลหน้าบ้านกับหลังบ้านหลายจุดต้องออกแบบ workflow เพิ่ม และทดสอบมากกว่าจุดเดียว',
      },
      {
        n: '05',
        title: 'ระยะเวลาดูแลต่อเนื่อง',
        desc: 'หลังติดตั้งเสร็จจะจบเป็นโครงการ หรือให้เราดูแลปรับจูนต่อในขั้น Support & Optimize ระยะยาว',
      },
    ],
    box: {
      title: 'คุยครั้งแรกฟรี ไม่มีข้อผูกมัด',
      desc: [
        'เราจะถามถึงลักษณะธุรกิจ จำนวนพนักงาน และวิธีทำงานปัจจุบันของคุณ แล้วสรุปกลับไปว่า',
        'ควรวางระบบส่วนไหนก่อน ใช้เวลาประมาณเท่าไร และค่าบริการอยู่ในช่วงไหน',
        'ถ้ายังไม่ใช่จังหวะที่เหมาะ เราจะบอกตรงๆ เช่นกัน',
      ],
      prepTitle: 'เตรียมข้อมูลสามอย่างนี้มา จะประเมินได้แม่นขึ้นมาก',
      prepItems: [
        'จำนวนพนักงานทั้งหมด และจำนวนคนที่จะต้องใช้ระบบจริง',
        'โปรแกรมหรือวิธีที่ใช้อยู่ตอนนี้ เช่น Excel สมุดเขียนมือ หรือโปรแกรมบัญชีเดิม',
        'จุดที่ปวดหัวที่สุดตอนนี้ เช่น ปิดยอดไม่ทัน สต็อกไม่ตรง หรือเงินเดือนคำนวณผิดบ่อย',
      ],
      cta: 'นัดหมายปรึกษาฟรี',
    },
  },
  faq: {
    title: 'คำถามที่พบบ่อยเรื่องวางระบบองค์กร',
    intro: 'สิ่งที่เจ้าของธุรกิจมักถามก่อนเริ่มโครงการวางระบบ',
    items: [
      {
        q: 'การวางระบบองค์กรกับ IC มีกี่ขั้นตอน',
        a: 'สี่ขั้นตอน เริ่มจาก Audit & Analysis สำรวจขั้นตอนการทำงานปัจจุบันและหาจุดที่ต้องปรับปรุง ต่อด้วย Design & Tools ออกแบบ workflow ใหม่และเลือกซอฟต์แวร์ที่เหมาะกับขนาดธุรกิจ จากนั้น Implement & Training ติดตั้งระบบจริงพร้อมอบรมทีมงาน และปิดท้ายด้วย Support & Optimize ที่ติดตามผลและปรับแต่งระบบต่อเนื่อง',
      },
      {
        q: 'บริการนี้ครอบคลุมระบบอะไรบ้าง',
        a: 'สามส่วนหลัก ได้แก่ ระบบบัญชีและภาษีบน Cloud ที่เชื่อมหน้าบ้านกับหลังบ้านเข้าด้วยกัน ระบบควบคุมภายในที่ออกแบบผังการอนุมัติและการเช็คสต็อกสินค้า และระบบงานบุคคลและเงินเดือนตั้งแต่การลงเวลาทำงานจนถึงการยื่นประกันสังคม',
      },
      {
        q: 'ใช้โปรแกรมบัญชีตัวไหน',
        a: 'วางรากฐานการบันทึกบัญชีผ่านโปรแกรมบัญชีออนไลน์ (Cloud) ซึ่งเชื่อมโยงข้อมูลหน้าบ้านและหลังบ้านเข้าด้วยกัน ทำให้เจ้าของธุรกิจดูข้อมูลการเงินได้แบบ real-time',
      },
      {
        q: 'ทำไมหน้านี้ไม่บอกราคาเหมือนบริการอื่น',
        a: 'เพราะขอบเขตงานวางระบบต่างกันจริงตามแต่ละธุรกิจ ราคาเหมาตายตัวจะกลายเป็นการให้ข้อมูลที่ผิดกับคนส่วนใหญ่ เราจึงบอกตัวแปรที่กำหนดราคาไว้บนหน้านี้แทน คือจำนวนระบบที่วาง สภาพระบบเดิม จำนวนคนที่ต้องอบรม จำนวนสาขา และระยะเวลาดูแลต่อเนื่อง แล้วประเมินราคาให้หลังคุยกันครั้งแรก',
      },
      {
        q: 'ต้องเตรียมอะไรมาบ้างก่อนคุยเรื่องราคา',
        a: 'สามอย่างคือจำนวนพนักงานทั้งหมดและจำนวนคนที่จะใช้ระบบจริง โปรแกรมหรือวิธีทำงานที่ใช้อยู่ตอนนี้ และจุดที่เป็นปัญหามากที่สุดในปัจจุบัน เท่านี้เราประเมินขอบเขตและช่วงราคาให้ได้ในการคุยครั้งเดียว',
      },
      {
        q: 'วางระบบแล้วธุรกิจได้อะไรที่จับต้องได้',
        a: 'ลดเวลางานเอกสารที่ซ้ำซ้อน เข้าถึงข้อมูลการเงินแบบ real-time ลดความเสี่ยงจากความผิดพลาดของคน ได้รายงานทางการเงินที่แม่นยำและทันเวลา และได้ระบบที่ scale ตามการเติบโตของธุรกิจได้',
      },
    ],
  },
};

const en: OrganizationContent = {
  htmlLang: 'en',
  meta: {
    title: 'Business Systems and Digital Accounting Setup in Chiang Mai | IC Accounting',
    description:
      'Accounting and business system setup for companies in Chiang Mai: cloud accounting, internal controls, and HR and payroll. We review how you work on site, install the system, train your team and keep supporting you. Free consultation.',
  },
  schema: {
    name: 'Accounting and Business System Setup in Chiang Mai',
    description:
      'Setup of cloud accounting and tax systems, internal controls, and HR and payroll systems for businesses in Chiang Mai, from reviewing your current workflow and designing a new one to installation, staff training and long-term follow-up.',
    crumbHome: 'Home',
    crumbCurrent: 'Organization System Setup',
  },
  crumb: { home: 'Home', homeHref: '/en', current: 'Organization System' },
  hero: {
    eyebrow: 'Organization System',
    h1Line1: 'Business Systems',
    h1Line2: 'and Digital Accounting',
    lead: 'Take your business further with accurate management systems. Cut duplicated work, see your data in real time, and turn "paperwork" into "strategy".',
    chips: ['Cloud-based systems', 'Real-time Data', 'Less manual work', 'Support after setup'],
  },
  solutions: {
    eyebrow: 'Solutions',
    title: 'Solutions for better management',
    sublead: 'Systems designed for SMEs in the digital age',
    items: [
      {
        icon: 'chart',
        title: 'Cloud accounting and tax system',
        desc: 'We build your bookkeeping on online (cloud) accounting software that connects your front office and back office smoothly.',
        tag: 'Cloud Accounting',
      },
      {
        icon: 'shield',
        title: 'Internal control system',
        desc: 'We design approval flows and stock checks to prevent mistakes and fraud.',
        tag: 'Internal Control',
      },
      {
        icon: 'users',
        title: 'HR and payroll system',
        desc: 'We organize your HR work, from time recording through to payroll and automatic social security filing.',
        tag: 'HR & Payroll',
      },
    ],
  },
  benefits: {
    eyebrow: 'Benefits',
    title: 'What does your business get?',
    lead: 'When your back office is solid, you have time to focus on what really matters — growing your business.',
    items: [
      'Less time spent on duplicated paperwork',
      'Real-time access to financial data',
      'Lower risk of human error',
      'Systems that scale as your business grows',
      'An easier, more efficient way of working for your team',
      'Accurate and timely financial reports',
    ],
    card: {
      eyebrow: 'Powered by',
      title: 'Systems built on online accounting software',
      desc: 'We set up our clients’ accounting on online accounting software that brings accounting, tax and finance together in one place, so business owners can check their own numbers without waiting for the month-end report.',
      features: ['Real-time dashboard', 'Electronic tax invoices', 'Connects to e-Tax Invoice', 'Automatic financial reports'],
      cta: 'Ask for details',
    },
  },
  process: {
    eyebrow: 'Process',
    title: 'How we build your system together',
    sublead: '4 steps designed to make it as smooth as possible',
    stepLabel: 'Step',
    items: [
      { step: '01', title: 'Audit & Analysis', desc: 'We review how you work today and find the areas that need improvement (pain points).' },
      { step: '02', title: 'Design & Tools', desc: 'We design a new workflow and choose software that suits the size of your business.' },
      { step: '03', title: 'Implement & Training', desc: 'We install the system for real and train your team to use it with confidence.' },
      { step: '04', title: 'Support & Optimize', desc: 'We follow up and fine-tune the system to keep it as stable as possible for long-term growth.' },
    ],
  },
  cta: {
    h3: 'Ready to upgrade your back office?',
    p: 'Talk to the IC team for free. We’ll look at your pain points and recommend the system that best fits your business.',
    btnQuote: 'Book a free consultation',
    btnLine: 'Contact us on LINE',
  },
  pricing: {
    eyebrow: 'Pricing',
    title: 'How we price a system setup',
    lead: [
      'System setup has no fixed package price, because the scope really is different for every business.',
      'We give you a price after our first conversation, based on these five things.',
    ],
    factors: [
      {
        n: '01',
        title: 'Number of systems',
        desc: 'Set up only the cloud accounting system, or all three parts together: accounting, internal controls and HR.',
      },
      {
        n: '02',
        title: 'Your current systems',
        desc: 'A business with no system yet and one that has a system that needs reworking take different amounts of time in the Audit & Analysis step.',
      },
      {
        n: '03',
        title: 'Number of people to train',
        desc: 'The Implement & Training step depends on how many people in your team will actually use the system. A team of three and a team of twenty take very different amounts of time.',
      },
      {
        n: '04',
        title: 'Number of branches or shops',
        desc: 'Connecting front-office and back-office data across several locations needs more workflow design and more testing than a single location.',
      },
      {
        n: '05',
        title: 'Length of ongoing support',
        desc: 'Whether the work ends as a project once installation is done, or we keep fine-tuning the system for you over the long term in the Support & Optimize step.',
      },
    ],
    box: {
      title: 'The first conversation is free, with no commitment',
      desc: [
        'We’ll ask about your type of business, number of staff and how you work today, then tell you',
        'which part of the system to set up first, roughly how long it will take, and what price range to expect.',
        'If the timing isn’t right yet, we’ll tell you that honestly too.',
      ],
      prepTitle: 'Bring these three things and we can give you a much more accurate estimate',
      prepItems: [
        'Your total number of employees, and how many people will actually use the system',
        'The software or method you use now, such as Excel, handwritten ledgers or your current accounting software',
        'Your biggest headache right now, such as closing the books late, stock that doesn’t match, or frequent payroll errors',
      ],
      cta: 'Book a free consultation',
    },
  },
  faq: {
    title: 'Frequently asked questions about system setup',
    intro: 'What business owners usually ask before starting a system setup project.',
    items: [
      {
        q: 'How many steps does a system setup with IC involve?',
        a: 'Four. It starts with Audit & Analysis, where we review how you work today and find what needs improving. Next is Design & Tools, where we design a new workflow and choose software that suits the size of your business. Then Implement & Training, where we install the system and train your team. Finally, Support & Optimize, where we follow up and keep fine-tuning the system.',
      },
      {
        q: 'Which systems does this service cover?',
        a: 'Three main areas: a cloud accounting and tax system that connects your front office and back office, an internal control system with approval flows and stock checks, and an HR and payroll system covering everything from time recording to social security filing.',
      },
      {
        q: 'Which accounting software do you use?',
        a: 'We build your bookkeeping on online (cloud) accounting software that connects front-office and back-office data, so business owners can see their financial data in real time.',
      },
      {
        q: 'Why doesn’t this page show a price like your other services?',
        a: 'Because the scope of a system setup genuinely differs from business to business, and a fixed package price would be misleading for most people. Instead, this page lists the factors that determine the price: the number of systems, the state of your current systems, the number of people to train, the number of branches, and how long you want ongoing support. We then give you a price after our first conversation.',
      },
      {
        q: 'What should I prepare before we talk about price?',
        a: 'Three things: your total number of employees and how many will actually use the system, the software or way of working you use now, and your biggest problem at the moment. With that, we can estimate the scope and price range in a single conversation.',
      },
      {
        q: 'What tangible benefits does my business get from a system setup?',
        a: 'Less time spent on duplicated paperwork, real-time access to financial data, lower risk of human error, accurate and timely financial reports, and a system that can scale as your business grows.',
      },
    ],
  },
  related: {
    title: 'Further reading (articles in Thai)',
    intro: 'Articles by the IC team, written from real client cases in Chiang Mai. Available in Thai only.',
    readLabel: 'Read article (Thai)',
  },
};

export const organizationContent = { th, en } as const;
