import Link from 'next/link';
import { MapPin, Clock, Car, Building2 } from 'lucide-react';
import type { HomeContent } from './home-content';

/**
 * พื้นที่ให้บริการ — section ที่หน้าแรกขาดไป
 *
 * ── ทำไมต้องมี ──
 * เว็บติดหน้าแรกของคำว่า "ทำบัญชีเชียงใหม่ ดอยสะเก็ด" อยู่แล้ว เพราะที่ตั้งจริง
 * อยู่ดอยสะเก็ดและชื่ออำเภอปรากฏในหน้า แต่พอนับคำในหน้าแรกจะพบว่า
 * สันทราย / สันกำแพง / หางดง / สารภี / เมืองเชียงใหม่ ไม่ปรากฏเลยแม้แต่ครั้งเดียว
 * ทั้งที่เป็นอำเภอที่ธุรกิจหนาแน่นที่สุดของจังหวัด
 *
 * ── ทำไมไม่ทำเป็นหน้าแยกรายอำเภอ ──
 * หน้าที่ปั๊มจากเทมเพลตเดียวแล้วเปลี่ยนแค่ชื่ออำเภอ (doorway pages) ผิดหลักเกณฑ์
 * ของ Google โดยตรง และโดนลดอันดับทั้งเว็บได้ section เดียวที่เขียนจากการทำงานจริง
 * ว่าแต่ละพื้นที่เราดูแลลูกค้าแบบไหน จึงปลอดภัยและได้ผลกว่า
 *
 * ── ใช้ร่วมกับ schema ──
 * รายชื่ออำเภอชุดนี้ตรงกับ areaServed ใน app/layout.tsx แก้ที่หนึ่งต้องแก้อีกที่ด้วย
 */

/*
 * รายชื่ออำเภอและคำอธิบายอยู่ใน serviceArea.areas ของ home-content.ts
 * รายการแรกคือที่ตั้งสำนักงาน (ดอยสะเก็ด) จะได้กรอบเน้นและไอคอนอาคาร
 */

export function ServiceAreaSection({ c }: { c: HomeContent['serviceArea'] }) {
  const areas = c.areas.map((a, i) => ({ ...a, office: i === 0 }));
  return (
    <section className="py-20 md:py-28 bg-secondary/40" aria-labelledby="service-area-heading">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-14">
          <p className="text-primary text-xs font-bold tracking-[0.3em] uppercase mb-3">{c.eyebrow}</p>
          <h2 id="service-area-heading" className="text-3xl md:text-4xl font-black mb-4">
            {c.title}
          </h2>
          {/*
            ลิงก์ในย่อหน้านี้ตั้งใจใช้ข้อความที่ตรงกับคำค้นจริง (รับทำบัญชีรายเดือน /
            จดทะเบียนบริษัท) แทนคำว่า "คลิกที่นี่" เพราะ Google ใช้ข้อความบนลิงก์
            เป็นตัวบอกว่าหน้าปลายทางเกี่ยวกับอะไร และหน้าแรกเป็นหน้าที่ส่งน้ำหนักได้มากที่สุด
          */}
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {c.intro.before}
            <Link href={c.intro.accountingHref} className="text-primary font-semibold hover:underline">
              {c.intro.accountingLink}
            </Link>{' '}
            {c.intro.middle}{' '}
            <Link href={c.intro.registrationHref} className="text-primary font-semibold hover:underline">
              {c.intro.registrationLink}
            </Link>{' '}
            {c.intro.after}
          </p>
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {areas.map((area) => (
            <li
              key={area.name}
              className={`rounded-2xl border p-5 bg-background ${
                area.office ? 'border-primary/40 ring-1 ring-primary/20' : 'border-border'
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                {area.office ? (
                  <Building2 className="h-4 w-4 text-primary flex-shrink-0" />
                ) : (
                  <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
                )}
                <h3 className="font-bold">{area.name}</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{area.note}</p>
            </li>
          ))}
        </ul>

        {/*
          ที่อยู่แบบข้อความบนหน้าแรก (NAP)
          เดิมที่อยู่ปรากฏเฉพาะในฟุตเตอร์ การมีอยู่บนหน้าแรกด้วยช่วยให้ Google
          จับคู่เว็บกับหมุดใน Google Business Profile ได้มั่นใจขึ้น
          ข้อความต้องตรงกับฟุตเตอร์และ GBP ทุกตัวอักษร ไม่งั้นได้ผลตรงข้าม
        */}
        <div className="rounded-3xl border border-border bg-background p-6 md:p-8 grid md:grid-cols-3 gap-6">
          <div className="flex gap-3">
            <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-bold mb-1">{c.office.title}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {c.office.address}
              </p>
              <Link
                href="https://maps.google.com/?cid=11080561333861967427"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary font-semibold hover:underline inline-block mt-1"
              >
                {c.office.mapLink}
              </Link>
            </div>
          </div>
          <div className="flex gap-3">
            <Clock className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-bold mb-1">{c.hours.title}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {c.hours.days}
                <br />
                {c.hours.note}
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <Car className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-bold mb-1">{c.remote.title}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {c.remote.text}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
