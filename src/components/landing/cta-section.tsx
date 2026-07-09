import { MessageCircle, Phone } from "lucide-react";

export function CtaSection() {
  return (
    <section className="bg-[#1a3f8f] py-16 px-6 text-center">
      <h2 className="text-3xl font-semibold text-white mb-3">
        พร้อมให้ IC ดูแลธุรกิจของคุณ
      </h2>
      <p className="text-blue-200 text-base mb-8 max-w-2xl mx-auto leading-relaxed">
        เริ่มต้นด้วยการปรึกษาฟรี ไม่มีค่าใช้จ่าย ไม่มีข้อผูกมัด
        <br />
        IC พร้อมเป็นที่ปรึกษาส่วนตัวธุรกิจของคุณ ตั้งแต่วันแรกจนถึงวันที่คุณสำเร็จ
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <a
          href="https://line.me/R/ti/p/@icacc"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white text-[#1a3f8f] font-semibold px-6 py-3 rounded-full flex items-center gap-2 hover:bg-blue-50 transition"
        >
          <MessageCircle className="h-5 w-5" /> ปรึกษาฟรีผ่าน Line
        </a>
        <a
          href="tel:095-716-1422"
          className="border border-white text-white font-semibold px-6 py-3 rounded-full flex items-center gap-2 hover:bg-white hover:text-[#1a3f8f] transition"
        >
          <Phone className="h-5 w-5" /> 095-716-1422
        </a>
      </div>
      <p className="text-blue-200 text-sm mt-6">
        ทีมเชียงใหม่ · บริการทั่วประเทศ · ตอบไวทุกวันทำการ
      </p>
    </section>
  );
}
