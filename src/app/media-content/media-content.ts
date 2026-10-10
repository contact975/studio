import type { Faq } from '@/lib/seo';

/**
 * เนื้อหาหน้า Exclusive Media Production ทั้งสองภาษา
 *
 * หน้าไทย /media-content และหน้าอังกฤษ /en/media-content ใช้ media-client.tsx ตัวเดียวกัน
 * ดีไซน์และลำดับหัวข้อจึงต่างกันไม่ได้ ต่างแค่ข้อความในไฟล์นี้
 * type บังคับให้ทั้งสองภาษามีคีย์ครบเท่ากัน ลืมแปลตรงไหนจะ build ไม่ผ่าน
 *
 * ── ตัวเลขอยู่ที่ไฟล์นี้ที่เดียว ──
 * ราคาอยู่ใน MEDIA_SERVICES ใช้ทั้งการ์ดราคา คำตอบ FAQ และ offers ใน JSON-LD ของทั้งสองภาษา
 * เดิม FAQ และ JSON-LD พิมพ์ราคาซ้ำไว้เอง ปรับราคาแล้วลืมแก้จุดใดจุดหนึ่งจะขัดกันในหน้าเดียว
 *
 * ทุกอย่างที่ส่งเข้า media-client.tsx ต้องเป็นข้อมูลล้วน (ไม่มีฟังก์ชัน)
 * เพราะส่งข้ามจาก server component ไป client component
 */

export const LINE_URL = 'https://line.me/R/ti/p/@icacc';

export type ServiceKey = 'artwork' | 'ads' | 'video' | 'motion' | 'consult';

/** ชื่อบริการ ป้าย และรูป เป็นภาษาอังกฤษอยู่แล้วทั้งสองหน้า จึงเก็บไว้ชุดเดียว price = null คือบริการฟรี */
export const MEDIA_SERVICES: {
  key: ServiceKey;
  id: string;
  name: string;
  alt: string;
  tag: string;
  price: number | null;
  image: string;
}[] = [
  {
    key: 'artwork',
    id: '01',
    name: 'Art Work &\nGraphic Design',
    alt: 'Artwork & Graphic',
    tag: 'Graphic Design',
    price: 2000,
    image: 'https://firebasestorage.googleapis.com/v0/b/studio-3153056778-cc8e4.firebasestorage.app/o/Media%20Content%2Fic-accounting-team-chiangmai-media.jpg?alt=media&token=0acfec2c-4186-4e55-aec4-3b730140f6c5',
  },
  {
    key: 'ads',
    id: '02',
    name: 'Ads Motion',
    alt: 'Motion Graphics',
    tag: 'Motion',
    price: 3500,
    image: 'https://firebasestorage.googleapis.com/v0/b/studio-3153056778-cc8e4.firebasestorage.app/o/Media%20Content%2Fic-accounting-team-chiangmai-motion.jpg?alt=media&token=deee7aa9-0bac-4909-acfb-db668ec4a01d',
  },
  {
    key: 'video',
    id: '03',
    name: 'Video\nContent',
    alt: 'Video Production',
    tag: 'Video',
    price: 6000,
    image: 'https://firebasestorage.googleapis.com/v0/b/studio-3153056778-cc8e4.firebasestorage.app/o/Media%20Content%2Fic-accounting-team-chiangmai-media%202.jpg?alt=media&token=8ae6f303-738a-40c9-ad64-c3dcc840141d',
  },
  {
    key: 'motion',
    id: '04',
    name: 'Motion\nVideo',
    alt: 'Cinematic Motion',
    tag: 'Cinematic',
    price: 8000,
    image: 'https://firebasestorage.googleapis.com/v0/b/studio-3153056778-cc8e4.firebasestorage.app/o/Media%20Content%2Fic-accounting-team-chiangmai-media%203.jpg?alt=media&token=5ab6ad45-a7e5-4e3e-b042-467fb4d667db',
  },
  {
    key: 'consult',
    id: '05',
    name: 'Media\nConsult',
    alt: 'Strategy Consulting',
    tag: 'Consulting',
    price: null,
    image: 'https://firebasestorage.googleapis.com/v0/b/studio-3153056778-cc8e4.firebasestorage.app/o/Media%20Content%2Fic-accounting-team-chiangmai.jpg?alt=media&token=2c10c1eb-07f5-4de0-8488-d75d85c09494',
  },
];

