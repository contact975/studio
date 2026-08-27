import type { Faq } from '@/lib/seo';

/**
 * ราคาทุกตัวตรงกับบล็อก Services & Pricing ที่แสดงอยู่บนหน้าเว็บ
 * ตัว <ServiceFaq /> ถูกวางไว้ใน media-client.tsx ก่อน Footer
 * เพราะไฟล์นั้นเป็นตัวที่ render Header/Footer เอง
 *
 * แยกออกมาจาก page.tsx เพราะ Next ไม่อนุญาตให้ไฟล์ route export ตัวแปรอื่น
 * (TS2344 แบบเดียวกับที่เคยเจอตอนย้าย blogMeta)
 */
export const mediaFaqs: Faq[] = [
  {
    q: 'ราคางานมีเดียเริ่มต้นเท่าไหร่',
    a: 'Artwork และ Graphic Design เริ่มต้น 2,000 บาท Ads Motion เริ่มต้น 3,500 บาท Video Content เริ่มต้น 6,000 บาท และ Motion Video ระดับ Cinematic เริ่มต้น 8,000 บาท ทั้งหมดเป็นราคาเริ่มต้น สอบถามรายละเอียดเพื่อรับใบเสนอราคาที่แน่นอนได้',
  },
  {
    q: 'มีบริการอะไรบ้าง',
    a: 'ห้าบริการ ได้แก่ Artwork และ Graphic Design สำหรับ Key Visual โปสเตอร์และ Content Graphic, Ads Motion สำหรับโฆษณา, Video Content ตั้งแต่ Reels จนถึง Brand Film, Motion Video ระดับ Cinematic ที่ผสมการถ่ายทำกับ VFX และ Media Consult ที่ให้คำปรึกษาด้านกลยุทธ์',
  },
  {
    q: 'ปรึกษาก่อนตัดสินใจได้ไหม',
    a: 'ได้ Media Consult เป็นบริการฟรี ครอบคลุมการวาง Media Strategy กำหนด Mood และ Tone ของแบรนด์ และวางแผน Content Calendar ให้ตรงกลุ่มเป้าหมาย',
  },
];
