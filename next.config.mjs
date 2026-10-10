/**
 * ⚠️ ไฟล์นี้เคยเป็น next.config.ts แล้วทำให้เว็บล่มเป็นช่วงๆ — อย่าเปลี่ยนกลับ
 *
 * next start อ่านไฟล์ config ตอนเซิร์ฟเวอร์บูต ถ้าไฟล์เป็น .ts
 * Next ต้องใช้ตัวแปล TypeScript ด้วย แต่ typescript อยู่ใน devDependencies
 * ซึ่งอิมเมจตอนรันจริงไม่ได้ติดตั้งไว้ Next เลยสั่ง npm install typescript
 * เองตอนบูต ใช้เวลา ~25 วินาที ระหว่างนั้นเซิร์ฟเวอร์ยังไม่รับคำขอ
 *
 * ผลคือทุกครั้งที่คอนเทนเนอร์เย็นแล้วมีคนเข้าเว็บ คำขอนั้นจะ timeout เป็น 503
 * และเพราะ maxInstances เป็น 1 กับทราฟฟิกไม่หนา คอนเทนเนอร์จึงเย็นบ่อยมาก
 * ลูกค้าที่เปิดเว็บเป็นคนแรกของช่วงจะเจอหน้าขาว
 *
 * ขนาดของปัญหาตอนที่เจอ (7 ต.ค. 2569): บรรทัด "Installing TypeScript"
 * ขึ้นในล็อก Cloud Run 1,018 ครั้งใน 30 วัน กระจายทุกวันตั้งแต่ 7 ก.ย.
 * และ Firebase รายงาน error 4.1 พันจาก 13 พันคำขอใน 7 วัน (เกือบ 1 ใน 3)
 * ไม่มีใครรู้มาก่อนเพราะคนที่เปิดเว็บซ้ำรอบสองจะเจอเครื่องที่อุ่นแล้ว เห็นปกติ
 *
 * เขียนเป็น .mjs จึงไม่ต้องแปลอะไรตอนบูต ส่วนชนิดข้อมูลยังได้จาก JSDoc
 * ข้างล่างนี้ เครื่องมือแก้โค้ดยังเตือนเวลาใส่ค่าผิดเหมือนเดิม
 *
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.icaccservice.com' }],
        destination: 'https://icaccservice.com/:path*',
        permanent: true,
      },
      {
        // ยุบหน้าบริการวีซ่าสองหน้าให้เหลือหน้าเดียว
        // /expat-services (อังกฤษ) + /visa-work-permit (ไทย) เป็นบริการเดียวกัน
        // แยกไว้ทำให้ Google ต้องเลือกหนึ่ง แล้วสัญญาณถูกแบ่งครึ่ง
        //
        // permanent: true = 308 ซึ่ง Google ถือว่าเท่ากับ 301
        // คือบอกว่า "ย้ายถาวร โอนอันดับไปหน้าปลายทางได้เลย"
        source: '/expat-services',
        destination: '/visa-work-permit',
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      {
        // เครื่องคำนวณภาษีเป็น HTML ล้วนที่วางไว้ใน public/
        // ไม่ได้แปลงเป็น React เพราะตรรกะคำนวณภาษีเขียนเสร็จและทดสอบมาแล้ว
        // การเขียนใหม่มีแต่ความเสี่ยงคำนวณผิด โดยไม่ได้อะไรเพิ่ม
        //
        // rewrite (ไม่ใช่ redirect) เพื่อให้ URL ที่คนเห็นและที่ Google เก็บ
        // เป็น /tax-calculator สะอาดๆ ไม่มี .html ห้อยท้าย
        source: '/tax-calculator',
        destination: '/tax-calculator.html',
      },
    ];
  },
  images: {
    // ตัด 2048 / 3840 ออก — ไม่มีรูปไหนในเว็บนี้ต้องใช้เกิน 1920
    // ค่านี้คือต้นตอของ ?w=3840 ที่เห็นใน DevTools (Next ใช้ค่าใหญ่สุดเป็น src fallback)
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // AVIF ลดขนาดไฟล์รูปถ่ายได้ ~30-50% เทียบ JPEG, WebP เป็น fallback
    formats: ['image/avif', 'image/webp'],
    // รูปจาก Firebase Storage ไม่เปลี่ยน — cache ยาวไปเลย
    minimumCacheTTL: 31536000,
    // จำเป็นตั้งแต่ Next 16: quality ที่ไม่ประกาศไว้จะใช้ไม่ได้
    // 70 = logo, 72 = รูป Behind the Scenes, 75 = ค่า default ของที่เหลือ
    qualities: [70, 72, 75],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
        port: '',
        pathname: '/v0/b/**',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'live.staticflickr.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