/** ราคาของบริการตาม key ใช้ใน FAQ และ JSON-LD */
const price = (key: ServiceKey) => MEDIA_SERVICES.find((s) => s.key === key)!.price ?? 0;

/** 2000 → "2,000" เขียนเองแทน toLocaleString เพื่อให้ผลตรงกันทั้งฝั่ง server และ browser */
export function formatPrice(n: number): string {
  return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

const p = (key: ServiceKey) => formatPrice(price(key));

/** offers ของ JSON-LD — ชื่อบริการเป็นภาษาอังกฤษเหมือนกันทั้งสองภาษา */
export const MEDIA_OFFERS = [
  { name: 'Artwork & Graphic Design', price: String(price('artwork')) },
  { name: 'Ads Motion', price: String(price('ads')) },
  { name: 'Video Content', price: String(price('video')) },
  { name: 'Motion Video (Cinematic)', price: String(price('motion')) },
];

export const CLIENTS = [
  'SURR Bar', "Smash Daddy's", 'Art Mai Gallery Hotel',
  'Jarid Thai Food', 'La.moon', 'Into You Clinic',
  'CAMP', 'Carebeau', 'Apex Foods', 'The Meka Property',
  'Yoskarn', 'Twitamins',
];

export type HeroStatKey = 'brands' | 'engagement' | 'projects' | 'services';
export const HERO_STATS: { key: HeroStatKey; num: string }[] = [
  { key: 'brands', num: '12+' },
  { key: 'engagement', num: '18.5K' },
  { key: 'projects', num: '50+' },
  { key: 'services', num: '5' },
];

export type ResultStatKey = 'views' | 'engagement' | 'reach' | 'interactions';
export const RESULT_STATS: { key: ResultStatKey; num: string }[] = [
  { key: 'views', num: '18.5K' },
  { key: 'engagement', num: '12.2K' },
  { key: 'reach', num: '14.9K' },
  { key: 'interactions', num: '10.4K' },
];

/** ป้ายผลงานเป็นภาษาอังกฤษอยู่แล้วทั้งสองหน้า */
export const PORTFOLIO = [
  { label: 'Post Ads Content', img: 'https://firebasestorage.googleapis.com/v0/b/studio-3153056778-cc8e4.firebasestorage.app/o/Media%20Content%2Fic-accounting-team-chiangmai-media.jpg?alt=media&token=0acfec2c-4186-4e55-aec4-3b730140f6c5', span: 'col-span-1 row-span-2' },
  { label: 'Video Content', img: 'https://firebasestorage.googleapis.com/v0/b/studio-3153056778-cc8e4.firebasestorage.app/o/Media%20Content%2Fic-accounting-team-chiangmai-media%202.jpg?alt=media&token=8ae6f303-738a-40c9-ad64-c3dcc840141d', span: 'col-span-1' },
  { label: 'Photo Content', img: 'https://firebasestorage.googleapis.com/v0/b/studio-3153056778-cc8e4.firebasestorage.app/o/Media%20Content%2Fic-accounting-team-chiangmai-media%204.jpg?alt=media&token=0595006f-05e3-4826-b8af-0c761c30c245', span: 'col-span-1' },
  { label: 'Motion Media', img: 'https://firebasestorage.googleapis.com/v0/b/studio-3153056778-cc8e4.firebasestorage.app/o/Media%20Content%2Fic-accounting-team-chiangmai-motion.jpg?alt=media&token=deee7aa9-0bac-4909-acfb-db668ec4a01d', span: 'col-span-2' },
];

export type MediaContent = {
  htmlLang: string;
  meta: { title: string; description: string; ogDescription: string };
  schema: { name: string; description: string; home: string; current: string };
  hero: {
    /** สองท่อน คั่นด้วย <br> ที่แสดงเฉพาะจอ md ขึ้นไป */
    lead: [string, string];
    ctaStart: string;
    ctaShowreel: string;
    stats: Record<HeroStatKey, string>;
  };
  showreel: { intro: string };
  services: {
    eyebrow: string;
    sublead: string;
    startingAt: string;
    startingPrice: string;
    free: string;
    ask: string;
    desc: Record<ServiceKey, string>;
  };
  portfolio: { eyebrow: string; viewAll: string };
  differences: {
    eyebrow: string;
    title: string;
    sublead: string;
    generic: { label: string; items: string[] };
    ic: { label: string; items: string[] };
  };
  process: { eyebrow: string; items: { num: string; title: string; desc: string }[] };
  clients: { eyebrow: string; stats: Record<ResultStatKey, string> };
  cta: { eyebrow: string; title: [string, string]; lead: string; talk: string; portfolio: string };
  faq: { title: string; intro: string; items: Faq[] };
};

const th: MediaContent = {
  htmlLang: 'th',
  meta: {
    title: 'รับผลิต Media Content เชียงใหม่ | IC Accounting',
    description: 'บริการผลิตวิดีโอ Motion Graphics และกราฟิกคุณภาพสูงในเชียงใหม่ สร้างภาพลักษณ์แบรนด์ให้น่าเชื่อถือและมีตัวตนบนโลกออนไลน์',
    ogDescription: 'บริการผลิตวิดีโอ Motion Graphics และกราฟิกคุณภาพสูงในเชียงใหม่',
  },
  schema: {
    name: 'บริการผลิต Media Content เชียงใหม่',
    description:
      'ผลิตวิดีโอ Motion Graphics และงานกราฟิกสำหรับแบรนด์ในเชียงใหม่ ตั้งแต่ Key Visual และ Content Graphic ไปจนถึง Brand Film และงาน Cinematic ที่ผสมการถ่ายทำกับ VFX',
    home: 'หน้าแรก',
    current: 'บริการ Media Content',
  },
  hero: {
    lead: [
      'ไม่ใช่แค่คนทำคอนเทนต์ — เราคือผู้สร้างภาพลักษณ์ระดับพรีเมียม ',
      ' ด้วยมาตรฐานโปรดัคชั่นที่เปลี่ยนวิสัยทัศน์ให้กลายเป็นความจริง',
    ],
    ctaStart: 'เริ่มต้นโปรเจคของคุณ',
    ctaShowreel: 'ดู Showreel',
    stats: {
      brands: 'แบรนด์ที่ดูแลอยู่',
      engagement: 'Engagement สูงสุด',
      projects: 'โปรเจคที่ผ่านมา',
      services: 'ประเภทบริการ',
    },
  },
  showreel: { intro: 'ตัวอย่างงานที่เราภูมิใจ นำเสนอผ่านทุกรูปแบบของ Media Production' },
  services: {
    eyebrow: 'บริการของเรา',
    sublead: 'ราคาเริ่มต้น — สอบถามรายละเอียดเพิ่มเติมเพื่อรับใบเสนอราคา',
    startingAt: 'เริ่มต้นที่',
    startingPrice: 'ราคาเริ่มต้น',
    free: 'ฟรี',
    ask: 'สอบถามราคา',
    desc: {
      artwork: 'ออกแบบ Key Visual, โปสเตอร์, Content Graphic สำหรับทุกช่องทางออนไลน์ ให้แบรนด์มีเอกลักษณ์ที่ชัดเจนและดูแพงในทุกงาน',
      ads: 'สร้าง Motion Graphic สำหรับโฆษณาที่ดึงดูดสายตา เพิ่ม Engagement และทำให้แบรนด์โดดเด่นกว่าคู่แข่ง',
      video: 'ถ่ายทำวิดีโอคุณภาพสูง ตั้งแต่ Reels, โฆษณาสินค้า ไปจนถึง Brand Film ที่เล่าเรื่องราวของแบรนด์ได้อย่างทรงพลัง',
      motion: 'งาน Motion Video ระดับ Cinematic ผสมผสานการถ่ายทำและ VFX เพื่อยกระดับภาพลักษณ์แบรนด์ให้ดูพรีเมียมในระดับเดียวกับแบรนด์ระดับโลก',
      consult: 'ให้คำปรึกษาด้าน Media Strategy วาง Mood & Tone ของแบรนด์ และวางแผน Content Calendar ให้ตรงกลุ่มเป้าหมาย',
    },
  },
  portfolio: { eyebrow: 'ผลงาน', viewAll: 'ดูผลงานทั้งหมด' },
  differences: {
    eyebrow: 'ความแตกต่าง',
    title: 'ทำไมต้องเลือก Production Quality?',
    sublead: 'ความแตกต่างระหว่างคอนเทนต์ทั่วไปกับงานแบบโปรดัคชั่น',
    generic: { label: 'คอนเทนต์ทั่วไป', items: ['ถ่ายเร็ว ง่าย แต่ขาดคุณภาพ', 'ไม่มีทิศทางของแบรนด์', 'ไม่สร้างภาพลักษณ์'] },
    ic: { label: 'IC Production', items: ['วางแผนอย่างเป็นระบบ', 'มีการจัดแสงแบบสตูดิโอ', 'Mood & Tone เดียวกันทุกชิ้น', 'ยกระดับแบรนด์ให้ดูพรีเมียม'] },
  },
  process: {
    eyebrow: 'กระบวนการ',
    items: [
      { num: '01', title: 'Brief & Consult', desc: 'รับโจทย์ เข้าใจแบรนด์ และวาง Mood & Tone ก่อนเริ่มงานจริง' },
      { num: '02', title: 'Concept & Planning', desc: 'พัฒนา Concept วาง Storyboard และ Moodboard ให้เห็นภาพชัดเจน' },
      { num: '03', title: 'Production', desc: 'ลงมือผลิตด้วยทีมงานมืออาชีพ กล้อง ไฟ กราฟิก และ Motion' },
      { num: '04', title: 'Deliver & Revise', desc: 'ส่งงานพร้อม Revision จนกว่าจะพอใจ 100%' },
    ],
  },
  clients: {
    eyebrow: 'ลูกค้าของเรา',
    stats: { views: 'Views สูงสุด', engagement: 'Engagement', reach: 'Reach', interactions: 'Interactions' },
  },
  cta: {
    eyebrow: 'เริ่มต้นวันนี้',
    title: ['พร้อมยกระดับ', 'แบรนด์ของคุณ?'],
    lead: 'ปรึกษาฟรี ไม่มีค่าใช้จ่าย ทีมงาน IC Production พร้อมรับโจทย์ของคุณทุกวัน',
    talk: 'คุยกับทีมงาน',
    portfolio: 'ดูพอร์ตฟอลิโอ',
  },
  faq: {
    title: 'คำถามที่พบบ่อยเรื่องงานมีเดีย',
    intro: 'ราคาและขอบเขตงานที่ลูกค้าถามบ่อยที่สุดก่อนเริ่มโปรเจกต์',
    items: [
      {
        q: 'ราคางานมีเดียเริ่มต้นเท่าไหร่',
        a: `Artwork และ Graphic Design เริ่มต้น ${p('artwork')} บาท Ads Motion เริ่มต้น ${p('ads')} บาท Video Content เริ่มต้น ${p('video')} บาท และ Motion Video ระดับ Cinematic เริ่มต้น ${p('motion')} บาท ทั้งหมดเป็นราคาเริ่มต้น สอบถามรายละเอียดเพื่อรับใบเสนอราคาที่แน่นอนได้`,
      },
      {
        q: 'มีบริการอะไรบ้าง',
        a: 'ห้าบริการ ได้แก่ Artwork และ Graphic Design สำหรับ Key Visual โปสเตอร์และ Content Graphic, Ads Motion สำหรับโฆษณา, Video Content ตั้งแต่ Reels จนถึง Brand Film, Motion Video ระดับ Cinematic ที่ผสมการถ่ายทำกับ VFX และ Media Consult ที่ให้คำปรึกษาด้านกลยุทธ์',
      },
      {
        q: 'ปรึกษาก่อนตัดสินใจได้ไหม',
        a: 'ได้ Media Consult เป็นบริการฟรี ครอบคลุมการวาง Media Strategy กำหนด Mood และ Tone ของแบรนด์ และวางแผน Content Calendar ให้ตรงกลุ่มเป้าหมาย',
      },
    ],
  },
};

const en: MediaContent = {
  htmlLang: 'en',
  meta: {
    title: 'Media Content Production in Chiang Mai | IC Accounting',
    description: 'Video, motion graphics and high-quality graphic design in Chiang Mai. Build a brand image that looks credible and stands out online.',
    ogDescription: 'Video, motion graphics and high-quality graphic design in Chiang Mai',
  },
  schema: {
    name: 'Media Content Production in Chiang Mai',
    description:
      'Video, motion graphics and graphic design for brands in Chiang Mai, from key visuals and content graphics to brand films and cinematic work that combines live filming with VFX.',
    home: 'Home',
    current: 'Media Content Services',
  },
  hero: {
    lead: [
      'Not just content makers — we build premium brand images ',
      ' with production standards that turn your vision into reality.',
    ],
    ctaStart: 'Start your project',
    ctaShowreel: 'Watch the showreel',
    stats: {
      brands: 'Brands we work with',
      engagement: 'Peak engagement',
      projects: 'Past projects',
      services: 'Service types',
    },
  },
  showreel: { intro: 'Work we are proud of, across every kind of media production' },
  services: {
    eyebrow: 'Our services',
    sublead: 'Starting prices — contact us for details and a quotation',
    startingAt: 'Starting at',
    startingPrice: 'Starting price',
    free: 'Free',
    ask: 'Ask for a price',
    desc: {
      artwork: 'Key visuals, posters and content graphics for every online channel, so your brand has a clear identity and looks premium in every piece.',
      ads: 'Eye-catching motion graphics for ads that lift engagement and help your brand stand out from competitors.',
      video: 'High-quality video, from Reels and product ads to brand films that tell your brand’s story with impact.',
      motion: 'Cinematic motion video that combines live filming and VFX to give your brand a premium look on par with global brands.',
      consult: 'Advice on media strategy, setting your brand’s mood & tone, and planning a content calendar that fits your target audience.',
    },
  },
  portfolio: { eyebrow: 'Our work', viewAll: 'See all our work' },
  differences: {
    eyebrow: 'The difference',
    title: 'Why choose production quality?',
    sublead: 'How everyday content compares with production-grade work',
    generic: { label: 'Everyday content', items: ['Quick and easy, but low quality', 'No brand direction', 'Does not build your image'] },
    ic: { label: 'IC Production', items: ['Planned systematically', 'Studio-style lighting', 'The same mood & tone in every piece', 'Lifts your brand to a premium look'] },
  },
  process: {
    eyebrow: 'Our process',
    items: [
      { num: '01', title: 'Brief & Consult', desc: 'We take your brief, get to know your brand and set the mood & tone before any real work starts.' },
      { num: '02', title: 'Concept & Planning', desc: 'We develop the concept and lay out a storyboard and moodboard so you can see the plan clearly.' },
      { num: '03', title: 'Production', desc: 'A professional team produces the work: camera, lighting, graphics and motion.' },
      { num: '04', title: 'Deliver & Revise', desc: 'We deliver with revisions until you are 100% satisfied.' },
    ],
  },
  clients: {
    eyebrow: 'Our clients',
    stats: { views: 'Peak views', engagement: 'Engagement', reach: 'Reach', interactions: 'Interactions' },
  },
  cta: {
    eyebrow: 'Start today',
    title: ['Ready to elevate', 'your brand?'],
    lead: 'Free consultation, no charge. The IC Production team is ready to take on your brief any day.',
    talk: 'Talk to our team',
    portfolio: 'View portfolio',
  },
  faq: {
    title: 'Media production FAQ',
    intro: 'The pricing and scope questions clients ask most before starting a project',
    items: [
      {
        q: 'What are your starting prices for media work?',
        a: `Artwork and graphic design start at ${p('artwork')} baht, Ads Motion at ${p('ads')} baht, Video Content at ${p('video')} baht and cinematic Motion Video at ${p('motion')} baht. These are all starting prices; contact us with details for an exact quotation.`,
      },
      {
        q: 'What services do you offer?',
        a: 'Five services: Artwork and Graphic Design for key visuals, posters and content graphics; Ads Motion for advertising; Video Content from Reels to brand films; cinematic Motion Video that combines live filming with VFX; and Media Consult for strategy advice.',
      },
      {
        q: 'Can I get advice before deciding?',
        a: 'Yes. Media Consult is free. It covers your media strategy, your brand’s mood and tone, and a content calendar planned around your target audience.',
      },
    ],
  },
};

export const mediaContent = { th, en };
