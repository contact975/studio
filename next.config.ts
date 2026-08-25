import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
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