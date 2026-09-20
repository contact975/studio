/**
 * สร้างภาพปกบทความทั้งหมดใน public/images/blog/
 *
 *   node scripts/generate-blog-covers.mjs
 *
 * ทำไมถึงเจนเองแทนรูปสต็อก
 *   - รูปเดิมเป็น JPG 360–440 KB จาก Firebase Storage และรูป Unsplash แบบ hotlink
 *     ซึ่ง next/image ต้องดึงข้ามโดเมนก่อนย่อทุกครั้งที่ cache หมด และรูป Unsplash หายได้ทุกเมื่อ
 *   - ภาพปกแบบแบรนด์ (ไล่สีน้ำเงิน CI + ไอคอน lucide ตัวเดียวกับที่ใช้ในเว็บ + หัวข้อสั้น)
 *     ได้ WebP ราว 20–40 KB ต่อรูป โหลดจากโดเมนเราเอง และหน้ารวมบทความดูเป็นชุดเดียวกัน
 *
 * ออก 2 ไฟล์ต่อบทความ: .webp สำหรับในหน้าเว็บ และ .jpg สำหรับ og:image
 * (Facebook/LINE ยังอ่าน WebP ไม่ครบทุกที่)
 *
 * เพิ่มบทความใหม่: เพิ่ม 1 แถวใน COVERS แล้วรันสคริปต์นี้ซ้ำ
 */
import { readFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(ROOT, 'public', 'images', 'blog');
const ICON_DIR = path.join(ROOT, 'node_modules', 'lucide-react', 'dist', 'esm', 'icons');

const W = 1200;
const H = 675;

// ฟอนต์: เว็บใช้ Kanit (โหลดจาก Google ตอน build ไม่มีไฟล์ในเครื่อง)
// Leelawadee UI เป็นฟอนต์ไทยของ Windows ที่หน้าตาใกล้เคียงและติดเครื่องอยู่แล้ว
const FONT = "'Kanit', 'Leelawadee UI', 'Leelawadee', 'Segoe UI', sans-serif";

/** slug → ไอคอน + หัวข้อสั้น 2 บรรทัด + หมวด (หมวดเก็บไว้เป็นข้อมูล ไม่ได้วาดลงรูป) */
const COVERS = [
  ['tax-document-preparation-tips', 'file-check', 'เตรียมเอกสารภาษี', '5 เคล็ดลับสำหรับ SME มือใหม่', 'ภาษีธุรกิจ'],
  ['company-vs-partnership-comparison', 'scale', 'บริษัทจำกัด vs ห้างหุ้นส่วน', 'เลือกแบบไหนดี', 'จดทะเบียนธุรกิจ'],
  ['5-common-accounting-mistakes-sme-chiangmai', 'triangle-alert', 'ปิดงบการเงิน', '5 ข้อผิดพลาดที่พบบ่อย', 'ภาษีธุรกิจ'],
  ['sme-chiang-mai-accounting-guide', 'book-open', 'คู่มือบัญชีและภาษี', 'ฉบับ SME เชียงใหม่', 'ภาษีธุรกิจ'],
  ['tax-guide-chiang-mai-restaurants', 'utensils-crossed', 'ภาษีร้านอาหารและคาเฟ่', 'ต้องจัดการอย่างไร', 'ภาษีธุรกิจ'],
  ['pool-villa-tax-guide-chiang-mai', 'waves', 'เปิดเช่า Pool Villa', 'ต้องเสียภาษีอะไรบ้าง', 'ภาษีธุรกิจ'],
  ['accounting-fee-chiangmai', 'calculator', 'ค่าทำบัญชีเชียงใหม่', 'ราคาเท่าไหร่', 'บัญชีธุรกิจ'],
  ['company-registration-chiangmai', 'building-2', 'จดทะเบียนบริษัท', 'ขั้นตอน เอกสาร ค่าใช้จ่าย', 'จดทะเบียนธุรกิจ'],
  ['how-to-choose-accounting-office-chiangmai', 'clipboard-check', 'เลือกสำนักงานบัญชี', '5 เกณฑ์ที่ต้องดู', 'บัญชีธุรกิจ'],
  ['corporate-tax-chiangmai-guide', 'percent', 'ภาษีนิติบุคคล', 'เจ้าของธุรกิจต้องรู้', 'ภาษีธุรกิจ'],
  ['work-permit-chiangmai', 'id-card', 'Work Permit เชียงใหม่', 'ขั้นตอนและเอกสาร', 'Visa & Work Permit'],
  ['vat-registration-when-required', 'receipt', 'จด VAT เมื่อไหร่', 'รายได้ถึง 1.8 ล้านต้องทำอะไร', 'ภาษีธุรกิจ'],
  ['withholding-tax-guide-sme', 'hand-coins', 'ภาษีหัก ณ ที่จ่าย', '1% 2% 3% 5% ใช้ตอนไหน', 'ภาษีธุรกิจ'],
  ['director-salary-dividend-loan', 'wallet', 'เอาเงินออกจากบริษัท', 'เงินเดือน ปันผล หรือกู้ยืม', 'บัญชีธุรกิจ'],
  ['corporate-tax-calendar-thailand', 'calendar-days', 'ปฏิทินภาษีบริษัท', 'ยื่นอะไร เมื่อไหร่ ทั้งปี', 'ภาษีธุรกิจ'],
  ['deductible-expenses-sme', 'receipt-text', 'ค่าใช้จ่ายหักภาษีได้', 'แบบไหนโดนบวกกลับ', 'บัญชีธุรกิจ'],
];

/** อ่าน path ของไอคอนจาก lucide-react โดยตรง จะได้ตรงกับที่ใช้ในเว็บ 100% */
async function iconMarkup(name) {
  const src = await readFile(path.join(ICON_DIR, `${name}.js`), 'utf8');
  const m = src.match(/__iconNode = (\[[\s\S]*?\n\]);/);
  if (!m) throw new Error(`อ่านไอคอน ${name} ไม่ได้`);
  const nodes = new Function(`return ${m[1]}`)();
  return nodes
    .map(([tag, attrs]) => {
      const a = Object.entries(attrs)
        .filter(([k]) => k !== 'key')
        .map(([k, v]) => `${k}="${v}"`)
        .join(' ');
      return `<${tag} ${a}/>`;
    })
    .join('');
}

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function svgFor({ icon, line1, line2, category }) {
  // กล่องไอคอนซ้าย 300×300 ไอคอน 24 หน่วย → ขยาย 7 เท่า = 168px
  const box = 300;
  const bx = 96;
  const by = (H - box) / 2;
  const scale = 7;
  const ix = bx + (box - 24 * scale) / 2;
  const iy = by + (box - 24 * scale) / 2;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#1b346a"/>
      <stop offset="0.5" stop-color="#163674"/>
      <stop offset="1" stop-color="#0f1f43"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0" stop-color="#2657c1" stop-opacity="0.85"/>
      <stop offset="1" stop-color="#2657c1" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glow2" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0" stop-color="#93c5fd" stop-opacity="0.35"/>
      <stop offset="1" stop-color="#93c5fd" stop-opacity="0"/>
    </radialGradient>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M40 0H0V40" fill="none" stroke="#ffffff" stroke-opacity="0.07" stroke-width="1"/>
    </pattern>
    <linearGradient id="boxfill" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#ffffff" stop-opacity="0.16"/>
      <stop offset="1" stop-color="#ffffff" stop-opacity="0.05"/>
    </linearGradient>
  </defs>

  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <rect width="${W}" height="${H}" fill="url(#grid)"/>
  <circle cx="1010" cy="120" r="420" fill="url(#glow)"/>
  <circle cx="180" cy="620" r="320" fill="url(#glow2)"/>

  <!-- กล่องไอคอน -->
  <rect x="${bx}" y="${by}" width="${box}" height="${box}" rx="40" fill="url(#boxfill)" stroke="#ffffff" stroke-opacity="0.28" stroke-width="2"/>
  <g transform="translate(${ix} ${iy}) scale(${scale})" fill="none" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    ${icon}
  </g>

  <!-- ข้อความ -->
  <g font-family="${FONT}">
    <text x="470" y="238" font-size="24" font-weight="600" fill="#93c5fd" letter-spacing="4">IC ACCOUNTING &amp; SERVICE</text>
    <text x="470" y="320" font-size="60" font-weight="700" fill="#ffffff">${esc(line1)}</text>
    <text x="470" y="400" font-size="46" font-weight="500" fill="#dbe4ff">${esc(line2)}</text>

    <!-- ไม่ใส่ป้ายหมวดในรูป — การ์ดหน้ารวมและหัวบทความมี badge หมวดอยู่แล้ว -->

    <text x="${W - 72}" y="${H - 48}" font-size="22" fill="#ffffff" fill-opacity="0.55" text-anchor="end">icaccservice.com · บทความน่ารู้</text>
  </g>
</svg>`;
}

await mkdir(OUT, { recursive: true });
let total = 0;
for (const [slug, iconName, line1, line2, category] of COVERS) {
  const icon = await iconMarkup(iconName);
  const svg = Buffer.from(svgFor({ icon, line1, line2, category }));
  const webp = await sharp(svg).webp({ quality: 82 }).toFile(path.join(OUT, `${slug}.webp`));
  const jpg = await sharp(svg).jpeg({ quality: 84, mozjpeg: true }).toFile(path.join(OUT, `${slug}.jpg`));
  total += webp.size;
  console.log(`${slug.padEnd(44)} webp ${(webp.size / 1024).toFixed(0).padStart(3)} KB   jpg ${(jpg.size / 1024).toFixed(0).padStart(3)} KB`);
}
console.log(`\nรวม WebP ${COVERS.length} รูป = ${(total / 1024).toFixed(0)} KB`);
