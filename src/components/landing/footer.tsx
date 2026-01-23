import Link from "next/link";
import { Facebook, MessageCircle, BookUser } from "lucide-react";

export function Footer() {
  return (
    <footer id="contact" className="bg-gray-900 text-gray-300 py-12">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <BookUser className="h-7 w-7 text-primary" />
            <h3 className="text-2xl font-bold text-primary">IC Accounting & Service</h3>
          </div>
          <p className="opacity-80 mb-2">ที่อยู่: จังหวัดเชียงใหม่ (ย่านสันทราย/สันทรายน้อย)</p>
          <p className="opacity-80">โทร: 0XX-XXX-XXXX</p>
        </div>
        <div className="flex flex-col md:items-end">
          <h3 className="text-xl font-semibold mb-4 text-white">ติดตามเรา</h3>
          <div className="flex space-x-4">
            <Link href="#" className="text-gray-300 hover:text-primary transition-colors" prefetch={false}>
              <Facebook className="h-6 w-6" />
              <span className="sr-only">Facebook</span>
            </Link>
            <Link href="https://line.me/ti/p/~" target="_blank" className="text-gray-300 hover:text-primary transition-colors" prefetch={false}>
              <MessageCircle className="h-6 w-6" />
              <span className="sr-only">Line</span>
            </Link>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-6 mt-10 text-center opacity-50 text-sm">
        © {new Date().getFullYear()} IC Accounting & Service. All rights reserved.
      </div>
    </footer>
  );
}
